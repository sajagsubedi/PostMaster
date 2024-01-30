import React, { useState,useEffect} from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    handleCheckboxChange,
    deleteValue,
    changeRequestVal,
    addValue,
    setJsonbody,
    setBodytype,
    setJsonState
} from "../redux/slices/requestSlice.tsx";

function BodyForm(): React.FC {
    const request = useSelector((state: any) => state.request);
    const dispatch = useDispatch();
    const [addInput, setAddInput] = useState({ key: "", value: "" });
    const [inputState, setInputState] = useState<InputStateProps>({
        ind: -1,
        type: ""
    });
    const checkBoxChange = (
        e: React.FormEvent<HTMLInputElement>,
        ind: Number
    ): void => {
        dispatch(handleCheckboxChange({ e, ind, tab: "body", request }));
    };
    const handleEditChange = (
        e: React.FormEvent<HTMLInputElement>,
        ind: Number,
        type: "key" | "value"
    ) => {
        let newBody = request.body.map((bodyItem, indh) => {
            let newObj = { ...bodyItem };
            if (indh === ind) {
                newObj[type] = e.target.value;
            }
            return newObj;
        });
        dispatch(changeRequestVal({ value: newBody, type: "body" }));
    };

    const handleDelete = (ind: Number): void => {
        dispatch(deleteValue({ ind, tab: "body", request }));
    };
    const handleAddChange = (e: React.FormEvent<HTMLInputElement>) => {
        let newObj = { ...addInput };
        newObj[e.target.name] = e.target.value;
        setAddInput(newObj);
    };
    const handleAdd = () => {
        dispatch(
            addValue({
                value: { isChecked: true, ...addInput },
                type: "body"
            })
        );
        setAddInput({ key: "", value: "" });
    };

    return (
        <table id="editTable">
            <thead>
                <tr>
                    <td></td>
                    <td>Key</td>
                    <td>Value</td>
                    <td className="min-w-8"></td>
                </tr>
            </thead>
            <tbody>
                {request.body.map((parameter: TabType, ind: Number) => {
                    if (!parameter) return;
                    return (
                        <tr key={ind}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={parameter.isChecked}
                                    onChange={e => checkBoxChange(e, ind)}
                                />
                            </td>
                            <td
                                className="max-w-[35px] min-w-[35px] overflow-scroll"
                                onClick={() => {
                                    setInputState({ ind, type: "key" });
                                }}
                            >
                                {inputState.ind == ind &&
                                inputState.type == "key" ? (
                                    <input
                                        className="bg-gray-900 w-full h-6 border-box"
                                        value={parameter.key}
                                        onChange={e =>
                                            handleEditChange(e, ind, "key")
                                        }
                                    />
                                ) : (
                                    <span className="whitespace-nowrap">
                                        {parameter.key}
                                    </span>
                                )}
                            </td>
                            <td
                                className="max-w-[115px] min-w-[100px] overflow-scroll"
                                onClick={() => {
                                    setInputState({ ind, type: "value" });
                                }}
                            >
                                {inputState.ind == ind &&
                                inputState.type == "value" ? (
                                    <input
                                        className="bg-gray-900 w-full h-6 border-box"
                                        value={parameter.value}
                                        onChange={e =>
                                            handleEditChange(e, ind, "value")
                                        }
                                    />
                                ) : (
                                    <span className="whitespace-nowrap">
                                        {parameter.value}
                                    </span>
                                )}
                            </td>

                            <td>
                                <FaTrash onClick={e => handleDelete(ind)} />
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td>
                        <FaPlus
                            className="bg-white rounded-full text-gray-800 p-1 w-5 h-5"
                            onClick={handleAdd}
                        />
                    </td>
                    <td className="max-w-32">
                        <input
                            className="bg-gray-800 w-full p-1 border-box"
                            placeholder="Key"
                            onChange={handleAddChange}
                            name="key"
                            value={addInput["key"]}
                        />
                    </td>
                    <td className="max-w-32">
                        <input
                            className="bg-gray-800 w-full p-1 border-box"
                            placeholder="Value"
                            onChange={handleAddChange}
                            name="value"
                            value={addInput["value"]}
                        />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}
function BodyJson(): React.FC {
    const request = useSelector(state => state.request);
    const dispatch = useDispatch();
    const handleInputChange = (e:React.FormEvent<HTMLTextAreaElement>)=>{
      dispatch(setJsonbody(e.target.value));
      dispatch(setJsonState(e.target.value))
    }
    return (
        <div className="flex flex-col items-end relative">
            <span className={`min-h-3 min-w-3 max-w-3 p-1  rounded-full absolute top-1 right-1 shadow ${request.jsonState?"shadow-green-900 bg-green-500":"shadow-red-900 bg-red-500"}`}></span>
            <textarea
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-36 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={request.jsonbody}
                onChange={handleInputChange}
            ></textarea>
        </div>
    );
}
export default function BodyEditor(): React.FC {
  const dispatch=useDispatch()
  const {bodytype}=useSelector(state=>state.request)
    return (
        <>
            <div className="flex gap-2 p-1 mb-2">
                <button
                    className={`bg-black p-1 rounded ${
                        bodytype == "form" ? "border" : ""
                    }`}
                    onClick={() => dispatch(setBodytype("form"))}
                >
                    Form
                </button>
                <button
                    className={`bg-black p-1 rounded ${
                        bodytype == "json" ? "border" : ""
                    }`}
                    onClick={() => dispatch(setBodytype("json"))}
                >
                    JSON
                </button>
            </div>
            {bodytype == "form" && <BodyForm />}
            {bodytype == "json" && <BodyJson />}
        </>
    );
}
