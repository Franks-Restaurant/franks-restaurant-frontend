import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { Client, Account } from "appwrite";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AppDispatch } from "@/store";

// Appwrite setup
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleSignInModal = ({ isOpen, onClose }: GoogleSignInModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        import.meta.env.VITE_SUCCESS_URL,  // e.g. https://yourapp.com/auth/callback
        import.meta.env.VITE_FAILURE_URL   // e.g. https://yourapp.com
      );
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[36%] h-[36%] p-8 rounded-2xl shadow-2xl border border-gray-200 relative flex flex-col justify-between animate-fadeInUp">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose size={22} />
        </button>

        <div className="text-center mt-4 mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">Sign in</h2>
          <p className="text-sm text-gray-500 mt-2">
            Use your Google account to continue
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <button
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3 px-4 rounded-lg hover:shadow-lg hover:bg-gray-50 transition duration-200"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-700 font-medium text-base">
              Sign in with Google
            </span>
          </button>
        </div>

        <div className="text-xs text-gray-400 text-center mb-2">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-blue-500">
            Privacy Policy
          </a>.
        </div>
      </div>
    </div>
  );
};

export default GoogleSignInModal;
