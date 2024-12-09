import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './Users.css';

const Users = ({ setUserID }) => {  // Accept setUserID from App.js
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch users
        fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

     // Handle input changes for creating new user
     const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    // Handle input changes for login
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginCredentials({
            ...loginCredentials,
            [name]: value
        });
    };


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginCredentials.email || !loginCredentials.password) {
            setError('Please fill out both email and password');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginCredentials)
            });
            const data = await response.json();

            if (response.ok) {
                setUserID(data.userID); // Store userID on successful login
                setError('');
                alert('Login successful!');
            } else {
                setError(data.message || 'Error logging in');
            }
        } catch (error) {
            setError('Error submitting the form');
            console.error('Error:', error);
        }
    };

     // Handle user creation form submission
     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newUser.name || !newUser.email || !newUser.password) {
            setError('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();

            if (response.ok) {
                setUsers([...users, data]);  // Update the users list
                setNewUser({ name: '', email: '', password: '' });  // Clear form
                setError('');
            } else {
                setError(data.message || 'Error creating user');
            }
        } catch (error) {
            setError('Error submitting the form');
            console.error('Error:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="users-container">
            <h1 className="users-title">Users List</h1>
            <ul className="users-list">
                {users.map(user => (
                    <li key={user._id} className="user-item">
                        <div className="user-info">
                            <p className="user-name">{user.name}</p>
                            <p className="user-email">{user.email}</p>
                        </div>
                    </li>
                ))}
            </ul>

              {/* Form Section for Creating New User */}
              <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
                <h2 className="centered-text">Create Your Account</h2>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleNewUserChange}
                />
                <Button type="submit" variant="contained" sx={{
                    backgroundColor: 'red',
                    '&:hover': {
                        backgroundColor: '#b71c1c',
                    },
                    marginTop: 2
                }}>
                    Create User
                </Button>
            </Box>


            {/* Login Form Section */}
            <Box component="form" onSubmit={handleLogin} sx={{ marginBottom: 2 }}>
                <h2 className="centered-text">Login</h2>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    name="email"
                    value={loginCredentials.email}
                    onChange={e => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    value={loginCredentials.password}
                    onChange={e => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                />
                <Button type="submit" variant="contained" sx={{
                    backgroundColor: 'green',
                    '&:hover': {
                        backgroundColor: '#388e3c',
                    },
                    marginTop: 2
                }}>
                    Login
                </Button>
            </Box>
        </div>
    );
};

export default Users;
