import {Link} from 'react-router-dom';
import { useContext } from "react";
import {AuthContext} from '../contexts/AuthContext';
import {auth} from '../services/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully");
            navigate('/');
        }
        catch(error) {
            console.log(error);
            alert("Error in logout");
        }
    };

    return (
        <nav className='bg-gray-50 p-5 border-b border-gray-300 flex justify-between items-center text-black'>
            <Link to='/'><h1 className='ml-23 text-xl font-bold'>Readlyst</h1></Link>
            <div className='flex space-x-4 mr-23'>
                <Link to='/'>Home</Link>
                {user && (
                    <>
                    <Link to='/add-book'>Add Book</Link>
                    <Link to='/my-books'>My Book</Link>
                    <button onClick={handleLogout}>Logout</button>
                    </>
                )}
                {!user && (
                    <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;