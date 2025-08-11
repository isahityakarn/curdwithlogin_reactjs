import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useNocData(nocId) {
  const [nocData, setNocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:5050/api/noc/${nocId}`)
      .then(res => {
        // console.log(res.data);
        setNocData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [nocId]);

  return { nocData, loading, error };
}
