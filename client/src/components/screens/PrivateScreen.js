import { useState, useEffect } from "react";
import axios from "axios";
import "./MoviesScreen.css";

const MoviesScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchMoviesDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const data = await axios.get("http://localhost:5000/api/movies", config);
        setMoviesData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchMoviesDate();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      <ul>
        {
          privateData.map(item => {
            return <li key={item._id}>{item.name}</li>
          })
        }
      </ul>
    </div>
  );
};

export default MoviesScreen;
