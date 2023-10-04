import axios from 'axios'
const deleteData = async (url: string, id: number) => {
  try {
    const res = await axios.delete('http://localhost:3030/' + url + "/" + id)
    if (res.statusText !== 'OK') throw new Error('Something goes wrong')
    return res.status
  } catch (error) {
    return "Something went wrong"
  }
}

export default deleteData;