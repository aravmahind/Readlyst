import { useEffect, useState, useContext } from "react";
import {AuthContext} from '../contexts/AuthContext';
import { collection, query, doc, where, getDocs, deleteDoc } from "firebase/firestore";
import {db} from '../services/firebase';

const MyBooks = () => {
    const {user} = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBooks = async () => {
            if(!user) return;

            try {
                const booksRef = collection(db, "books");
                const q = query(booksRef, where("ownerId", "==", user.uid));
                const snapshot = await getDocs(q);

                const bookList = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
                setBooks(bookList);
            } 
            catch(error) {
                alert("Error fetching your books");
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMyBooks();
    }, [user]);

    const handleDelete = async (bookId) => {
        if(!user) {
            alert("You must be logged in.");
            return;
        }
        
        try {
            await deleteDoc(doc(db, "books", bookId));
            setBooks((books) => books.filter((book) => book.id != bookId));
            alert("Book deleted successfully");
        } 
        catch(error) {
            alert("Error deleting book");
            console.error(error);
        }
    };

    if(loading) {
        return <div>Loading your books...</div>;
    }

    if(books.length === 0) {
        return <div>You have no books listed.</div>;
    }

    return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-6">My Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-48 w-full object-contain rounded"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-800">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Price: Rs.{book.price}</p>
            <button
              onClick={() => handleDelete(book.id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-1 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBooks;