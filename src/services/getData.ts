import axios from 'axios'
const getData = async (url: string) => {
  try {
    const res = await axios.get('http://localhost:3030/' + url)
    if (res.statusText !== 'OK') throw new Error('Something goes wrong')
    return res.data
  } catch (error) {
    return "Something went wrong"
  }
}

export default getData;