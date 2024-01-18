import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { sendData } from '../utilities/sendData';
import { LoginContext } from "../utilities/checkLogin";

const DeleteUser = ({ userId, onCancel, onAccountDeleted }) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
  const handleDeleteAccount = async () => {
    try {
      await sendData(`/dashboard/${userId}/delete`, 'DELETE', { 'Content-Type': 'application/json' });
              // setUserToDelete(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate('/login');
      // onAccountDeleted();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="delete-confirmation text-center text-sky-400">
      <p>Are you sure you want to delete your account?</p>
      <Button variant="danger" onClick={handleDeleteAccount}>
        Yes, Delete Account
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default DeleteUser;