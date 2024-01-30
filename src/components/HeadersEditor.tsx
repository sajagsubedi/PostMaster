import React, { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    handleCheckboxChange,
    deleteValue,
    changeRequestVal,
    addValue
} from "../redux/slices/requestSlice.tsx";
export default function HeadersEditor(): React.FC {
    const request = useSelector((state: any) => state.request);
    const dispatch = useDispatch();
    const [inputState, setInputState] = useState<InputStateProps>({
        ind: -1,
        type: ""
    });
    const [addInput, setAddInput] = useState({ key: "", value: "" });

    const checkBoxChange = (
        e: React.FormEvent<HTMLInputElement>,
        ind: Number
    ): void => {
        dispatch(handleCheckboxChange({ e, ind, tab: "headers", request }));
    };
    const handleDelete = (ind: Number): void => {
        dispatch(deleteValue({ ind, tab: "headers", request }));
    };
    const handleEditChange = (
        e: React.FormEvent<HTMLInputElement>,
        ind: Number,
        type: "key" | "value"
    ) => {
        let newHeaders = request.headers.map((headerItem, indh) => {
            let newObj = { ...headerItem };
            if (indh === ind) {
                newObj[type] = e.target.value;
            }
            return newObj;
        });
        dispatch(changeRequestVal({ value: newHeaders, type: "headers" }));
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
                type: "headers"
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
                    {request.headers.map((parameter: TabType, ind: Number) => {
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
                                                handleEditChange(
                                                    e,
                                                    ind,
                                                    "value"
                                                )
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
