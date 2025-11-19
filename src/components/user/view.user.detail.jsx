import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUploadFile,
  updateUserAvatarApi,
} from "../../services/api.service";

const ViewUserModal = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } =
    props;

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

  const handleUpdateUserAvatar = async () => {
    //step 1 upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      //success
      const newAvatar = resUpload.data.fileUploaded;
      //step 2 update avatar
      const resUpdateAvatar = await updateUserAvatarApi(
        dataDetail._id,
        newAvatar,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        loadUser();
        notification.success({
          message: "Update user avatar",
          description: "Update user avatar success",
        });
      } else {
        notification.error({
          message: "Update user avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };
  return (
    <Drawer
      title="Chi Tiết Người Dùng"
      width={400} // Quay lại width 400px hoặc giữ 500px tùy ý bạn
      onClose={() => {
        setDataDetail(null);
        setIsDetailOpen(false);
      }}
      open={isDetailOpen}
      style={{ padding: "16px 24px" }}
    >
      {dataDetail ? (
        <>
          {" "}
          <div style={{ padding: "16px 8px" }}>
            {/* PHẦN 1: AVATAR VÀ ID - Sử dụng Flexbox */}
            <div
              style={{
                display: "block",
                alignItems: "center",
                marginBottom: "30px",
                paddingBottom: "20px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* KHU VỰC AVATAR */}
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  dataDetail.avatar
                }`}
                alt="Avatar Người Dùng"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "20px",
                  marginBottom: "30px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Đổ bóng
                  border: "2px solid #1890ff", // Viền màu nổi bật
                }}
              />
              <div style={{ marginBottom: "20px" }}>
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
                  Upload avatar
                </label>
                <input
                  type="file"
                  id="uploadfile"
                  hidden
                  // onChange={handleOnChangeFile}
                  onChange={(event) => {
                    handleOnChangeFile(event);
                  }}
                />
              </div>
              {preview && (
                <>
                  {" "}
                  <label htmlFor="">Preview avatar</label>
                  <div style={{ marginBottom: "10px" }}>
                    {" "}
                    <img
                      src={preview}
                      alt="Avatar Người Dùng"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Đổ bóng
                        border: "2px solid #1890ff", // Viền màu nổi bật
                      }}
                    />
                  </div>
                  <Button
                    style={{ marginBottom: "20px" }}
                    type="primary"
                    onClick={() => {
                      handleUpdateUserAvatar();
                    }}
                  >
                    Save
                  </Button>
                </>
              )}

              {/* KHU VỰC ID */}
              <div>
                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#8c8c8c",
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  MÃ ID
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1890ff",
                    margin: 0,
                  }}
                >
                  {dataDetail._id}
                </p>
              </div>
            </div>

            <div>
              {/* 2. Họ và tên */}
              <div style={{ marginBottom: "20px" }}>
                {" "}
                {/* Tăng khoảng cách dưới cho các mục */}
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#8c8c8c",
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  HỌ VÀ TÊN
                </p>
                <p style={{ fontSize: "15px", color: "#262626", margin: 0 }}>
                  {dataDetail.fullName}
                </p>
              </div>

              {/* 3. Email */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#8c8c8c",
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  EMAIL
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#262626",
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {dataDetail.email}
                </p>
              </div>

              {/* 4. Số điện thoại */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#8c8c8c",
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  SỐ ĐIỆN THOẠI
                </p>
                <p style={{ fontSize: "15px", color: "#262626", margin: 0 }}>
                  {dataDetail.phone}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewUserModal;
