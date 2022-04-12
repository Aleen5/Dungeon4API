var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://Dungeon:rod160898@cluster0.pr3ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

exports.get = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.id;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('campaigns').findOne({id:code}, (err, result) => {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);
        })    
    })
}

exports.list = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");

        result = dbo.collection('campaigns').find({}).toArray((err, result) => {
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
        var ids = Math.floor(100000 + Math.random() * 900000);
        var json = JSON.parse(JSON.stringify(req.body));
        var newData = {
            _id: ids,
            id: ids,
            name: json.name,
            dm: json.dm,
            avatar: json.avatar,
            setting: json.setting,
            description: json.description,
            players: json.players,
            characters: json.characters,
            journal: json.journal,
        }

        dbo.collection("campaigns").insertOne(newData), (err, result) => {
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
        id: json.id,
        name: json.name,
        dm: json.dm,
        avatar: json.avatar,
        setting: json.setting,
        description: json.description,
        players: json.players,
        characters: json.characters,
        journal: json.journal,
    }
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        dbo.collection("campaigns").updateOne({id:json.id}, {$set:nuevosDatos}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
        res.end();
    });
}

exports.delete = (req, res) => {
    var code = req.params.id;

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        dbo.collection("campaigns").deleteOne({id:code}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    res.end();
}