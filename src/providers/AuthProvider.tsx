import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { googleLoginAction } from "@/store/actions/auth.action";
import { useNavigate } from "react-router-dom";
import { Account, Client } from "appwrite";
import { toast } from "sonner";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const checkedSessionRef = useRef(false); // to avoid multiple runs

  useEffect(() => {
    if (checkedSessionRef.current) return; // already checked
    checkedSessionRef.current = true;


    async function checkSession() {
      try {
        console.log("[AuthProvider] Checking Appwrite session...");
        const appwriteUser = await account.get();
        console.log("[AuthProvider] Appwrite user:", appwriteUser);
        console.log("[User] OurDB user:", user);


        if (!user) {
          const userPayload = {
            name: appwriteUser.name,
            email: appwriteUser.email,
            profilePic: appwriteUser.prefs?.profilePic || "",
            role: "user",
          };

          const result = await dispatch(googleLoginAction(userPayload)).unwrap();
          toast.success("Logged in successfully!");

          if (
            result.user.role === "admin" &&
            !window.location.pathname.startsWith("/admin")
          ) {
            navigate("/admin/dashboard", { replace: true });
          }
        } else {
          if (
            user.role === "admin" &&
            !window.location.pathname.startsWith("/admin")
          ) {
            navigate("/admin/dashboard", { replace: true });
          }
        }
      } catch (error: any) {
        if (error?.code === 401) {
          console.log("[AuthProvider] No active session.");
          if (window.location.pathname !== "/") {
            navigate("/", { replace: true });
          }
        } else {
          console.error("[AuthProvider] Unexpected error:", error);
          if (window.location.pathname !== "/") {
            navigate("/", { replace: true });
          }
        }
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [dispatch, navigate, user]); // You can also remove user here and rely on ref

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4" />
          <p className="text-gray-500">Checking login status...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
