import { useEffect } from "react";
import { useDispatch } from "react-redux";
import instance from "../utils/axios";
import { setAllusers } from "../features/userSlice";

export const useGetAllUsers = (isLoggedIn) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchAllUser = async () => {
      try {
        const res = await instance.get("/user/get-users");
        if (res.data?.success) {
          dispatch(setAllusers(res.data?.users));
        }
      } catch (error) {
        console.log("get All users error", error.message);
      }
    };

    fetchAllUser();
  }, [dispatch, isLoggedIn]);
};
