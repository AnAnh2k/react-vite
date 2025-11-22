import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import { deleteBookApi } from "../../services/api.service";
// import UpdateBookModal from "./update.book.modal.uncontrollerjsx";
import ViewBookModal from "./view.book.detail";
import UpdateBookModalUncontroll from "./update.book.modalUncontroller";

const BookTable = (props) => {
  const {
    loadingTable,
    dataBook,
    loadBook,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
    setTotal,
  } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const confirm = async (bookId) => {
    const res = await deleteBookApi(bookId);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: `Delete book successfully`,
      });
      await loadBook();
    } else {
      notification.error({
        message: "Delete book",
        description: JSON.stringify(res.message) || "Delete book failed",
      });
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "ID",
      key: "_id",
      render: (_, record) => {
        return (
          <>
            <a
              href="#"
              onClick={() => {
                setDataDetail(record);
                setIsDetailOpen(true);
              }}
            >
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <EditOutlined
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
              style={{ cursor: "pointer", color: "orange" }}
            />

            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              placement="leftTop"
              onConfirm={() => {
                confirm(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onChange = (pagination) => {
    //nếu thay đổi trang
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
    setTotal(pagination.total);
  };

  return (
    <>
      <Table
        style={{ marginBottom: "80px" }}
        columns={columns}
        dataSource={dataBook}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
        loading={loadingTable}
      />
      {/* <UpdateBookModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      /> */}
      <UpdateBookModalUncontroll
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      />

      <ViewBookModal
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        loadBook={loadBook}
      />
    </>
  );
};

export default BookTable;
