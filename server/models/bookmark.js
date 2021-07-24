const sql = require('sqlite3').verbose();
const db = new sql.Database('users');

db.serialize(()=>{
    console.log('Creating DB');
    const del = 'DROP TABLE IF EXISTS bookmarks;'
    const com = `CREATE TABLE IF NOT EXISTS bookmarks(
        songId VARCHAR(50) NOT NULL, userId VARCHAR(50), PRIMARY KEY (songId, userId)
    )`;
    // db.run(del);
    db.run(com);
})
class Bookmark{
    constructor(obj){
        this.userId = obj.userId;
        this.songId = obj.songId;
    }
    static get(song, user, cb){
        const com = "SELECT * FROM bookmarks WHERE songId = ? AND userId = ?";
        db.get(com, song, user, cb);
    }
    static all(user, cb){
        const com = `SELECT id, title, artist, album FROM songs 
        JOIN bookmarks ON songs.id=bookmarks.songId 
        WHERE userId = ?`;
        db.all(com, user, cb);
    }
    static allFiltered(user, search, cb){
      const com = `SELECT id, title, artist, album FROM songs 
      JOIN bookmarks ON songs.id=bookmarks.songId
      WHERE (title LIKE ? OR artist LIKE ? OR genre LIKE ? OR album LIKE ?) 
      AND userId = ?`;
      db.all(com, ['%'+search+'%','%'+search+'%','%'+search+'%','%'+search+'%', user], cb);
    }
    save(cb){
      console.log('Save bookmark');
        const com = `INSERT INTO bookmarks(songId, userId) 
                    VALUES(?, ?);`
        db.run(com, this.songId, this.userId, cb);
    }
    static delete(song, user, cb){
        const com = `DELETE FROM bookmarks WHERE userId = ? AND songId = ?`
        db.run(com, user, song, cb);
    }
}

module.exports.Bookmark = Bookmark;