var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://Dungeon:rod160898@cluster0.pr3ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

exports.get = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.id;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('items').findOne({id:code}, (err, result) => {
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

        result = dbo.collection('items').find({}).toArray((err, result) => {
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
        var ids =  Math.floor(100000 + Math.random() * 900000);
        var newData = {
            _id: ids,
            id: ids,
            name: json.name,
            type: json.type,
            weight: json.weight,
            size: json.size,
            description: json.description,
            hit_dice: json.hit_dice,
            rarity: json.rarity,
            unique: json.unique,
            traits_features: json.traits_features
        }

        dbo.collection("items").insertOne(newData), (err, result) => {
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
        id: ids,
            id: ids,
            name: json.name,
            type: json.type,
            weight: json.weight,
            size: json.size,
            description: json.description,
            hit_dice: json.hit_dice,
            rarity: json.rarity,
            unique: json.unique,
            traits_features: json.traits_features
    }
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        dbo.collection("items").updateOne({id:json.id}, {$set:nuevosDatos}, (err, result) => {
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
        dbo.collection("items").deleteOne({id:code}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    res.end();
}