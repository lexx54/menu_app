import React, { useEffect, useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import getData from '../services/getData';
import postData from '../services/postData';
import { TDataProps } from '../types/data';


const useData = (type: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await getData(type);
        setData(response);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [])

  const handleAddData = async (data: TDataProps) => {
    try {
      const response: AxiosResponse = await postData(type, data);
      setData(response);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  const handleEditData = async () => {

  }
  const handleDeleteData = async () => {

  }

  return {
    data, loading, error,
    handleAddData,
    handleDeleteData,
    handleEditData
  };
}

export default useData