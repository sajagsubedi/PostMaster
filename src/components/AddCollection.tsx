import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { addCollection } from "../redux/slices/collectionSlice.tsx";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface propType {
    toggleCollectionModal: () => void;
}

export default function AddCollection({ toggleCollectionModal }: propType) {
    const collectionName = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const handleAdd = () => {
      if(collectionName.current){
        if (collectionName.current.value.length == 0) {
            toast.error("Invalid Collection Name!");
            return;
        }
        dispatch(addCollection(collectionName.current.value));
        toggleCollectionModal();
      }
    };
    return (
        <div className="w-72 h-40 box-border bg-gray-950  z-99 absolute rounded container mx-4 p-3 flex flex-col items-center gap-2">
            <button
                className="text-white self-end"
                onClick={toggleCollectionModal}
            >
                <RxCross1 />
            </button>
            <h3 className="text-xl font-bold ">Create Collection</h3>
            <input
                type="text"
                ref={collectionName}
                className="w-full bg-gray-900 rounded border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1/2 px-2 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter name for collection"
            />
            <button
                className="py-1 px-2 bg-indigo-600 rounded text-white "
                onClick={handleAdd}
            >
                Create
            </button>
        </div>
    );
}
