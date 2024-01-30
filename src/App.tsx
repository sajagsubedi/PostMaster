import React, { useState } from "react";
import Navbar from "./components/Navbar.tsx";
import RequestBuilder from "./components/RequestBuilder.tsx";
import ResponseViewer from "./components/ResponseViewer.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
    return (
        <div className="dark bg-gray-900 text-white min-h-screen">
            <Navbar />
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
                className="max-w-56 top-2 right-2"
            />
                <main className="p-3 flex flex-col items-center gap-2">
            <RequestBuilder />
            <ResponseViewer/>
            </main>
        </div>
    );
};
export default App;
