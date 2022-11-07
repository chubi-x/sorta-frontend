import { useEffect } from "react";
import { logoutUser } from "../../api";
import { useNavigate } from "react-router";
export function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    let didLogout = false;
    const controller = new AbortController();
    const logout = async () => await logoutUser(controller);
    const goToLogin = () => navigate("/");
    if (!didLogout) {
      goToLogin();
    }
    logout();

    return () => {
      didLogout = true;
      controller.abort();
    };
  }, [navigate]);
  return <></>;
}
