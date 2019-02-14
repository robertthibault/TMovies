const http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 8080;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));*/
app.listen(port);

//var apiRoutes = require('./routes.js');
//app.use('/api', apiRoutes)

global.movies = [{
    id: 1,
    title: "Titanic",
    poster: "",
    synopsys: "Southampton, 10 avril 1912. Le paquebot le plus grand et le plus moderne du monde, réputé pour son insubmersibilité, le \"Titanic\", appareille pour son premier voyage. Quatre jours plus tard, il heurte un iceberg. A son bord, un artiste pauvre et une grande bourgeoise tombent amoureux.",
    year: 1997,
    director: {
        name: "James Cameron",
        nationality: "Canadien",
        birthdate: "1954-08-16"
    },
    genre: "Drame, Romance",
    ratings: [4, 3, 4, 4]
},
{
    id: 2,
    title: "Interstellar",
    poster: "",
    synopsys: "Le film raconte les aventures d’un groupe d’explorateurs qui utilisent une faille récemment découverte dans l’espace-temps afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire.",
    year: 2014,
    director: {
        name: "Christopher Nolan",
        nationality: "United Kingdom / United States",
        birthdate: "1970-07-30"
    },
    genre: "Science fiction, Drame",
    ratings: [4, 3, 4, 2, 2]
},
{
    id: 3,
    title: "La ligne Verte",
    poster: "",
    synopsys: "Paul Edgecomb, pensionnaire centenaire d'une maison de retraite, est hanté par ses souvenirs. Gardien-chef du pénitencier de Cold Mountain en 1935, il était chargé de veiller au bon déroulement des exécutions capitales en s’efforçant d'adoucir les derniers moments des condamnés. Parmi eux se trouvait un colosse du nom de John Coffey, accusé du viol et du meurtre de deux fillettes. Intrigué par cet homme candide et timide aux dons magiques, Edgecomb va tisser avec lui des liens très forts.",
    year: 1999,
    director: {
        name: "Frank Darabont",
        nationality: "United States",
        birthdate: "1959-01-28"
    },
    genre: "Fantastique, Policier",
    ratings: [4, 5]
}];

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + hostname + ':' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

app.get('/api/movies/all', function (req, res) {
    res.json(global.movies);
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/dist/index.html'));
});
app.get('/build.js', function (req, res) {
    res.sendFile(path.resolve('src/dist/build.js'));
});

app.post('/api/movies/all', (req, res) => {
    global.movies.push(req.body);
    res.json(global.movies);
});

//open(`http://localhost:${port}`);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});