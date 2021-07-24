const { Bookmark } = require('../models/Bookmark');
const { Song } = require('../models/Song');

module.exports = {
  all(req, res) {
    console.log('Get all bookmarks');
    if(req.query.search){
      Bookmark.allFiltered(req.user.id, req.query.search, (err, bookmarks) => {
        if (err) return res.status(500).json({ msg: "Problem with getting bookmarks" });
        return res.json(bookmarks);
      })
    }else
    Bookmark.all(req.user.id, (err, bookmarks) => {
      if (err) return res.status(500).json({ msg: "Problem with getting bookmarks" });
      return res.json(bookmarks);
    })
  },
  get(req, res){
    console.log('Get bookmark');
      Bookmark.get(req.params.songId, req.user.id, (err, bookmark)=>{
        if (err) return res.status(500).json({ msg: "Problem with getting bookmark" });
        return res.json(bookmark?true:false)
      })
  },
  delete(req, res) {
    console.log('Delete bookmark');
      Bookmark.delete(req.query.song, req.user.id, (err, bookmark) => {
        if (err) return res.status(500).json({ msg: "Problem with deleting bookmark" });
        return res.sendStatus(200);
    });
  },
  post(req, res) {
    console.log('Post bookmark');
    const bookmark = new Bookmark({songId: req.query.song, userId: req.user.id});
    console.log(bookmark);
    bookmark.save((err) => {
      console.log(err);
      if (err) return res.status(500).json({ msg: "Problem with saving bookmark" });
      return res.sendStatus(200);
    });
  }
}