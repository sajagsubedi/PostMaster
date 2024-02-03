import React, { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    handleCheckboxChange,
    deleteValue,
    changeRequestVal,
    addValue
} from "../redux/slices/requestSlice.tsx";

const ParamsEditor= () => {
    const request = useSelector((state: any) => state.request);
    const dispatch = useDispatch();
    const [addInput, setAddInput] = useState({ key: "", value: "" });
    const [inputState, setInputState] = useState<InputStateProps>({
        ind: -1,
        type: "key"
    });
    const checkBoxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        ind: number
    ): void => {
        dispatch(handleCheckboxChange({ e, ind, tab: "params", request })as any);
    };
    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        ind: number,
        type: "key" | "value"
    ) => {
        let newParams = request.params.map((paramItem:ValueType, indh:number) => {
            let newObj = { ...paramItem };
            if (indh === ind) {
                newObj[type] = e.target.value;
            }
            return newObj;
        });
        dispatch(changeRequestVal({ value: newParams, type: "params" })as any);
    };

    const handleDelete = (ind: number): void => {
        dispatch(deleteValue({ ind, tab: "params", request }) as any);
    };
    const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newObj:Record<string, string> = { ...addInput };
        console.log(e)
        newObj[e.target.name] = e.target.value;
        setAddInput(newObj as any);
    };
    const handleAdd = () => {
        dispatch(
            addValue({
                value: { isChecked: true, ...addInput },
                type: "params"
            } as any)
        );
        setAddInput({key:"",value:""})
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
                {request.params.map((parameter: ValueType, ind: number) => {
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
                                <FaTrash onClick={() => handleDelete(ind)} />
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
};

export default ParamsEditor;
