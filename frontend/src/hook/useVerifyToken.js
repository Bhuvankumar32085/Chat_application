import { useEffect } from "react";
import { useDispatch } from "react-redux";
import instance from "../utils/axios";
import { setIsLoggedIn } from "../features/authSlice";

export const useVerifyToken = (isLoggedIn) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchToken = async () => {
      try {
        const res = await instance.get("/user/verify");
        if (res.data?.success) {
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(setIsLoggedIn(false));
        }
      } catch (error) {
        dispatch(setIsLoggedIn(false));
        console.log("Token fetch error:", error.message);
      }
    };

    fetchToken();
  }, [dispatch, isLoggedIn]);
};
