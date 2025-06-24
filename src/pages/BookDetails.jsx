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
        <div>
            <h2>{book.title}</h2>
            <img 
                src={book.imageUrl}
                alt={book.title}
            />
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Description: {book.description}</p>
            <p>Owner Email: {book.ownerEmail}</p>
        </div>
    );
};

export default BookDetails;