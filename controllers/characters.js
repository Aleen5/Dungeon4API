var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://Dungeon:rod160898@cluster0.pr3ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

exports.get = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.id;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('characters').findOne({id:code}, (err, result) => {
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

        result = dbo.collection('characters').find({}).toArray((err, result) => {
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
        var ids = Math.floor(100000 + Math.random() * 900000);
        var newData = {
            _id: ids,
            id: ids,
            name: json.name,
            surname: json.surname,
            alias: json.alias,
            status: "alive",
            race: json.race,
            alignment: json.alignment,
            level: json.level,
            exp: json.exp,
            class: json.class,
            archetype: json.archetype,
            stats: json.stats,
            max_hp: json.max_hp,
            current_hp: json.current_hp,
            temporal_hp: json.temporal_hp,
            max_mana: json.max_mana,
            current_mana: json.current_mana,
            adventure_journal,
            attacks_sorceries: json.attacks_sorceries,
            features_traits: json.features_traits,
            death_saves: 3,
            inventory: json.inventory,
            backstory: json.backstory,
            ideals: json.ideals,
            proficiencies: json.proficiencies,
            flaws: json.flaws,
            personality_traits: json.personality_traits,
            bonds: json.bonds,
            age: json.age,
            avatar: json.avatar,
            languages: json.languages,
        }

        dbo.collection("characters").insertOne(newData), (err, result) => {
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
            surname: json.surname,
            alias: json.alias,
            status: json.status,
            race: json.race,
            alignment: json.alignment,
            level: json.level,
            exp: json.exp,
            class: json.class,
            archetype: json.archetype,
            stats: json.stats,
            max_hp: json.hp,
            current_hp: json.current_hp,
            temporal_hp: json.temporal_hp,
            max_mana: json.max_mana,
            current_mana: json.current_mana,
            adventure_journal: json.adventure_journal,
            attacks_sorceries: json.attacks_sorceries,
            features_traits: json.features_traits,
            death_saves: json.death_saves,
            inventory: json.inventory,
            backstory: json.backstory,
            ideals: json.ideals,
            proficiencies: json.proficiencies,
            flaws: json.flaws,
            personality_traits: json.personality_traits,
            bonds: json.bonds,
            age: json.age,
            avatar: json.avatar,
            languages: json.languages,
    }
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");
        dbo.collection("characters").updateOne({id:json.id}, {$set:nuevosDatos}, (err, result) => {
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
        dbo.collection("characters").deleteOne({id:code}, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    res.end();
}