import axios from 'axios'
import { TDataProps } from '../types/data'

const postData = async (url: string, data: TDataProps) => {
  try {
    const res = await axios.post('http://localhost:3030/' + url, data)
    if (res.statusText !== 'OK') throw new Error('Something goes wrong')
    return res.data
  } catch (error) {
    return "Something went wrong"
  }
}

export default postData;