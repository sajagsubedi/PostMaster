/// <reference types="vite/client" />
  type ReqTypes="GET"|"POST"|"PUT"|"DELETE"|"PATCH"
  
  interface DropDownProps {
    reqType: string;
    setReqType: () => void;
};
