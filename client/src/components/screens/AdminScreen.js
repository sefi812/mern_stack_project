import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminScreen.css";

const LoginScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState([]);

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const data = await axios.get("http://localhost:5000/api/movies", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default LoginScreen;
