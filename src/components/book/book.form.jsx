import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
  const { loadBook } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory(null);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmitBtn = async () => {
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (!resUpload.data) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
    }
    const newImage = resUpload.data.fileUploaded;
    const res = await createBookApi(
      newImage,
      mainText,
      author,
      price,
      quantity,
      category
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
          handleSubmitBtn();
        }}
        onCancel={() => resetAndCloseModal()}
        okText={"Create"}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Tiêu đề</span>
            <Input
              value={mainText}
              onChange={(event) => {
                setMainText(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={author}
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Giá</span>
            <InputNumber
              suffix="VNĐ"
              style={{ width: "100%" }}
              value={price}
              onChange={(event) => {
                setPrice(event);
              }}
            />
          </div>
          <div>
            <span>Số lượng</span>
            <InputNumber
              style={{ width: "100%" }}
              value={quantity}
              onChange={(event) => {
                setQuantity(event);
              }}
            />
          </div>
          <div>
            <span>Loại sách</span>
            <Select
              style={{ width: "100%" }}
              value={category}
              onSelect={(event) => {
                console.log("check event", event);
                setCategory(event);
              }}
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
            {/* <Input
              maxLength={10}
              required
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            /> */}
          </div>
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
                // onChange={handleOnChangeFile}
                onChange={(event) => {
                  handleOnChangeFile(event);
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
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
        </div>
      </Modal>
    </div>
  );
};
export default BookForm;
