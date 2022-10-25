import { useContext, useEffect } from "react";
import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";

export function Dashboard() {
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    const abortController = new AbortController();
    const returnUser = async () => {
      const userResponse: UserResponse = await fetchUser(abortController);
      if (userResponse.success) {
        setUser((prev) => {
          return { ...userResponse.data };
        });
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
    </>
  );
}
