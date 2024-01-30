import React,{useState} from "react"
import ReqDropDown from "./ReqDropDown.tsx"
import RequestEditor from "./RequestEditor.tsx"
import { toast } from 'react-toastify';
import {useSelector,useDispatch} from "react-redux"
import {setUrl} from "../redux/slices/requestSlice.tsx"
import {fetchapi} from "../redux/slices/responseSlice.tsx"

export default function RequestBuilder():React.FC{
  const request=useSelector(state=>state.request)
  const dispatch=useDispatch();
  
  const handleSendClick = () => {

  try{
    let newUrl=new URL(request.url)
  }
  catch(err){
    toast.error("Invalid url")
    return;
  } 
  if(request.bodytype=="json" && !request.jsonState){
    toast.error("Invalid JSON body");
    return;
  }
  dispatch(fetchapi(request))
  };
  
  return(
        <section className="rounded-lg bg-gray-800 shadow-lg p-4 max-w-md w-full">
          <div className="flex items-center gap-4 mb-4">
            <ReqDropDown/>
            <input type="url" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Url"
            value={request.url}
            onChange={(e)=>dispatch(setUrl(e.target.value))}/>
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
        </section>
    )
}