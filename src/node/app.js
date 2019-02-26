const http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 8080;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port);

global.movies = [{
    id: 0,
    title: "Titanic",
    poster: "http://fr.web.img3.acsta.net/r_1280_720/medias/nmedia/18/36/27/14/20051394.jpg",
    synopsys: "Southampton, 10 avril 1912. Le paquebot le plus grand et le plus moderne du monde, réputé pour son insubmersibilité, le \"Titanic\", appareille pour son premier voyage. Quatre jours plus tard, il heurte un iceberg. A son bord, un artiste pauvre et une grande bourgeoise tombent amoureux.",
    year: 1997,
    director: {
        name: "James Cameron",
        nationality: "Canadien",
        birthday: "1954-08-16"
    },
    genre: "Drame, Romance",
    ratings: [4, 3, 4, 4]
},
{
    id: 1,
    title: "Interstellar",
    poster: "http://fr.web.img6.acsta.net/r_1920_1080/pictures/14/09/24/12/08/158828.jpg",
    synopsys: "Le film raconte les aventures d’un groupe d’explorateurs qui utilisent une faille récemment découverte dans l’espace-temps afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire.",
    year: 2014,
    director: {
        name: "Christopher Nolan",
        nationality: "United Kingdom / United States",
        birthday: "1970-07-30"
    },
    genre: "Science fiction, Drame",
    ratings: [4, 3, 4, 2, 2]
},
{
    id: 2,
    title: "La ligne Verte",
    poster: "http://fr.web.img4.acsta.net/r_1920_1080/medias/nmedia/18/66/15/78/19254683.jpg",
    synopsys: "Paul Edgecomb, pensionnaire centenaire d'une maison de retraite, est hanté par ses souvenirs. Gardien-chef du pénitencier de Cold Mountain en 1935, il était chargé de veiller au bon déroulement des exécutions capitales en s’efforçant d'adoucir les derniers moments des condamnés. Parmi eux se trouvait un colosse du nom de John Coffey, accusé du viol et du meurtre de deux fillettes. Intrigué par cet homme candide et timide aux dons magiques, Edgecomb va tisser avec lui des liens très forts.",
    year: 1999,
    director: {
        name: "Frank Darabont",
        nationality: "United States",
        birthday: "1959-01-28"
    },
    genre: "Fantastique, Policier",
    ratings: [4, 5]
}];

global.users = [
    {
        id: 0,
        email: "test@test.test",
        password: "test",
        firstname: "test",
        lastname: "test",
        votes: {},
    },
    {
        id: 1,
        email: "robert.thibault33@gmail.com",
        password: "test",
        firstname: "Thibault",
        lastname: "ROBERT",
        votes: {},
    },

];

global.user = [];

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + hostname + ':' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

//Permet d'initialiser les film de global.movies dans l'api
app.get('/api/movies/all', function (req, res) {
    res.json(global.movies);
});
//Permet de rediriger vers l'index.html quand on a juste un /
app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/dist/index.html'));
});
//Permet de voir le build.js
app.get('/build.js', function (req, res) {
    res.sendFile(path.resolve('src/dist/build.js'));
});
//Permet d'ajouter un film dans l'objet global.movies et repush dans l'api
app.post('/api/movies/all', (req, res) => {
    global.movies.push(req.body);
    res.json(global.movies);
});
//Permet d'ajouter un note dans le tableau ratings d'un film
app.post('/api/movies/:id', (req, res) => {
    console.log("je suis passer dans l'ajout d'une note");
    console.log(req.body);
    console.log(req.params.id);
    global.movies.forEach(element => {
        if(element.id == req.params.id){
            element.ratings.push(parseInt(req.body.grade));
        }    
    });
    res.json(global.movies);
});
//Permet de supprimer un film dans l'objet global.movies et repush dans l'api
app.delete('/api/movies/:id', (req, res) => {
    console.log("je suis passer dans le delete");
    global.movies = global.movies.filter(movie => movie.id != req.params.id);
    res.json(global.movies);
});
//Permet de modifier les données d'un film
app.put('/api/movies/:id', (req, res) => {
    global.movies.push(req.body);
    res.json(global.movies);
});

///     USERS     ///

//Permet de mettre les différents utilisateurs dans une api
app.get('/api/users/all', function (req, res) {
    res.json(global.users);
});

///     USER     ///
//Permet d'initialiser l'utilisateur connecté dans l'api
app.get('/api/user', function (req, res) {
    res.json(global.user);
});
//Permet d'ajouter l'utilisateur connecté dans l'objet user puis le mettre dans l'api
app.post('/api/user', (req, res) => {
    global.user.push(req.body);
    res.json(global.user);
});
//permet de supprimer l'utilisateur connecté de l'objet user
app.delete('/api/user', (req, res) => {
    global.user = global.user.filter(user => user.id != 0 || user.id != 1);
    res.json(global.user);
});

//permet de connaitre l'ip du serveur
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});