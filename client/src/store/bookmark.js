import BookmarkService from '@/services/BookmarkService.js'
export default{
  actions:{
    async postBookmark({commit}, songId){
      try{
        await BookmarkService.post(songId);
        return true;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    async getBookmarks({commit}, search){
      try{
        console.log('getBookmarks');
        let res = [];
        if(search){
          res = await BookmarkService.index(search);
        }else
          res = await BookmarkService.all();
        return res.data;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    async getBookmark({commit}, songId){
      try{
        console.log('getBookmark2');
        const res = await BookmarkService.get(songId);
        return res.data;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    async deleteBookmark({commit}, songId){
      try{
        console.log('deleteBookmarks');
        await BookmarkService.delete(songId);
        return true;
      }catch(err){
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    }
  }
}