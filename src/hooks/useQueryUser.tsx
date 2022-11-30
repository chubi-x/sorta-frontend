import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { fetchUser } from "../api";

export function useQueryUser(
  user: User,
  updateUser: (user: User) => void,
  navigate: NavigateFunction
) {
  const returnUser = async () => {
    const abortController = new AbortController();
    const userResponse: UserResponse = await fetchUser(abortController);
    return userResponse;
  };

  return useQuery("user", returnUser, {
    enabled: !user,
    onSuccess(data) {
      if (data.success) {
        updateUser({ ...data.data });
        sessionStorage.setItem("user", JSON.stringify({ ...data.data }));
      } else {
        alert(data.message);
        navigate("/login");
      }
    },
    onError(err) {
      alert(err);
      navigate("/login");
    },
  });
}