import {useEffect, useState, useContext} from "react";
import {db} from '../services/firebase';
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
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
        <div className="max-w-7xl mx-auto p-6">
            {/* <h2>Available Books</h2> */}
            {books.length === 0 && <div className="text-gray-500">No books available yet.</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full max-h-53 object-contain rounded"
                        />
                        <h3 className="text-lg font-semibold mt-3 text-gray-800">{book.title}</h3>
                        <p className="text-gray-600">Author: {book.author}</p>
                        <p className="text-gray-600">Price: Rs.{book.price}</p>
                        <a href={`/book/${book.id}`} className="mt-3 text-blue-500 font-medium hover:text-blue-600">View Details </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;