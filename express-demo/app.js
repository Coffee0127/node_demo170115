var express = require('express');
var app = express();

// static files
app.use(express.static(__dirname + '/public'));

// set Render engine
app.set('view engine', 'pug');
// by default, scanning "view" folder
app.set('views', __dirname + '/views');

// home route
app.get('/', (req, res) => {
    // 不需要加註附檔名
    res.render('index');
});

// parameters needed
app.get('/user/:name', (req, res) => {
    var name = req.params.name;
    // could find user via database
    var movie = {
        title: 'Titanic',
        year: 1997,
        director: 'James Cameron'
    };
    res.render('user', { user: name, movie: movie });
});

// parameters not needed with '?'
app.get('/movies/:title?', (req, res) => {
    var title = req.params.title;
    res.send(`the title is ${title}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});