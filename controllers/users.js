var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://Dungeon:rod160898@cluster0.pr3ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

exports.get = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.username;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('users').findOne({username:code}, (err, result) => {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);
        })    
    })
}

// LOGIN DE PRUEBA
exports.log = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.username;
        var pwd = req.params.password;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('users').findOne({username:code, password: pwd}, (err, result) => {
            if (err) throw err;

            if (result != null) {
                console.log(result)
                return res.json(result)
                
            } else {
                console.log(result)
                return res.status(500).json(result)
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

exports.add = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");

        var json = JSON.parse(JSON.stringify(req.body));
        var newData = {
            _id: Math.floor(100000 + Math.random() * 900000),
            username: json.username,
            password: json.password,
            email: json.email,
            name: json.name,
            surname: json.surname
        }

        dbo.collection("users").insertOne(newData), (err, result) => {
            if (err)    console.log(err);
            else{
                console.log(result);
                db.close();
            }
        };
    });
    res.end();
}

exports.update = (req, res) => {
    var json = JSON.parse(JSON.stringify(req.body));
    console.log(json)
    var nuevosDatos = {
        username: json.username,
        password: json.password,
        email: json.email,
        name: json.name,
        surname: json.surname
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