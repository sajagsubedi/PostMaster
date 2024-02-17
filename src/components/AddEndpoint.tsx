import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { addEndpoint } from "../redux/slices/collectionSlice.tsx";
import { toast } from "react-toastify";
export default function AddEndpoint() {
    const [modalState, setModalState] = useState(false);
    const [selectModal, setSelectModal] = useState(false);
    const [collectionInd, setCollectionInd] = useState(-1);
    const collections = useSelector((state: any) => state.collections);
    const endPointName = useRef<HTMLInputElement | null>(null);
    const request = useSelector((state: any) => state.request);
    const dispatch = useDispatch();

    const toggleModal = () => {
        if (endPointName.current) {
            endPointName.current.value = "";
        }
        setCollectionInd(-1);
        setModalState(m => !m);
    };
    const toggleSelectModal = () => {
        setSelectModal(s => !s);
    };
    const handleAdd = () => {
        if (endPointName.current) {
            if (endPointName.current.value.length == 0) {
                toast.error("Invalid Endpoint name!");
                return;
            }
            if (collectionInd == -1) {
                toast.error("Invalid Collection!");
                return;
            }
            dispatch(
                addEndpoint({
                    data: { name: endPointName.current.value, data: request },
                    ind: collectionInd
                }) as any
            );
        }
        toggleModal();
    };
    return (
        <>
            <button
                className="self-end p-1 rounded bg-green-500 flex items-center"
                onClick={toggleModal}
            >
                <FaPlus />
                Add To Collection
            </button>
            {modalState && (
                <div className="w-72 min-h-52 box-border bg-gray-950  z-99 absolute rounded container mx-4 p-3 flex flex-col items-center gap-2">
                    <button
                        className="text-white self-end"
                        onClick={toggleModal}
                    >
                        <RxCross1 />
                    </button>
                    <h3 className="text-xl font-bold ">Add to collection</h3>
                    <div className="w-full flex flex-col gap-0">
                        <label htmlFor="name" className="w-full">
                            Name
                        </label>
                        <input
                            type="text"
                            ref={endPointName}
                            className="w-full bg-gray-900 rounded border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1/2 px-2 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Enter name for endpoint"
                        />
                    </div>
                    <div className="relative w-full">
                        <label htmlFor="collection">Collection</label>
                        <div
                            className="bg-gray-900 rounded p-1 w-48 text-gray-100 flex items-center justify-between"
                            onClick={toggleSelectModal}
                        >
                            {collectionInd !== -1
                                ? collections.collections[collectionInd].name
                                : "Select Collection"}
                            {selectModal ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {selectModal && (
                            <ul className="w-48 bg-gray-900 rounded absolute translate-y-2 p-1 flex flex-col">
                                {collections.collections.length == 0 ? (
                                    <h5 className="font-medium">
                                        No Collections
                                    </h5>
                                ) : (
                                    collections.collections.map(
                                        (val: CollectionItem, ind: number) => (
                                            <li
                                                className="border-b border-gray-800"
                                                key={ind}
                                                onClick={() => {
                                                    setCollectionInd(ind);
                                                    toggleSelectModal();
                                                }}
                                            >
                                                {val.name}
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                    <button
                        className="py-1 px-2 bg-indigo-600 rounded text-white w-full"
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                </div>
            )}
        </>
    );
}
