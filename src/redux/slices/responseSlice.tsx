import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormBodyType {
    [key: string]: string;
}
interface ResponseType {
    responseData?: { status?: number; data?: any };
    isLoading: boolean;
}

const initialState: ResponseType = {
    isLoading: false
};

export const fetchapi = createAsyncThunk(
    "response/fetchapi",
    async (request: RequestStateType) => {
        try {
            // Handling search parameters
            let newUrl = new URL(request.url);
            let params = new URLSearchParams(newUrl.search);
            request.params?.forEach(parameter => {
                if (parameter.isChecked) {
                    params.set(parameter.key, parameter.value);
                }
            });
            newUrl.search = params.toString();

            // Handling headers
            let headers: Record<string, string> = {};
            request.headers?.forEach(headerItem => {
                if (headerItem.isChecked) {
                    headers[headerItem.key] = headerItem.value;
                }
            });

            // Handling body
            let reqBody;
            if (request.bodytype === "form" && request.body) {
                let formBody: FormBodyType = {};
                request.body.forEach(bodyItem => {
                    formBody[bodyItem.key] = bodyItem.value;
                });
                reqBody = formBody;
            } else {
                reqBody = request.jsonbody;
            }

            // Config
            const axiosConfig = {
                method: request.method.toLowerCase(),
                url: newUrl.toString(),
                headers: headers,
                data: reqBody
            };

            // Sending request
            let response = await axios(axiosConfig);
            console.log(response);
            return { data: response.data, status: response.status };
        } catch (err) {
            console.log(err);
        }
    }
);

const responseSlice = createSlice({
    name: "response",
    initialState,
    reducers: {
        setLoading: (state: ResponseType, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchapi.fulfilled, (state, action) => {
            state.responseData = action.payload;
            state.isLoading=false
        });
    }
});
export const { setLoading } = responseSlice.actions;
export default responseSlice.reducer;
