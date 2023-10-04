import React, { useEffect, useState } from 'react'
import getMenu from '../services/menu/getMenu';
import { AxiosResponse, AxiosError } from 'axios'


const useMenu = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await getMenu();
        setData(response);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [])

  const handleAddMenu = async () => {

  }

  return { data, loading, error };
}

export default useMenu