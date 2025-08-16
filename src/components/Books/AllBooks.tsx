import { useState } from "react";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../redux/api/baseApi";
import BookForm from "./BookForm";
import BorrowBook from "./BorrowBook";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import type { IBook } from "../../../type.ts";
const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const books = data?.data;

  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [borrow, setBorrow] = useState<IBook | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you want to delete this book?");
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully!");
    } catch {
      toast.error("Failed to delete book");
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-8/12 mx-auto pt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📖 Book List</h1>
        <button
          className="btn btn-primary"
          onClick={() => (setEditBook(null), setShowModal(true))}
        >
          ➕ Add New Book
        </button>
      </div>
      <div className="overflow-x-auto p-4  mt-30">
        <table className="table table-zebra gap-5 w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book: IBook) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.copies}</td>
                <td>
                  {book.copies > 0 ? (
                    <span className="text-green-500 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="flex gap-3">
                  <button
                    className="btn btn-sm btn-success "
                    disabled={!book.copies}
                    onClick={() => {
                      setBorrow(book);
                    }}
                  >
                    Borrow
                  </button>

                  <button
                    className="btn btn-sm btn-info "
                    onClick={() => (setEditBook(book), setShowModal(true))}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editBook !== null && (
        <BookForm
          book={editBook}
          show={showModal}
          onClose={() => setEditBook(null)}
        ></BookForm>
      )}
      {borrow !== null && (
        <BorrowBook book={borrow} onClose={() => setBorrow(null)}></BorrowBook>
      )}
    </div>
  );
};

export default AllBooks;
