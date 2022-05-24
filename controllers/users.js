require('dotenv').config()
const bcrypt = require('bcrypt')
var MongoClient = require('mongodb').MongoClient
const url = process.env.MONGO_URL


exports.get = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.username;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('users').findOne({username:code}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
            if (result != null) {
                res.status(200).json(result)
            } else 
                res.status(500).send()
        })
    })
}

// LOGIN DE PRUEBA
exports.login = async (req, res) => {
    MongoClient.connect(url, async (err, db) => {
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('users').findOne({username: req.body.username}, async (err, result) => {
            if (err) throw err;

            if (result != null) {

                try {
                    if(await bcrypt.compare(req.body.password, result.password)) {
                        console.log(result)
                        res.status(201).json(result)
                    } else {
                        console.log("FAIL")
                        res.status(500).send()
                    }
                } catch {
                    console.log("FAIL")
                    res.status(500).send()
                }
            }
        })    
    })
}

exports.list = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");

        result = dbo.collection('users').find({}).toArray((err, result) => {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result)
        }) 
    })
}

exports.add = async (req, res) => {
    MongoClient.connect(url, async (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = {
                _id: req.body.username,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                characters: req.body.characters
            }

            dbo.collection("users").insertOne(user), (err, result) => {
                if (err) {
                    res.status(500).send()
                    console.log(err);
                }
            }
            res.status(200).json(result)

        } catch {
            res.status(500).send()
        }

            
    })
}

exports.update = (req, res) => {
    var json = JSON.parse(JSON.stringify(req.body));
    console.log(json)
    var nuevosDatos = {
        username: json.username,
        password: json.password,
        email: json.email,
        name: json.name,
        surname: json.surname,
        characters: json.characters
    }
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        dbo.collection("users").updateOne({username:json.username}, {$set:nuevosDatos}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
        res.end();
    });
}

exports.delete = (req, res) => {
    var code = req.params.username;

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        dbo.collection("users").deleteOne({username:code}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    res.end();
}