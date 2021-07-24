import SongService from '@/services/SongService.js'
export default{
  actions:{
    async postSong({commit}, song){
      try{
        const res = await SongService.post(song);
        // return res.data.status == 200;
        return true;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    async getSongs({commit}, search){
      try{
        console.log('getSongs');
        let res = [];
        // задан параметр поиска
        if(search){
          res = await SongService.index(search);
        }else{
          // получение всех песен
          res = await SongService.all();
        }
        return res.data;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    async getSong({commit}, id){
      try{
        console.log('getSong '+id);
        const res = await SongService.get(id);
        return res.data;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
  }
}