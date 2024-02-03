type ReqMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type NavigationTabs = "params" | "headers" | "body";

interface ValueType {
    isChecked: boolean;
    key: string;
    value: string;
}

interface RequestStateType {
    method: ReqMethods;
    url: string;
    params?: Array<ValueType>;
    headers?: Array<ValueType>;
    body?: Array<ValueType>;
    jsonbody?: string;
    bodytype?: "json" | "form";
    jsonState?: boolean;
}
interface ActionReturnObject {
    type: NavigationTabs;
    data: Array<ValueType>;
}
interface InputStateProps {
    ind: number;
    type: "key" | "value";
}
interface ValueforChange {
    type: NavigationTabs;
    value: Array<ValueType>;
}

interface AddValuePayload{
  type:NavigationTabs;
  value:ValueType;
}