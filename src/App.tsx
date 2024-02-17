import React from "react";
import Navbar from "./components/Navbar.tsx";
import RequestBuilder from "./components/RequestBuilder.tsx";
import ResponseViewer from "./components/ResponseViewer.tsx";
import AddEndpoint from "./components/AddEndpoint.tsx";
import CollectionTab from "./components/CollectionTab.tsx";
import EndpointViewer from "./components/EndpointViewer.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux"
const App: React.FC = () => {
  const {endpPath}=useSelector((state:any)=>state.collections)
    return (
        <div className="dark bg-gray-900 text-white min-h-screen relative">
            <Navbar />
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
                className="max-w-56 top-2 right-2"
            />
            <main className="px-3 flex flex-col items-center gap-3">
                <CollectionTab />
                {endpPath[0]==-1?<AddEndpoint />:<EndpointViewer/>}
                <RequestBuilder />
                <ResponseViewer />
            </main>
        </div>
    );
};
export default App;
