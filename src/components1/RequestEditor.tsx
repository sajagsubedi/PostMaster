import React, { useState } from "react";
import EditorTable from "./EditorTable";

type RequestEditorProps = {};
export default function RequestEditor({}: RequestEditorProps): React.FC {
    const [selectedTab, setSelectedTab] = useState<String>("params");
    return (
        <>
            <div className="w-full  flex p-1 gap-3 justify-evenly rounded">
                <button
                    className={`p-2 bg-gray-900 rounded text-white w-20 ${
                        selectedTab == "params" ? "border border-white" : ""
                    }`}
                    onClick={() => {
                        setSelectedTab("params");
                    }}
                >
                    Params
                </button>
                <button
                    className={`p-2 bg-gray-900 rounded ${
                        selectedTab == "headers" ? "border border-white" : ""
                    } text-white w-20`}
                    onClick={() => {
                        setSelectedTab("headers");
                    }}
                >
                    Headers
                </button>
                <button
                    className={`p-2 bg-gray-900 ${
                        selectedTab == "body" ? "border border-white" : ""
                    } rounded text-white w-20`}
                    onClick={() => {
                        setSelectedTab("body");
                    }}
                >
                    Body
                </button>
            </div>
            <div className="w-full min-h-48 bg-gray-900 rounded p-2">
                {selectedTab === "params" && (
                    <EditorTable
                        header={{ key: "Key", value: "Value" }}
                        tabletype="params"
                    />
                )}
                {selectedTab === "headers" && (
                    <EditorTable
                        header={{ key: "Key", value: "Value" }}
                        tabletype="headers"
                    />
                )}
                {selectedTab === "body" && (
                    <EditorTable
                        header={{ key: "Key", value: "Value" }}
                        tabletype="body"
                    />
                )}
            </div>
        </>
    );
}
