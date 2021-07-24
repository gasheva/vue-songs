const sql = require('sqlite3').verbose();
const db = new sql.Database('users');
const {v4} = require('uuid');

db.serialize(()=>{
    console.log('Creating DB');
    const del = 'DROP TABLE IF EXISTS songs;'
    const com = `CREATE TABLE IF NOT EXISTS songs(
        id VARCHAR(50) primary key, title VARCHAR(50) UNIQUE, artist VARCHAR(50), genre VARCHAR(50), 
        album VARCHAR(50), albumImage TEXT, youtubeId TEXT, lyrics TEXT, tab TEXT
    )`;
    // db.run(del);
    db.run(com);
})
class Song{
    constructor(obj){
        this.id = obj.id;
        this.title = obj.title;
        this.artist = obj.artist;
        this.genre = obj.genre;
        this.album = obj.album;
        this.albumImage = obj.albumImage;
        this.youtubeId = obj.youtubeId;
        this.lyrics = obj.lyrics;
        this.tab = obj.tab;
    }
    static get(id, cb){
        const com = "SELECT * FROM songs WHERE id = ?";
        db.get(com, id, cb);
    }
    static index(search, cb){
      const com = "SELECT id, title, artist, album FROM songs WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ? OR album LIKE ?";
      db.all(com, ['%'+search+'%','%'+search+'%','%'+search+'%','%'+search+'%'], cb);
  }
    static all(cb){
        const com = "SELECT id, title, artist, album FROM songs";
        db.all(com, cb);
    }
    static getRange(from, to, cb){
        const com = `SELECT id, title, artist, album FROM songs LIMIT ? OFFSET ?`
        db.all(com, +to-+from, from, cb);
    }
    save(cb){
        this.id = v4();
        const com = `INSERT INTO songs(id, title, artist, genre, album, albumImage, youtubeId, lyrics, tab) 
                    VALUES(?,?,?,?,?,?,?,?,?);`
        db.run(com, this.id, this.title, this.artist, this.genre, this.album, this.albumImage, this.youtubeId, this.lyrics, this.tab, cb);
    }
    static update(updated, id, cb){
        const toUpdate = Object.entries(updated);
        const com = `UPDATE songs
            SET 
                ${toUpdate.map((k,v)=>k+'=?').join(',')}
            WHERE
                id=? `;
        db.run(com, [...(toUpdate.map(k=>k[1])), id], cb);
    }

}

module.exports.Song = Song;