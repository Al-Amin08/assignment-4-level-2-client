import { useForm, type SubmitHandler } from "react-hook-form";
import { useBorrowBookMutation } from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import type { IBook, IBorrow } from "../../../type";

interface bookProps {
  book: IBook;
  onClose: () => void;
}

const BorrowBook = ({ book, onClose }: bookProps) => {
  const { register, handleSubmit } = useForm<IBorrow>();
  // const { bookId } = useParams();
  const [borrowBook] = useBorrowBookMutation();
  const onSubmit: SubmitHandler<IBorrow> = async (data: IBorrow) => {
    if (data.quantity > book.copies) {
      toast.error(`Only ${book.copies} copies available.`);
      return;
    }
    if (data.quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }
    try {
      const isoDueDate = new Date(data.dueDate).toISOString();
      const dueDate = isoDueDate;
      const quantity = data.quantity;
      const bookId = book._id;

      await borrowBook({ bookId, dueDate, quantity }).unwrap();
      toast.success("Book borrowed successfully!");
      onClose();
    } catch (err) {
      console.error(err);

      toast.error("Failed to borrow book");
    }
  };
  return (
    <div>
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Borrow Book – {book.title}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
            <input
              {...register("quantity", { valueAsNumber: true })}
              placeholder="Book Quantity"
              className="input input-bordered w-full"
              type="number"
              min="1"
              max={book.copies}
              required
            />
            <input
              {...register("dueDate")}
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
              type="date"
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-accent">
                Borrow
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

export default BorrowBook;
