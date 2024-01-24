import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ReqDropDown({
    reqType,
    setReqType
}): React.FC<ReqDropDownProps>{
  
    const [dropDown, setDropDown] = useState<boolean>(false);
    
    const requests: [ReqTypes] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    return (
        <div>
            <button
                className="h-10 px-5 py-2 w-28 bg-gray-900 inline-flex justify-center items-center rounded-lg"
                onClick={() => setDropDown(p => !p)}
            >
                {reqType}&nbsp;
                <FaChevronDown />
            </button>
            {dropDown && (
                <div className="w-32 rounded bg-gray-900 absolute m-1">
                    <ul className="h-full justify-around px-3 py-1 gap-1 flex flex-col">
                        {requests.map((request: string,i:number) => (
                            <li
                                className="border-b border-gray-800" key={i}
                                onClick={() => {
                                    setReqType(request);
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
