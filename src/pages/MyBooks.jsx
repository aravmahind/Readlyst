import { useEffect, useState, useContext } from "react";
import {AuthContext} from '../contexts/AuthContext';
import { collection, query, getDoc, where, getDocs, deleteDoc } from "firebase/firestore";
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
    <div>
      <h2>My Books</h2>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <img
              src={book.imageUrl}
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <button
              onClick={() => handleDelete(book.id)}
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