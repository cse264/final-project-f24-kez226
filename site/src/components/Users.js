import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import '../styles/Users.css';

const Users = ({ setUserID }) => {
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
    const [displayUser, setDisplayUser] = useState(false);  // State to control user list display

    // Function to fetch users from the API
    const fetchUsers = () => {
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
    };

    // Fetch users when the component mounts or when displayUser changes
    useEffect(() => {
        fetchUsers();
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
                console.log(data.accountType)
                if (data.accountType === 'admin') {
                    setDisplayUser(true);  // Show users list if admin
                    fetchUsers();  // Refetch users after successful login
                }
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
                    onChange={handleLoginChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    value={loginCredentials.password}
                    onChange={handleLoginChange}
                />
                <Button type="submit" variant="contained" sx={{
                    backgroundColor: 'red',
                    '&:hover': {
                        backgroundColor: '#b71c1c',
                    },
                    marginTop: 2
                }}>
                    Login
                </Button>
            </Box>
            {displayUser && (
                <div>
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
                </div>
            )}
        </div>
    );
};

export default Users;
