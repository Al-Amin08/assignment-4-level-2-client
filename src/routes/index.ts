import { createBrowserRouter } from "react-router";
import App from "../App";

import AllBooks from "../components/Books/AllBooks";
import BorrowSummary from "../components/SummaryTable/BorrowSummary";

import AddBook from "../components/Books/AddBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/create-book",
        Component: AddBook,
      },
    ],
  },
]);
