const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
const server = require('http').Server(app);

const mongoDBModule = require('./app_modules/crud-mongo');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


server.listen(port);

console.log("Serveur lancé sur le port : " + port);

//------------------
// CORS
//------------------
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//------------------
// ROUTES
//------------------

app.get('/', function (req, res) {
    res.send('<h2>Vous etes sur la racine de l\'api rest des videos mbds.</h2>\
    <h3>Utilisez le service:</h3>\
    <ul>\
        <li>/api/connection pour verifier la connexion à la base mongodb</li>\
        <li>/api/video/all pour retourner toutes les videos</li>\
    </ul>')
});

app.get('/api/connection', function (req, res) {
    mongoDBModule.connexionMongo(function (err, db) {
        let reponse;

        if (err) {
            console.log("erreur connexion");
            reponse = {
                msg: "erreur de connexion err=" + err
            }
        } else {
            reponse = {
                msg: "connexion établie"
            }
        }
        res.send(JSON.stringify(reponse));

    });
});


app.get('/api/video/all', (req, res) => {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);
    mongoDBModule.findAllVideos(page, pagesize, function (data) {
        res.send(JSON.stringify(data))
    });
})
app.post('/api/video/save', (req, res) => {
    mongoDBModule.createVideo(req, function (data) {
        res.send(JSON.stringify(data))
    })
})

app.get('/api/video', (req, res) => {
    let id = req.query.id;
    mongoDBModule.findVideo(id, function (data) {
        if (data != -1) {
            res.send(JSON.stringify(data))
        }
        else {
            res.send('Pas de vidéo avec l\'id : ' + id)
        }

    })
})

app.get('/api/video/search', (req, res) => {
    let str = req.query.like;
    mongoDBModule.searchVideo(str, function (data) {
        if (data != -1) {
            res.send(JSON.stringify(data))
        }
        else {
            res.send('Pas de vidéo qui ressemble à : ' + str)
        }

    })
})

app.delete('/api/video', (req, res) => {
    let id = req.query.id;
    mongoDBModule.deleteVideo(id, function (data) {
        res.send(JSON.stringify(data))
    })
})

app.post('/api/user/save', (req, res) => {
    mongoDBModule.createUser(req, function (data) {
        res.send(JSON.stringify(data))
    })
})

// Ajouter le vote
app.put('/api/add-vote', (req, res) => {
    mongoDBModule.addVote(req, function (data) {
        res.send(JSON.stringify(data))
    })
})