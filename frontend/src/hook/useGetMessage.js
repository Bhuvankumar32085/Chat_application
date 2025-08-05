import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setAllMessages } from "../features/messageSlice";

// http://localhost:5002/api/message/get/688dc8d9271ccf0a976f49b5

export const useGetMessage = (isLoggedIn) => {
  const {selectedUser}=useSelector(store=>store.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn|| !selectedUser) return;
    const fetchAllMessages = async () => {
      try {
        const res = await instance.get(`/message/get/${selectedUser?._id}`);
        if (res.data?.success) {
          dispatch(setAllMessages(res.data?.messages));
        }
      } catch (error) {
        console.log("get messages hook error:", error.message);
      }
    };

    fetchAllMessages();
  }, [dispatch, isLoggedIn,selectedUser]);
};
