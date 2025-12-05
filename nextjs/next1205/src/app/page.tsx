import BookList from "../components/BookList";
import { getBooks } from "./server-action";

const BooksPage = async () => {
  const { data: books } = await getBooks();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;
