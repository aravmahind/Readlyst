import { useState } from "react";
import {auth} from '../services/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful");
            navigate('/');
        }
        catch(error) {
            setError(error.message);
            alert(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 rounded-lg border border-gray-300 bg-gray-50">
            <h2 className="text-2xl fond-bold text-gray-800 text-center mb-4">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <input 
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                {error && <div>{error}</div>}
                <button type="submit" className="bg-gray-800 text-white rounded-full py-2 font-semibold hover:bg-gray-700 transition">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;