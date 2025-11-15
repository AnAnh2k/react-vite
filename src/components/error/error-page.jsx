import { useRouteError, Link } from "react-router-dom"; // MỚI: Thêm 'Link'

// Chúng ta sẽ định nghĩa các style ở đây
// ... (Các style cũ của bạn) ...

const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  padding: "20px",
  boxSizing: "border-box",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const cardStyles = {
  backgroundColor: "#ffffff",
  padding: "30px 40px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
  textAlign: "center",
  maxWidth: "500px",
  width: "100%",
};

const headingStyles = {
  color: "#e74c3c",
  fontSize: "3.5rem",
  marginTop: 0,
  marginBottom: "15px",
};

const textStyles = {
  fontSize: "1.15rem",
  color: "#555",
  lineHeight: 1.6,
};

const detailsStyles = {
  fontSize: "0.9rem",
  color: "#777",
  backgroundColor: "#f9f9f9",
  padding: "12px 15px",
  borderRadius: "6px",
  marginTop: "25px",
  display: "inline-block",
  textAlign: "left",
};

// MỚI: Style cho nút quay về trang chủ
const buttonStyles = {
  display: "inline-block",
  marginTop: "25px", // Tạo khoảng cách với phần chi tiết lỗi
  padding: "12px 25px",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#ffffff",
  backgroundColor: "#3498db", // Một màu xanh dương thân thiện
  borderRadius: "8px",
  textDecoration: "none", // Bỏ gạch chân mặc định của thẻ <a> (do Link render ra)
  cursor: "pointer",
};

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    // Sử dụng thuộc tính 'style' để áp dụng các đối tượng style
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h1 style={headingStyles}>Oops!</h1>
        <p style={textStyles}>Xin lỗi, một lỗi không mong muốn đã xảy ra.</p>
        <p style={detailsStyles}>
          {" "}
          <i>{error.statusText || error.message}</i>
        </p>

        <Link to="/" style={buttonStyles}>
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
}
