import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import {db} from '../services/firebase';
import {doc, getDoc} from 'firebase/firestore'; 

const BookDetails = () => {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const docRef = doc(db, "books", id);
                const snapshot = await getDoc(docRef);

                if(snapshot.exists()) {
                    setBook(snapshot.data());
                } 
                else {
                    alert("Book not found");
                }
            } 
            catch(error) {
                console.error(error);
                alert("Error fetching book details");
            }
            finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if(loading) {
        return <div>Loading book details...</div>;
    }

    if(!book) {
        return <div>Book not found!</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img 
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full max-h-96 object-contain rounded"
                />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{book.title}</h2>
                <p className="text-gray-600 mt-2"><span className="font-semibold">Author: </span>{book.author}</p>
                <p className="text-gray-600 mt-1"><span className="font-semibold">Price: </span>Rs.{book.price}</p>
                <p className="text-gray-600 mt-1"><span className="font-semibold">Description: </span>{book.description}</p>
                <p className="text-gray-600 mt-1"><span className="font-semibold">Owner Email: </span>{book.ownerEmail}</p>
            </div>
        </div>
    );
};

export default BookDetails;