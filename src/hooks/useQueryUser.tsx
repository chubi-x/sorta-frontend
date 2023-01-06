import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { fetchUser } from "../api";

export function useFetchUser(
  logged: boolean,
  updateUser: (user: User) => void,
  navigate: NavigateFunction
) {
  return useQuery("user", fetchUser, {
    // enabled: logged,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data?.success) {
        updateUser({ ...data.data, isLogged: true });
        sessionStorage.setItem("user", JSON.stringify({ ...data.data, isLogged: true }));
      } else {
        if (data?.message) alert(data.message);
        navigate("/login");
      }
    },
    onError(err) {
      if (err) alert(err);
      navigate("/login");
    },
  });
}
