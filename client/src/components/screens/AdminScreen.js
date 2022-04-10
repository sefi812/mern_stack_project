import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminScreen.css";

// Components
import UserItem from "../comps/UserItem";

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
        const data = await axios.get("http://localhost:5000/api/users", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="admin__list">
      {privateData.map((item) => (
        <UserItem
          key={item.id}
          username={item.username}
          email={item.email}
          password={item.password}
          permissions={item.permissions}/>    
      ))}
    </div>
  );
};

export default LoginScreen;
