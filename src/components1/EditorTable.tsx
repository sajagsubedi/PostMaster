import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { handleCheckboxChange } from "../redux/slices/requestSlice";

type EditorTableProps = {
    header: { key: string; value: string };
    tabletype: "body" | "headers" | "params";
};

const EditorTable: React.FC<EditorTableProps> = ({ header, tabletype }) => {
    const request = useSelector((state: any) => state.request);
    const dispatch = useDispatch();

    return (
        <table id="paramsTable">
            <thead>
                <tr>
                    <td></td>
                    <td>{header.key}</td>
                    <td>{header.value}</td>
                    <td className="min-w-8"></td>
                </tr>
            </thead>
            <tbody>
                {request[tabletype].map((parameter, ind) => {
                    return (
                        <tr key={ind}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={e =>
                                        dispatch(
                                            handleCheckboxChange({
                                                e,
                                                ind,
                                                tabletype,
                                                request
                                            })
                                        )
                                    }
                                    checked={parameter.isChecked}
                                />
                            </td>
                            <td>{parameter.key}</td>
                            <td>{parameter.value}</td>
                            <td>
                                <FaTrash />
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td>
                        <FaPlus className="bg-white rounded-full text-gray-800 p-1 w-5 h-5" />
                    </td>
                    <td className="max-w-32">
                        <input
                            className="bg-gray-800 w-full p-1 border-box"
                            placeholder="Key"
                        />
                    </td>
                    <td className="max-w-32">
                        <input
                            className="bg-gray-800 w-full p-1 border-box"
                            placeholder="Value"
                        />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

export default EditorTable;
