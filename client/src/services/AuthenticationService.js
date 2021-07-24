import Api from "./Api";

export default {
    register(credentials){
        return Api.Api().post('register', credentials);
    },
    login(credentials){
        return Api.Api().post('login', credentials);
    }

    
} 