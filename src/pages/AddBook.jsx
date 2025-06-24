import { useState, useContext } from "react";
import {AuthContext} from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [cover, setCover] = useState(null);

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();

        if(!user) {
            alert("Please login first");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("cover", cover);
        formData.append("ownerId", user.uid);
        formData.append("ownerEmail", user.email);

        try {
            const res = await fetch("http://localhost:5000/add-book", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if(res.ok) {
                alert("Book added successfully!");
                navigate('/');
            }
            else {
                alert(data.error || "Error adding book");
            }
        }
        catch(error) {
            alert("Something went wrong check the console");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add a Book</h2>
            <form onSubmit={handleAdd}>
                <input 
                    type="text" 
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                />
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required 
                />
                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    required
                />
                <button type="submit">
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddBook;