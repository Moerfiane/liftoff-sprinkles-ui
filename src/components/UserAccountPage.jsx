import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { sendData } from '../utilities/sendData';

const UserDetails = ({ userId, onUpdate, onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to update the user's password
      await sendData(`/dashboard/${userId}/password`, 'PUT', {
        'Content-Type': 'application/json',
      }, { currentPassword, newPassword });

      // Notify the parent component about the update
      onUpdate();
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle error as needed
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCurrentPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={changeCurrentPassword}
        />
      </Form.Group>
      <Form.Group controlId="formNewPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={changeNewPassword}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};
export default UserDetails;