import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import React from "react";

const initialState: RequestStateType = {
    method: "GET",
    url: "",
    params: [],
    headers: [],
    body: [],
    jsonbody: "",
    bodytype: "form",
    jsonState: undefined
};

export const handleCheckboxChange = createAsyncThunk(
    "request/handleCheckboxChange",
    ({
        e,
        ind,
        tab,
        request
    }: {
        e: React.FormEvent<HTMLInputElement>;
        ind: number;
        tab: NavigationTabs;
        request: RequestStateType;
    }): ActionReturnObject => {
        let newTabValue: Array<ValueType> = request[tab].map(
            (parameter: ValueType, i: number) => {
                if (i === ind) {
                    parameter = { ...parameter, isChecked: e.target.checked };
                }
                return parameter;
            }
        );
        return { type: tab, data: newTabValue };
    }
);

export const deleteValue = createAsyncThunk(
    "request/deleteValue",
    ({
        ind,
        tab,
        request
    }: {
        ind: number;
        tab: NavigationTabs;
        request: RequestStateType;
    }): ActionReturnObject => {
        let newTabValue: Array<ValueType> = request[tab].map(
            (parameter: ValueType, i: number) => {
                if (i === ind) {
                    return;
                }
                return parameter;
            }
        );
        return { type: tab, data: newTabValue };
    }
);

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        setMethod: (state, action: PayloadAction<ReqMethods>) => {
            state.method = action.payload;
        },
        setUrl:(state,action:PayloadAction<String>)=>{
          state.url=action.payload
        },
        changeRequestVal: (state, action: PayloadAction<ValueforChange>) => {
            state[action.payload.type] = action.payload.value;
        },
        addValue: (state, action) => {
            state[action.payload.type].push(action.payload.value);
        },
        setJsonbody: (state, action: PayloadAction<String>) => {
            state.jsonbody = action.payload;
        },
        setBodytype: (state, action: payload<RequestStateType["bodytype"]>) => {
            state.bodytype = action.payload;
        },
        setJsonState: (state, action: PayloadAction<String>) => {
            try {
                JSON.parse(action.payload);
            } catch (e) {
              state.jsonState=false
              return
            }
              state.jsonState=true
        }
    },
    extraReducers: builder => {
        builder.addCase(
            handleCheckboxChange.fulfilled,
            (state, action: PayloadAction<ActionReturnObject>) => {
                const { type, data } = action.payload;
                state[type] = data;
            }
        );
        builder.addCase(
            deleteValue.fulfilled,
            (state, action: PayloadAction<ActionReturnObject>) => {
                const { type, data } = action.payload;
                state[type] = data;
            }
        );
    }
});

export const {
    changeRequestVal,
    setMethod,
    addValue,
    setJsonbody,
    setBodytype,
    setJsonState,
    setUrl
} = requestSlice.actions;
export default requestSlice.reducer;
