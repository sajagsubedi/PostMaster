import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React from "react"
type TabType = [{ isChecked: boolean; key: string; value: string }];

type RequestStateType = {
    params: TabType;
    headers: TabType;
    body: TabType;
};

const initialState: RequestStateType = {
    params: [{ isChecked: true, key: "page", value: "10" }],
    headers: [{ isChecked: true, key: "Auth", value: "Bearer jdjdnundjdh" }],
    body: [{ isChecked: true, key: "name", value: "Sajag" }]
};

export const handleCheckboxChange = createAsyncThunk(
    "request/handleCheckboxChange",
    async ({e,ind,tabletype,request}:{
        e: React.FormEvent<HTMLInputElement>,
        ind: number,
        tabletype: "headers" | "body" | "params",
        request:RequestStateType}
    ):any => {
      console.log(request[tabletype])
      console.log(e.target.checked)
        let newParams = request[tabletype].map((parameter: TabType, i: number) => {
          console.log(parameter,i,ind)
            if (i === ind) {
                parameter = { ...parameter, isChecked: e.target.checked };
            }
            return parameter;
        });
        console.log(newParams)
        return {type:tabletype,data:newParams};
    }
);

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        changeParams: (state, action) => {
            state[action.payload.type] = action.payload.data;
        }
    },
    extraReducers: builder => {
        builder.addCase(handleCheckboxChange.fulfilled, (state, action) => {
            const { type, data } = action.payload;
            state[type] = data;
        });
    }
});

export const { changeParams } = requestSlice.actions;
export default requestSlice.reducer;
