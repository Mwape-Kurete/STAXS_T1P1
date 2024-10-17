import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthTokenContext = createContext();

export const useAuthToken = () => useContext(AuthTokenContext);

export const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/api/token"); // Request token from the backend
        setAuthToken(response.data.access_token);
        console.log("Token fetched and stored:", response.data.access_token);
      } catch (error) {
        console.error("Error fetching the access token:", error);
      }
    };

    fetchToken();

    // Refresh the token every 55 minutes (Spotify token expires after 1 hour).
    const interval = setInterval(fetchToken, 55 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
};
