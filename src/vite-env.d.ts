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

interface AddValuePayload {
    type: NavigationTabs;
    value: ValueType;
}
interface EndPType {
    name: string;
    data: RequestStateType;
}
interface CollectionItem {
    name: string;
    endpoints: EndPType[];
}
interface CollectionsType {
    collections: Array<CollectionItem>;
    endpPath: number[];
}
interface AddEndpointPayload {
    data: EndPType;
    ind: number;
}
