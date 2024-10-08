import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://hotel-booking-app-backend-8e5v.onrender.com/api';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}${url}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}${url}`);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

return { data, loading, error, reFetch };
};

export default useFetch;