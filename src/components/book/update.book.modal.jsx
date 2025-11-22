import { useEffect, useState } from "react";

import { Input, InputNumber, Modal, notification, Select } from "antd";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const UpdateBookModal = (props) => {
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadBook,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setDataUpdate(null);
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

  const updateBook = async (newThumbnail) => {
    const res = await updateBookApi(
      id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
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

  const handleSubmitBtn = async () => {
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
    await updateBook(newThumbnail);
  };
  return (
    <Modal
      title="Update book"
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => setIsModalUpdateOpen(false)}
      okText={"Update"}
    >
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>ID</span>
          <Input value={id} disabled />
        </div>
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
  );
};

export default UpdateBookModal;
