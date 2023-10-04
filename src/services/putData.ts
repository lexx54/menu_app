import axios from 'axios'
const putData = async (url: string, data: any) => {
  try {
    const res = await axios.put('http://localhost:3030/' + url, data)
    if (res.statusText !== 'OK') throw new Error('Something goes wrong')
    return res.data
  } catch (error) {
    return "Something went wrong"
  }
}

export default putData;