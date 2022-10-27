import { useContext, useEffect } from "react";
import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";
import { Bookmarks } from "../Bookmarks";

export function Dashboard() {
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    const abortController = new AbortController();
    const returnUser = async () => {
      const userResponse: UserResponse = await fetchUser(abortController);
      if (userResponse.success) {
        setUser((prev) => {
          return {
            ...prev,
            ...userResponse.data,
          };
        });
        localStorage.setItem("user", JSON.stringify({ ...user }));
      } else {
        // if not logged in backend, log out in frontend
        if (userResponse.message?.includes("not logged in")) {
          setUser((prev) => {
            return { ...prev, isLogged: false };
          });
        }
      }
    };
    returnUser();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <img src={user?.pfp} alt="profile pic" />
      <h1>Welcome, {user?.name}</h1>

      {user.isLogged && <Bookmarks />}
    </>
  );
}

