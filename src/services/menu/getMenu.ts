import axios from 'axios'
const getMenu = async () => {
  try {
    const res = await axios.get('http://localhost:3030/menus')
    if (res.statusText !== 'OK') throw new Error('Something goes wrong')
    return res.data
  } catch (error) {
    return "Something went wrong"
  }
}

export default getMenu;