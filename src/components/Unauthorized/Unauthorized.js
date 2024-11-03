import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="Unauthorized">
            <h1>Unauthorized Access</h1>
            <p>You must be logged in to view this page.</p>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
        </div>
    );
};

export default Unauthorized;
