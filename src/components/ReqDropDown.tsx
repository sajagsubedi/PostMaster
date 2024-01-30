import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux"
import { setMethod } from "../redux/slices/requestSlice.tsx";

export default function ReqDropDown(): React.FC{
    const [dropDown, setDropDown] = useState<boolean>(false);
    const requests: Array<ReqMethods> = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    const dispatch=useDispatch()
    const {method}=useSelector((state):any=>state.request)
    return (
        <div>
            <button
                className="h-10 px-5 py-2 w-28 bg-gray-900 inline-flex justify-center items-center rounded-lg"
                onClick={() => setDropDown(p => !p)}
            >
                {method}&nbsp;
                <FaChevronDown />
            </button>
            {dropDown && (
                <div className="w-32 rounded bg-gray-900 absolute m-1 shadow-xl">
                    <ul className="h-full justify-around px-3 py-1 gap-1 flex flex-col">
                        {requests.map((request:ReqMethods,i:number) => (
                            <li
                                className="border-b border-gray-800" key={i}
                                onClick={() => {
                                    dispatch(setMethod(request));                      
                                    setDropDown(false);
                                }}
                            >
                                {request}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
