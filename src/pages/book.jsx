import { useState, useEffect } from "react";
import { fetchAllBookApi } from "../services/api.service";
import BookTable from "../components/book/book.table";
import BookForm from "../components/book/book.form";
import BookFormUncontroll from "../components/book/create.book.uncontroll";

const BookPage = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  const loadBook = async () => {
    setLoadingTable(true);
    const res = await fetchAllBookApi(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
    setLoadingTable(false);
  };
  return (
    <>
      {/* <BookForm loadBook={loadBook} /> */}
      <BookFormUncontroll loadBook={loadBook} />
      <BookTable
        dataBook={dataBook}
        loadBook={loadBook}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        setTotal={setTotal}
        loadingTable={loadingTable}
        setLoadingTable={setLoadingTable}
      />
    </>
  );
};
export default BookPage;
