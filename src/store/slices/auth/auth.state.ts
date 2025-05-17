export interface GoogleUser {
  name: string;
  email: string;
  profilePic?: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePic?: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error?: string;
  }
  