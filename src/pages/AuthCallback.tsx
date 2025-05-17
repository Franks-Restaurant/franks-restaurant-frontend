import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { toast } from "sonner";

import { AppDispatch } from "@/store";
import { googleLoginAction } from "@/store/actions/auth.action";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);

const AuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const user = await account.get();

        const userPayload = {
          name: user.name,
          email: user.email,
          profilePic: user.prefs?.profilePic || "",
        };

        try {
          const result = await dispatch(googleLoginAction(userPayload)).unwrap();
          console.log("Google login result:", result);
          toast.success("Logged in successfully!");
        
          if (result.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.error("Google login dispatch failed", err);
          toast.error("Google login failed");
          navigate("/");
        }
        
      } catch (error) {
        toast.error("Authentication failed.");
        navigate("/");
      }
    };

    authenticate();
  }, [dispatch, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loader mb-4" />
        <p className="text-gray-500">Signing you in securely...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
