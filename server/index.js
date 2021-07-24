const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
require('./routes/routes')(app);


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // console.log(err);
    res.json({ error: err })
});

app.get('/', (req, res) => {
    res.send(`Server is listening on port 3000`)
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})