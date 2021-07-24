const { Song } = require('../models/Song');

module.exports = {
  all(req, res) {
    console.log('Get all songs');
    if (req.query && req.query.search){
      console.log('Index song');
      Song.index(req.query.search, (err, songs)=>{
        if(err) return res.status(404).json({msg:"Songs not found"});
        return res.json(songs);
      });
    } else{
    Song.all((err, songs) => {
      console.log(err);
      if (err) return res.status(500).json({ msg: "Problem with getting songs" });
      return res.json(songs);
    })
  }
  },
  get(req, res) {
    console.log('Get song ' + req.params.id);
      Song.get(req.params.id, (err, song) => {
        if (err) return res.status(500).json({ msg: "Problem with getting songs by id" });
        return res.json(song);
      });  
  },
  getRange(req, res) {
    console.log('Get Song range');
    Song.getRange(res.query.from, res.query.to, (err, songs) => {
      if (err) return res.status(500).json({ msg: "Problem with getting songs" });
      return res.json(songs);
    });
  },
  post(req, res) {
    console.log('Post song');
    const song = new Song(req.body);
    song.save((err) => {
      console.log(err);
      if (err) return res.status(500).json({ msg: "Problem with saving song" });
      return res.json(song.id);
    });
  }
}