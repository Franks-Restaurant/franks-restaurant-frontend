import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";

const RootRedirector = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/index", { replace: true }); // regular user route
        }
      } else {
        // User is logged out
        navigate("/index", { replace: true }); // or wherever your login page is
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Optional: can return null or a placeholder if not loading and user is handled
  return null;
};

export default RootRedirector;
