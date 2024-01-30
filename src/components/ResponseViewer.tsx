import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ResponseViewer = (): React.FC => {
    const { responseData } = useSelector(state => state.response);
    const [statusClassName, setStatusClassName] = useState("");
    useEffect(() => {
      if(responseData){
        if (responseData.status > 99 && responseData.status < 200) {
            setStatusClassName("text-blue-500");
        } else if (responseData.status > 199 && responseData.status < 300) {
            setStatusClassName("text-green-500");
        } else if (responseData.status > 299 && responseData.status < 400) {
            setStatusClassName("text-orange-500");
        } else if (responseData.status > 399 && responseData.status < 500) {
            setStatusClassName("text-red-500");
        } else if (responseData.status > 499 && responseData.status < 600) {
            setStatusClassName("text-purple-500");
        }
      }
    }, [responseData]);

    return (
        <div className="w-full bg-slate-950 text-white rounded flex flex-col min-h-20 items-center p-2 gap-2">
            <div className="flex w-full">
                <h1 className="font-semibold text-xl">Response</h1>
            </div>
            {responseData ? (
                <div className="flex flex-col w-full">
                    <div className="flex w-full justify-end border-b border-slate-800">
                        <span>Status:</span>&nbsp;
                        <span className={statusClassName}>
                            {responseData.status}
                        </span>
                    </div>

                    <div className="w-full break-words	">{JSON.stringify(responseData.data)}</div>
                </div>
            ) : (
                <h2>Your response will appear here</h2>
            )}
        </div>
    );
};

export default ResponseViewer;
