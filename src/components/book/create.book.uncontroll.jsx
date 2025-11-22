import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const BookFormUncontroll = (props) => {
  const { loadBook } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form] = Form.useForm();

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

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmitBtn = async (values) => {
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (!resUpload.data) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }
    const newImage = resUpload.data.fileUploaded;
    const res = await createBookApi(
      newImage,
      values.mainText,
      values.author,
      values.price,
      values.quantity,
      values.category
    );
    if (res.data) {
      notification.success({
        message: "Create book",
        description: `create book "${res.data.fullName}" successfully`,
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

  return (
    <div
      className="user-form"
      style={{
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table books</h3>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create book
          </Button>
        </div>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => resetAndCloseModal()}
        okText={"Create"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitBtn}
          style={{ margin: "0 20px" }}
        >
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
    </div>
  );
};
export default BookFormUncontroll;
