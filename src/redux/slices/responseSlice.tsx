import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {responseData: undefined};

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
                let formBody = {};
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
            return {data:response.data,status: response.status}
        } catch (err) {
            console.log(err);
        }
    }
);

const responseSlice = createSlice({
    name: "response",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchapi.fulfilled, (state, action) => {
            state.responseData= action.payload;
        });
    }
});


export default responseSlice.reducer;
