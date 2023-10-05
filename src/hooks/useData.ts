import React, { useEffect, useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import getData from '../services/getData';
import postData from '../services/postData';
import { TDataProps } from '../types/data';
import deleteData from '../services/deleteData';
import putData from '../services/putData';


const useData = (type: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toggleData, setToggleData] = useState<boolean>(false)

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
  }, [toggleData])

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
  const handleEditData = async (data: TDataProps, id: number) => {
    try {
      const response = await putData(type, id, data);

      if (response === 200) setToggleData(prev => !prev)
    } catch (error: any) {

      setError(error);
    } finally {
      setLoading(false);
    }
  }
  const handleDeleteData = async (id: number) => {
    try {
      const response = await deleteData(type, id);
      if (response === 200) setToggleData(prev => !prev)
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    data, loading, error,
    handleAddData,
    handleDeleteData,
    handleEditData
  };
}

export default useData