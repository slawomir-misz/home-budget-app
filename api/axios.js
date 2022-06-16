import Axios from 'axios';

export default Axios.create({
  baseURL: 'https://hba-api.azurewebsites.net/api/',
});
