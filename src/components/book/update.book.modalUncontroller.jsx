import { useEffect, useState } from "react";

import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const UpdateBookModalUncontroll = (props) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadBook,
  } = props;

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,

        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    form.resetFields();
    setDataUpdate(null);
    selectedFile(null);
    setPreview(null);
  };

  const handleOnChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateBook = async (newThumbnail, values) => {
    const res = await updateBookApi(
      values.id,
      newThumbnail,
      values.mainText,
      values.author,
      values.price,
      values.quantity,
      values.category
    );
    if (res.data) {
      notification.success({
        message: "Update book",
        description: `Update book successfully`,
      });
      resetAndCloseModal();
      await loadBook();
    } else {
      notification.error({
        message: "Create book",
        description: JSON.stringify(res.message) || "create book failed",
      });
    }
  };

  const handleSubmitBtn = async (values) => {
    if (!selectedFile.data && !preview) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }
    let newThumbnail = "";
    if (!selectedFile && preview) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    await updateBook(newThumbnail, values);
  };
  return (
    <Modal
      title="Update book"
      open={isModalUpdateOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => setIsModalUpdateOpen(false)}
      okText={"Update"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitBtn}
        style={{ margin: "0 20px" }}
      >
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tiêu đề"
          name="mainText"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          name="author"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Loại sách"
          name="category"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },

              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },

              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </Form.Item>

        <div>
          <span>Ảnh thumbnail</span>

          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <label
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: "#1677ff",
                color: "#fff",
              }}
              htmlFor="uploadfile"
            >
              Upload ảnh sách
            </label>
            <input
              type="file"
              id="uploadfile"
              hidden
              onChange={(event) => {
                handleOnChangeFile(event);
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
              style={{ display: "none" }}
            />
          </div>
          {preview && (
            <>
              {" "}
              <label htmlFor="">Preview ảnh</label>
              <div style={{ marginBottom: "10px" }}>
                {" "}
                <img
                  src={preview}
                  alt="Avatar Người Dùng"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Đổ bóng
                    border: "2px solid #1890ff", // Viền màu nổi bật
                  }}
                />
              </div>
            </>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateBookModalUncontroll;
