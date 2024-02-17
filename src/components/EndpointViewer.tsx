import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { clearRequest } from "../redux/slices/requestSlice.tsx";
import { clearEndpPath,updateEndpoint } from "../redux/slices/collectionSlice.tsx";
import { useEffect } from "react";
export default function EndpointViewer() {
    const { collections, endpPath } = useSelector(
        (state: any) => state.collections
    );
    const request = useSelector((state: any) => state.request);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(clearRequest());
        dispatch(clearEndpPath());
    };
    useEffect(() => {
        dispatch(updateEndpoint(request) as any);
    }, [request]);

    return (
        <>
            <div className="w-full flex p-1 flex-col bg-gray-950 rounded">
                <h5 className="font-bold text-lg">Collection:</h5>
                <h6 className="font-medium flex justify-between px-1 text-base">
                    {collections[endpPath[0]].name}/
                    {collections[endpPath[0]].endpoints[endpPath[1]].name}
                    <RxCross1 onClick={handleClose} />
                </h6>
            </div>
        </>
    );
}
