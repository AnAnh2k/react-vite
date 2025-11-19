import { Button, Result } from "antd";
import { useRouteError, Link } from "react-router-dom"; // MỚI: Thêm 'Link'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="403"
      title="Oops!"
      subTitle={error.statusText || error.message}
      extra={
        <Button type="primary">
          <Link to="/">Quay về Trang chủ</Link>
        </Button>
      }
    />
  );
}
