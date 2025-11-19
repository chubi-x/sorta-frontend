import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "..";

export function useFetchUser(updateUser: (user: User) => void, navigate: NavigateFunction) {
  const success = (message: string) => toast.success(message, { position: "bottom-right" });
  const error = (message: string) => toast.error(message, { position: "bottom-right" });
  const user: User = JSON.parse(sessionStorage.getItem("user")!);
  const fetched = sessionStorage.getItem("user-fetched");

  return useQuery("user", fetchUser, {
    enabled: fetched === "yes",
    onSuccess(data) {
      if (data?.success) {
        updateUser({ ...data.data, isLogged: true });
        sessionStorage.setItem("user", JSON.stringify({ ...data.data, isLogged: true }));
      } else {
        if (data?.message) error(data.message);
        navigate("/login");
        sessionStorage.clear();
        localStorage.clear();
      }
    },
    onError(err) {
      if (err) alert(err);
      navigate("/login");
    },
  });
}
