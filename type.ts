export interface IBooks {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
export interface IBook extends IBooks {
  _id: string;
}

export interface IBorrow {
  bookId: string;
  quantity: number;
  dueDate: string;
}
