import {useEffect, useState, useContext} from "react";
import {db} from '../services/firebase';
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if(!user) return;
                const booksCollection = collection(db, "books");
                const snapshot = await getDocs(booksCollection);
                const bookList = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));

                setBooks(bookList);
            }
            catch(error) {
                console.log(error);
                alert("Error loading Books.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if(loading) {
        return <div>Loading books...</div>;
    }

    return (
        <div>
            <h2>Available Books</h2>
            <div>
                {books.length === 0 && <div>No books available yet.</div>}

                {books.map((book) => (
                    <div key={book.id}>
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                        />
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Price: ${book.price}</p>
                        <a href={`/book/${book.id}`} >View Details </a>
                    </div>
                ))};
            </div>
        </div>
    );
};

export default Home;