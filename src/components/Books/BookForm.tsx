import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useAddBookMutation,
  useUpdateBookMutation,
} from "../../redux/api/baseApi";
import type { IBook, IBooks } from "../../../type";

// Add or Update book hobe

interface bookProps {
  book: IBook;
  onClose: () => void;
  show: boolean;
}

const BookForm = ({ book, onClose, show }: bookProps) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: book });

  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const onSubmit = async (data: IBooks) => {
    if (data.copies === 0) data.available = false;

    try {
      if (book._id) {
        await updateBook({ id: book._id, ...data }).unwrap();
        toast.success("Book updated successfully!");
      } else {
        await addBook(data).unwrap();
        toast.success("Book added successfully!");
      }
      reset();
      onClose();
    } catch {
      toast.error("Failed to save book");
    }
  };
  return (
    <div
      className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity  ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {book?._id ? "Edit Book" : "Add New Book"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
            <input
              {...register("title")}
              placeholder="Title"
              className="input input-bordered w-full"
              required
            />
            <input
              {...register("author")}
              placeholder="Author"
              className="input input-bordered w-full"
              required
            />
            <input
              {...register("genre")}
              placeholder="Genre"
              className="input input-bordered w-full"
              required
            />
            <input
              {...register("isbn")}
              placeholder="ISBN"
              className="input input-bordered w-full"
              required
            />
            <textarea
              {...register("description")}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
            ></textarea>
            <input
              type="number"
              {...register("copies", { valueAsNumber: true })}
              placeholder="Copies"
              className="input input-bordered w-full"
              required
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button type="button" onClick={onClose} className="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
