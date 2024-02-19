import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import AddCollection from "./AddCollection.tsx";
import { MdCollectionsBookmark } from "react-icons/md";
import {
    deleteCollection,
    setEndpPath,
    fetchCollections,
    deleteEndpoint
} from "../redux/slices/collectionSlice.tsx";
import { setRequest } from "../redux/slices/requestSlice.tsx";

function CollectionCard({
    collection,
    collecInd
}: {
    collection: CollectionItem;
    collecInd: number;
}) {
    const [cardState, setCardState] = useState(false);
    const dispatch = useDispatch();
    const getC = (mth: ReqMethods): string => {
        if (mth == "GET") {
            return "text-green-500";
        } else if (mth == "POST") {
            return "text-blue-500";
        } else if (mth == "PUT") {
            return "text-orange-500";
        } else if (mth == "PATCH") {
            return "text-yellow-500";
        } else {
            return "text-red-500";
        }
    };
    const handleDeleteCollection = () => {
        dispatch(deleteCollection(collecInd) as any);
    };
    const setEndpoint = (ind: number) => {
        dispatch(setRequest(collection.endpoints[ind].data) as any);
        dispatch(setEndpPath([collecInd, ind]) as any);
    };
    const handleEPdelete = (eInd: number) => {
        dispatch(deleteEndpoint([collecInd, eInd]) as any);
    };
    return (
        <div className="p-1">
            <div className="text-base font-medium flex items-center gap-2">
                <h5
                    className="flex gap-1 items-center w-[90%]"
                    onClick={() => setCardState(cs => !cs)}
                >
                    {cardState ? <FaChevronUp /> : <FaChevronDown />}
                    <span className="text-nowrap overflow-hidden">
                        {collection.name}
                    </span>
                </h5>
                <FaTrash onClick={handleDeleteCollection} />
            </div>
            {cardState && (
                <ul className="flex flex-col pl-3 w-full">
                    {collection.endpoints.length == 0 && (
                        <h3 className="text-base">No endpoints</h3>
                    )}
                    {collection.endpoints.length !== 0 &&
                        collection.endpoints.map((end: EndPType, i: number) => (
                            <li
                                className="flex items-center text-base gap-1 w-full justify-between border-t border-gray-800"
                                key={i}
                            >
                                <h6
                                    className="flex justify-center items-center gap-1"
                                    onClick={() => setEndpoint(i)}
                                >
                                    <span
                                        className={`text-[8px] ${getC(
                                            end.data.method
                                        )}`}
                                    >
                                        {end.data.method}
                                    </span>
                                    {end.name}
                                </h6>
                                <button
                                    className="text-sm justify-self-end"
                                    onClick={() => handleEPdelete(i)}
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
export default function CollectionTab() {
    const [asideState, setAsideState] = useState(false);
    const dispatch = useDispatch();
    const closeBar = () => {
        setAsideState(false);
    };
    const openBar = () => {
        setAsideState(true);
    };
    const collections = useSelector((state: any) => state.collections);
    const [collectionModal, setCollectionModal] = useState(false);
    const toggleCollectionModal = () => {
        setCollectionModal(s => !s);
    };
    useEffect(() => {
        dispatch(fetchCollections({}));
    }, []);
    return (
        <>
            {collectionModal && (
                <AddCollection toggleCollectionModal={toggleCollectionModal} />
            )}
            <section className="w-full flex justify-start px-2">
                <button
                    onClick={openBar}
                    className="bg-gray-950 rounded  p-2 shadow"
                >
                    <MdCollectionsBookmark />
                </button>
                <aside
                    className={`absolute ${
                        asideState ? "w-60" : "w-0"
                    } h-full bg-gray-950 shadow-gray-900 top-0 left-0 overflow-hidden z-50`}
                >
                    <div className="p-2 w-full h-full flex flex-col">
                        <button className="self-end mb-2" onClick={closeBar}>
                            <RxCross1 />
                        </button>
                        <button
                            className="rounded bg-indigo-600 max-w-fit p-1 self-end my-2 flex justify-center items-center"
                            onClick={() => {
                                toggleCollectionModal();
                                closeBar();
                            }}
                        >
                            <FaPlus />
                            Create
                        </button>

                        <div className="w-full">
                            { (collections.collections.length=== 0) ? (
                                <h3 className="text-center font-bold text-xl">
                                    No collections
                                </h3>
                            ) : (
                                <>
                                    <h3 className="text-center font-bold text-xl">
                                        Your Collections
                                    </h3>

                                    <div className="w-full flex flex-col mt-2">
                                        {collections.collections.map(
                                            (
                                                collection: CollectionItem,
                                                i: number
                                            ) => (
                                                <CollectionCard
                                                    key={i}
                                                    collection={collection}
                                                    collecInd={i}
                                                />
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </aside>
            </section>
        </>
    );
}
