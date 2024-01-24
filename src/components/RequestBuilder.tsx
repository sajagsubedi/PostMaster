import React,{useState} from "react"
import ReqDropDown from "./ReqDropDown.tsx"
import RequestEditor from "./RequestEditor.tsx"

export default function RequestBuilder():React.FC{
  
  const [reqType,setReqType]=useState<ReqTypes>("GET")
  const handleSendClick = () => {
  };
  
  return(
    <main className="p-3 flex justify-center">
        <div className="rounded-lg bg-gray-800 shadow-lg p-4 max-w-md w-full">
          <div className="flex items-center gap-4 mb-4">
            <ReqDropDown reqType={reqType} setReqType={setReqType}/>
            <input type="url" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Url"/>
          </div>
          <RequestEditor/>
          <div className="mt-4">
            <button
              className="bg-black text-white py-2 px-3 w-full rounded shadow"
              onClick={handleSendClick}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    )
}