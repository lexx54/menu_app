import axios from 'axios'
const putData = async (url: string, id: number, data: any) => {
  try {
    const res = await axios.put('http://localhost:3030/' + url + "/" + id, data)
    if (res.statusText !== 'OK') throw new Error('Something goes wrong')

    return res.status
  } catch (error) {
    return "Something went wrong"
  }
}

export default putData;