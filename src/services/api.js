import Axios from "axios";

export default Axios.create({
  baseURL: 'https://trello-liv-saude.herokuapp.com/'
});