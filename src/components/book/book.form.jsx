import { Button, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi } from "../../services/api.service";

const BookForm = (props) => {
  const { loadBook } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
  };

  const handleSubmitBtn = async () => {
    const res = await createBookApi(mainText, author, price, category);
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
        onCancel={() => setIsModalOpen(false)}
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
            <Input
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Số lượng</span>
            <Input
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Loại sách</span>
            <Select
              style={{ width: "100%" }}
              options={[
                { label: "Business", value: "Business" },
                { label: "Arts", value: "Arts" },
                { label: "Teen", value: "Teen" },
                { label: "Cooking", value: "Cooking" },
                { label: "Entertainment", value: "Entertainment" },
                { label: "History", value: "History" },
                { label: "Music", value: "Music" },
                { label: "Sports", value: "Sports" },
                { label: "Comics", value: "Comics" },
                { label: "Travel", value: "Travel" },
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
        </div>
      </Modal>
    </div>
  );
};
export default BookForm;
