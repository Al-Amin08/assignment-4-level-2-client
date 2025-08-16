import { useGetBorrowSummaryQuery } from "../../redux/api/baseApi";
import Loading from "../Loading/Loading";

interface IShowBorrow {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const summary = data?.data || [];
  return (
    <div className="mt-32">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Borrowed Books Summary</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Book Title</th>
                <th>ISBN</th>
                <th>Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {summary.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No borrowed books found.
                  </td>
                </tr>
              ) : (
                summary.map((item: IShowBorrow, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.book.title}</td>
                    <td>{item.book.isbn}</td>
                    <td>{item.totalQuantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
