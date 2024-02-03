import { useState } from "react";
import ParamsEditor from "./ParamsEditor.tsx";
import HeadersEditor from "./HeadersEditor.tsx";
import BodyEditor from "./BodyEditor.tsx";

export default function RequestEditor() {
    const [selectedTab, setSelectedTab] = useState<NavigationTabs>("params");

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
                    <div className="w-full min-h-56 bg-gray-900 rounded box-border overflow-hidden p-2">

                {selectedTab === "params" && <ParamsEditor />}
                {selectedTab === "headers" && <HeadersEditor />}
                {selectedTab === "body" && <BodyEditor />}
                </div>
        </>
    );
}
