import axios from 'axios';
import store from '../store'

export default {
Api() {
    return axios.create({    
        baseURL: 'http://localhost:3000/'
    })
},
ApiAuth(){
  const token = store.getters.token;
  return axios.create({    
    baseURL: 'http://localhost:3000/',
    headers: {
      "Authorization": `Bearer ${token}`
    }
})
}
}