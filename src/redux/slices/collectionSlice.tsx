import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: CollectionsType = {
    collections: [],
    endpPath: [-1, -1]
};
const updateLocalStorage = (collections: CollectionsType) => {
    localStorage.setItem("collections", JSON.stringify(collections));
};
const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        fetchCollections: (state, _) => {
            const collections = JSON.parse(
                localStorage.getItem("collections") || "{}"
            );
            state.collections = collections.collections || [];
        },
        addCollection: (state, action: PayloadAction<string>) => {
            state.collections.push({ name: action.payload, endpoints: [] });
            updateLocalStorage(state);
        },
        deleteCollection: (state, action: PayloadAction<number>) => {
            state.collections = state.collections.filter(
                (_, ind) => ind !== action.payload
            );
            updateLocalStorage(state);
        },
        addEndpoint: (state, action: PayloadAction<AddEndpointPayload>) => {
            const { ind, data } = action.payload;
            (state.collections[ind].endpoints ??= []).push(data as EndPType);
            state.endpPath = [ind, state.collections[ind].endpoints.length - 1];
            updateLocalStorage(state);
        },
        clearEndpPath: state => {
            state.endpPath = [-1, -1];
            updateLocalStorage(state);
        },
        setEndpPath: (state, action) => {
            state.endpPath = action.payload;
            updateLocalStorage(state);
        },
        updateEndpoint: (state, action: PayloadAction<RequestStateType>) => {
            const [cInd, eInd] = state.endpPath;
            state.collections[cInd].endpoints[eInd].data = action.payload;
            updateLocalStorage(state);
        },
        deleteEndpoint: (state, action: PayloadAction<number[]>) => {
            const [cInd, eInd] = action.payload;
            let newCollections = state.collections.map((colletion, ind) => {
                if (ind == cInd) {
                    let newObj = { ...colletion };
                    newObj.endpoints = colletion.endpoints.filter(
                        (_, i) => i !== eInd
                    );
                    return newObj;
                }
                return colletion;
            });
            state.collections = newCollections;
            updateLocalStorage(state);
        }
    }
});
export const {
    fetchCollections,
    addCollection,
    deleteCollection,
    addEndpoint,
    clearEndpPath,
    setEndpPath,
    updateEndpoint,
    deleteEndpoint
} = collectionSlice.actions;
export default collectionSlice.reducer;
