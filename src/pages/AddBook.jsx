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
            const res = await fetch("http://34.93.58.74:5000/add-book", {
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
            alert("Something went wrong check the console", error.message);
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a Book</h2>
            <form onSubmit={handleAdd} className="space-y-5">
                <label className="block text-gray-700 mb-1">Title</label>
                <input 
                    type="text" 
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                    className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2"
                />
                <label className="block text-gray-700 mb-1">Author</label>
                <input 
                    type="text" 
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required 
                    className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2"
                />
                <label className="block text-gray-700 mb-1">Price</label>
                <input 
                    type="text" 
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                    className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2"
                />
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required 
                    className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none p-2"
                />
                <label className="block text-gray-700 mb-1">Cover Image</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    required
                    className="w-full text-gray-600"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition mt-3">
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddBook;