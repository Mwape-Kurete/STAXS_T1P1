// AuthTokenContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import qs from "qs"; // Ensure qs is installed (`npm install qs`)

const CLIENT_ID = "6dfe161492d14a558bea14512386b896";
const CLIENT_SECRET = "7d449a9084ca46b2a30397b3d9ad11c8";

const AuthTokenContext = createContext();

export const useAuthToken = () => useContext(AuthTokenContext);

export const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const data = qs.stringify({ grant_type: "client_credentials" });
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`, // Using global variables
      };

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          data,
          { headers }
        );
        setAuthToken(response.data.access_token); // Update the context state
        console.log("Token fetched and stored:", response.data.access_token);
      } catch (error) {
        console.error("Error fetching the access token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
};
