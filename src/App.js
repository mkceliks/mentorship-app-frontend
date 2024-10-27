import React from "react";
import FileManagement from "./components/FileManagement";
import './App.css';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Mentorship App - S3 File Management</h1>
            </header>
            <main>
                <FileManagement />
            </main>
        </div>
    );
}

export default App;
