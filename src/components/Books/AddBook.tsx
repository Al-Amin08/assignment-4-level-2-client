import { useForm, type SubmitHandler } from "react-hook-form";
import { useAddBookMutation } from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import type { IBook, IBooks } from "../../../type";

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm<IBook>();
  const [addBook] = useAddBookMutation();
  const onSubmit: SubmitHandler<IBook> = async (data: IBooks) => {
    try {
      await addBook(data);
      toast.success("Book added successfully!");
      reset();
    } catch {
      toast.error("Failed to save book");
    }
  };
  return (
    <div className="w-7/12 mx-auto mt-32">
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
        <div className="modal-action ">
          <button type="submit" className="btn btn-success">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
