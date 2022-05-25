require('dotenv').config()
var MongoClient = require('mongodb').MongoClient
const url = process.env.MONGO_URL

class StatsModel {
    constructor(Acrobatics, AnimalHandling, ArmorClass, Athletics, Charisma, Constitution, Deception, Dexterity, History, Initiative, Insight,
        Intelligence, Intimidation, Medicine, Nature, Perception, Performance, Persuasion, Religion, Stealth, Strength, Survival, Wisdom) {
        
        this.AnimalHandling = 0;
        this.Acrobatics = 0;
        this.ArmorClass = 0;
        this.Athletics = 0;
        this.Charisma = 0;
        this.Constitution = 0,
        this.Deception = 0;
        this.Dexterity = 0;
        this.History = 0;
        this.Initiative = 0;
        this.Insight = 0;
        this.Intelligence = 0;
        this.Intimidation = 0;
        this.Medicine = 0;
        this.Nature = 0;
        this.Perception = 0;
        this.Performance = 0;
        this.Persuasion = 0;
        this.Religion = 0;
        this.Stealth = 0;
        this.Strength = 0;
        this.Survival = 0;
        this.Wisdom = 0;
    }
}


const names = ["Geralt", "Dominique", "Allen", "Vailor", "Talahasee", "Kakarot", "Morgan", "Raynor", "Erevan", "Puñetazo", "Kleetus",
    "Nariko", "Raul", "Eren", "Eris", "Lenalee", "Varian", "Arthur", "Kongming", "Gerardo", "Baldr", "Vanir", "Altair", "Yennefer",
    "Brolo", "Gonpachiro", "Uzui", "Diluc", "Meliodas", "Bannard", "Richard", "Luis Miguel", "Anakin", "Miguel", "Tyki", "Road",
    "Keren", "Cal", "Jon", "Eddard", "Ulfric", "Ulrich", "Micah", "Kenny", "Hawk", "Aragorn", "Sauron", "Armin", "Patches", "Ronald",
    "Niko", "Michael", "Y'Zhargo", "Mercer", "Mathias", "Gwyndovan", "Shirou", "Dai", "Ymir", "Lei", "Bronn", "Darion", "Alexxandros",
    "Arthas", "Kaylor", "Ray", "Radamand", "Gideon", "Lavi", "Reginald", "Harold", "Riku", "Axel", "Namine", "Alphonse", "Edward",
    "Nito", "Lekik", "Poilord", "Kirime", "Ivan", "Vayolo", "Jose", "Elent", "Eldarez", "Dabyss", "James", "Alexander", "Pedro",
    "Alvaro", "Abel", "Cain", "Hilario", "Lionel", "Floki", "William", "Berutoruto", "Armel", "Daybit", "Peperoncino", "Karyl",
    "Ritsuka", "Tiber", "Sheogorath", "Gruul", "Martin", "Beleriand", "Ranni", "Charles", "John", "Guts", "Bardock", "Nero", "Lev",
    "Jahy", "Satoru", "Judeau", "Griffith", "Godot", "Andre", "Aldia", "Waver", "Roman", "Ainz", "Emilio", "Yoh", "Erwin", "Galen",
    "Takt", "Sorey", "Mikleo", "Vanitas", "Noe", "Yuri", "Conan", "Alucard", "Trevor", "Yujiro", "Austin", "Seymour", "Jonathan",
    "Joseph", "Marco", "Arya", "Gabi", "Caska", "Luviagelita", "Diane", "Merlin", "Shawn", "Astel", "Cirilla", "Eredin", "Blai",
    "Eskel", "Lambert", "Vesemir", "Maven", "Matthew", "Tyrion", "Lucas", "Paco", "Geoffrey", "Lancel", "Margaret", "Anastasia",
    "Soap", "Velstadt", "Jackie", "Sito", "Lawrence", "Bjorn", "Ragnar", "George", "Louis", "Leonard", "Barbatos", "Flauros", "Hinako",
    "Poe", "Edgar", "Allan", "Roderick", "Cathy", "Gael", "Jano", "Anri", "Horace", "Astolfo", "Salome", "Kei", "Draken", "Diallos",
    "Anthony", "Peter", "Benedictus", "Sara", "Djessy", "Albert", "Erice", "Elise", "Arno", "Dorian", "Jasdero", "Alma", "Lisa",
    "Reed", "Alyss", "Veronica", "Adrian", "Adrienne", "Violet", "Alleria", "Silas", "Jeanne", "Jane", "Malik", "Rodrigo", "Mikhail",
    "Julius", "Nathanos", "Nathan", "Elliot", "Elyas", "Jesus", "Javier", "Rahm", "Muhammad", "Jambo", "Omar", "Florence", "Sigurd",
    "Siegfried", "Noelle", "Mona", "Musashi", "Lalatina", "Tristan", "Lancelot", "Galahad", "Dwayne", "Custennin", "Artorigus", "Len",
    "Lewis", "Abbigail", "Gaheris", "Paul", "Gawain", "Chloe", "Fionn", "Kintoki", "Carmilla", "Marie", "Gray", "Vector", "Elizabeth",
    "Gilles", "Attila", "Jason", "Robin", "Isaac", "Martha", "Leonidas", "Christopher", "Henry", "Charlotte", "Darius", "Eric", "Mike",
    "Thomas", "Sieg", "Bartholomew", "Geronimo", "Medea", "Kojirou", "Bryan", "Boris", "Eufrasio", "Evaristo", "Facundo", "Federico",
    "Manuel", "Daniel", "Helena", "Samuel", "Pablo", "Leena", "Aisha", "Brent", "Neil", "Doug", "Ronan", "Allister", "Ryan", "Adolf",
    "Sirius", "Harry", "Ben", "Gwen", "Bruce", "Rhonin", "Gaspard", "Rico", "Vlad", "Yor", "Loid", "Anya", "Winston", "Triss", "Henselt",
    "Desmond", "Nikolai", "Keira", "Hjalmar", "Crach", "Daenerys", "Jaime", "Yeray", "Selio", "Aleister", "Gustavo", "Brienne", "Shay",
    "Patrick", "Thorfinn", "Thorkell", "Leeroy", "Kazuya", "Jin", "Lars", "Steve", "Kerrigan", "Salazar", "Saw", "Brutus", "Reiner",
    "Billy", "Node", "Brandon", "Illyanna"];


const surnames = ["of Rivia", "de Sade", "Walker", "Sithis", "Benitez", "Rodriguez", "Valdepeñas", "le Fay", "Boldvir", "Hellscream",
    "Bravo", "Jaeger", "Boreas", "Lee", "Wrynn", "Rivaldo", "Tsu", "Ribadeneira", "Graftsson", "Velez", "Ibn La-Ahad", "of Vengerberg",
    "Rathios", "Kamaboko", "Tengen", "Leclerc", "Alonso", "Casillas", "Pedrosa", "Bell", "Ackerman", "Stormcloak", "Snow", "Otero",
    "Kestis", "Stark", "Shaw", "Elessar", "Reagan", "Navas", "Greenleaf", "Ofnir", "Perez", "Fernandez", "Frost", "Plisetsky", "Asahina",
    "Serra", "Rodriguez", "of Astora", "Marston", "Claudius", "Lainur", "Gojou", "Archaman", "Ooal Gown", "Costa", "Asakura", "Mikk",
    "Kamelot", "Marek", "Skywalker", "Joestar", "Josephsson", "Edelfelt", "Menethil", "Septim", "Breacc Glas", "Riannon", "Uzumaki",
    "Arryn", "Targaryen", "Dayne", "Lannister", "Rajoy", "Espinosa de los Monteros", "Zapatero", "Sadis", "Cortes", "Hernandez", "Recio",
    "Baratheon", "Fujiwara", "Shinomiya", "Romanov", "Price", "Anaya", "Pozo", "Navarro", "Scamander", "MacTavish", "Ramirez", "Lestray",
    "Norris", "Bellido", "Kenobi", "Koon", "Shiki", "Sainero", "Garcia", "Czaplicki", "Alexandersson", "Ragnarsson", "Figo", "Chulainn", 
    "Nadal", "Uchiha", "Dameron", "Vipi", "Baggings", "Bolson", "McDonnell", "Tano", "Namikaze", "Hoslow", "Miyazaki", "Jackson", "Mista",
    "Dorellay", "Tempestira", "Proudmoore", "Valiente", "Motos", "Cumberbatch", "de la Serre", "Richards", "Turtlefar", "Jardoy", "Macay",
    "Ren", "Greaves", "Borgia", "Cuevas", "Mangas", "Ferrol", "le Gris", "Cucumberbatch", "Clamañublo", "Drake", "of the Blackwater",
    "Alderson", "di Ravello", "Vivaldi", "Paratus", "Kota", "Fujimaru", "Portgas", "Keller", "Nightingale", "Senato", "Aldini", "Asahi",
    "Khan", "Bonaparte", "de la Mancha", "von Einzbern", "Matou", "mac Cumhail", "Frankenstein", "Salieri", "Kamangir", "Bunyan", "de Rais",
    "Tell", "Hood", "Clarke", "of the Sunless Realms", "Wright", "von Hohenheim", "Fuuma", "Jekyll", "Cavill", "Sanson", "Corday", "Edison",
    "Tesla", "Babbage", "Wazowski", "Sunforged", "of Dibella", "Roberts", "Sasaki", "Johnson", "Putin", "Da Vinci", "Henares", "Long", "Lloyd",
    "Shallduin", "Kamimura", "Marcaida", "Crowley", "Bond", "Craig", "Mengele", "Black", "Potter", "Tennison", "Parker", "Wayne", "Warren",
    "Penaumbra", "Solarian", "Atracasol", "Forger", "Churchill", "McCree", "Merigold", "Hemmelfart", "Nerevar", "Barenziah", "Battleborn",
    "Graymane", "Miles", "Orelov", "Metz", "an Craite", "Organna", "Seaworth", "Braun", "Zakhaev", "Shepherd", "White", "Leto", "Sandman",
    "Dempsey", "Belinski", "Masaki", "Tohsaka", "la Valette", "Cumgrail", "Reed", "El Melloi", "Cormac", "Soji", "Jenkins", "Mishima", "Kazama",
    "Hortensia", "Van der Linde", "Elric", "Winters", "Babes", "var Emreis", "de Borbón", "Ronamir", "de la Fuente", "Blackstone", "Díaz",
    "Steelwood", "Van Dam", "Phoenix", "Menéndez", "Mason", "Sanders", "Kennedy", "Trump", "Redfield", "Valentine", "Kenneth", "Gerrera",
    "Hammond", "Frey", "Ford", "Holmes", "Garrido", "von Karma", "Sepiro"];

const aliases = ["Puñetazo", "The Rock", "The Butcher", "Nameless", "Evil Wind", "The Lion", "The Wolf", "The Saint", "Smash", "Big Hoss",
    "Hackerman", "Domino", "Goblin Slayer", "The One in Gray", "The One in Black", "The Ruined King", "Strong-Arm", "Bigfoot", "Death",
    "Fireball Man", "Goat F***er", "Furryman", "Orc's Bane", "The Assassin", "Golden", "Black Bolt", "Spidey", "Captain", "God of War", 
    "The Unborn", "Rocket Man", "Short", "El Bicho", "Gaylord", "The Machine", "Grand Guildmaster", "Archer of Inferno", "Wiener", "The Dracula",
    "Twilight", "The Half-Breed", "The Lesser", "The Greater", "The Big", "The Short", "Doomfist", "Reaper", "The Stray", "The Gray",
    "The White", "The Black", "Faceless", "Midget", "Fat-man", "Silentman", "Agent 006", "La Pulga", "The Kid"];

const races = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Tiefling", "Orc of Exandria", "Leonin", "Satyr", 
    "Fairy", "Harengon", "Owlin","Aarakocra", "Genasi", "Goliath", "Aasimar", "Bugbear", "Firbolg", "Goblin", "Hobgoblin", "Kenku", "Kobold", 
    "Lizardfolk", "Orc", "Tabaxi", "Triton", "Yuan-ti Pureblood","Feral Tiefling", "Tortle", "Changeling", "Kalashtar", "Orc of Eberron", "Shifter",
    "Warforged", "Gith", "Centaur", "Loxodon", "Minotaur", "Simic Hybrid", "Vedalken", "Verdan", "Locathah", "Grung"];

const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Warlock", "Wizard", "Artificer", "Blood Hunter"];

const alignments = ["Lawful-Good", "Lawful-Neutral", "Lawful-Evil", "Neutral-Good", "True-Neutral", "Neutral-Evil", "Chaotic-Good", "Chaotic-Neutral", 
    "Chaotic-Evil"];

const generalWeapons = ["Dagger: 1d6 + 3 Slicing or Piercing damage", "Short sword: 1d8 Slicing or Piercing damage", "Crossbow: 1d8 + 4 Piercing damage", 
    "Shortbow: 1d8 Piercing damage", "Bomb: 2d12 + 4 Splash damage. Radius: 15ft. If Artificer: 3d12 Splash damage instead."];

const generalItems = ["Lesser health potion: Recover 1d8 + Medicine modifier", "Mid health potion: Recover 1d12 + Medicine modifier",
    "Greater health potion: Recover 2d12 + Medicine modifier", "Lesser mana potion: Recover 1d8 + 4", "Mid mana potion: Recover 1d12 + 4",
    "Greater mana potion: Recover 2d12 + 4", "Wolf pelt", "Boar skin", "Rat skin", "Strange stones", "Rare Candy: Level up instantly. Only one use",
    "Bush disguise", "Horse meat", "Dice: [6]", "Tinderbox", "Fishing Rod"];
    
const legendaryItems = ["Deck of Many Things", 
    "Excalibur: The legendary sword in the rock. Destroys opponents with unprecedented power. Damage: 2d12 Slicing or Piercing. Special: By shouting the name of the sword and swinging it onwards, deal 2d20 Light damage in a cone in front of the user. Range: 200ft long, 50ft wide. Cooldown: 6T",
    "Failnaught",
    "Sword of Rupture: The omnipotent Sword of Creation. Damage: 1d12 Piercing. Special: By shouting 'Enuma Elish' and thrusting this lance-like sword onwards, unleash a beam of destruction in front of the user. Affected creatures must endure a Death Saving throw of 30 difficulty. If they fail, they are erased from existance no matter how many trys they have left. Range: 1000ft long, 60ft wide. Cooldown: Only once per lifetime",
    "Qin Sais: Dual blades of destruction. Damage: 2d10 + 10 Slicing or Piercing. Special: If using them, add +20 to your hit die."];

const mageItems = ["Fire Wand: 1d6+4 Fire damage", "Magic Wand: 1d6+3 Magic damage", "Crystal Cone: A completely worthless crystal cone",
    "Enchanted Spellbook: Recover 40 MP. Only once per day", "Magic Staff: 1d8 + 3 Magic damage", "Fire Staff: 1d8 + 4 Fire damage"];

function getRandomStats() {
    function randomNumberStat() {
        return Math.floor(Math.random() * 30)
    }
    stats = new StatsModel()
    stats.AnimalHandling = randomNumberStat()
    stats.Acrobatics = randomNumberStat()
    stats.Athletics = randomNumberStat()
    stats.ArmorClass = randomNumberStat()
    stats.Charisma = randomNumberStat()
    stats.Constitution = randomNumberStat()
    stats.Deception = randomNumberStat()
    stats.Dexterity = randomNumberStat()
    stats.History = randomNumberStat()
    stats.Initiative = randomNumberStat()
    stats.Insight = randomNumberStat()
    stats.Intelligence = randomNumberStat()
    stats.Intimidation = randomNumberStat()
    stats.Medicine = randomNumberStat()
    stats.Nature = randomNumberStat()
    stats.Perception = randomNumberStat()
    stats.Performance = randomNumberStat()
    stats.Persuasion = randomNumberStat()
    stats.Religion = randomNumberStat()
    stats.Stealth = randomNumberStat()
    stats.Strength = randomNumberStat()
    stats.Survival = randomNumberStat()
    stats.Wisdom = randomNumberStat()
    
    return stats;
}

exports.get = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.id;
        if (err) throw err;
        var dbo = db.db('Dungeon4Dummies');

        dbo.collection('characters').findOne({id:code}, (err, result) => {
            if (err) throw err;
            db.close();
            return res.json(result);
        })    
    })
}

exports.randomCharacter = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        const code = req.params.owner;

        if (err) throw err;
        const dbo = db.db('Dungeon4Dummies');
        const ids = "c" + Math.floor(100000 + Math.random() * 900000);
        let hasAlias = Math.round(Math.random()) == 1;
        let list = [""];

        if (Math.round(Math.random()) == 0)
            console.log("It will not have an Alias.")
        else {
            console.log("It will have an Alias.")
            hasAlias = true
        }
        let cName = names[Math.floor(Math.random() * names.length)]
        let cSurname = surnames[Math.floor(Math.random() * surnames.length)]
        let characterClass = classes[Math.floor(Math.random() * classes.length)]
        let hp = Math.floor(Math.random() * 80);
        let mana = Math.floor(Math.random() * 80)

        // Inventory buildup

        let inventoryList = [""]
        let hasLegendaryItem = (Math.round(Math.random() * 100)) <= 3
        if (hasLegendaryItem) console.log(`${cName} ${cSurname} has a LEGENDARY item!!!`)

        switch(characterClass) {
            case "Wizard": inventoryList.push(mageItems[(Math.floor(Math.random() * mageItems.length))])
            break;
        }


        inventoryList.push(generalWeapons[Math.floor(Math.random() * generalWeapons.length)])
        hasLegendaryItem ? inventoryList.push(legendaryItems[Math.floor(Math.random() * legendaryItems.length)]) : inventoryList.push(generalItems[Math.floor(Math.random() * generalItems.length)])
        inventoryList.push(generalItems[Math.floor(Math.random() * generalItems.length)])
        

        inventoryList.splice(0, 1);

        const newData = {
            _id: ids,
            id: ids,
            name: cName,
            surname: cSurname,
            alias: hasAlias ? aliases[Math.floor(Math.random() * aliases.length)] : cName,
            status: "Alive",
            race: races[Math.floor(Math.random() * races.length)],
            campaigns: "",
            alignment: alignments[Math.floor(Math.random() * alignments.length)],
            level: Math.floor(Math.random() * 20) + 1,
            exp: Math.floor(Math.random() * 6000),
            character_class: characterClass,
            archetype: "",
            stats: getRandomStats(),
            max_hp: hp,
            current_hp: hp,
            temporal_hp: 0,
            max_mana: mana,
            current_mana: mana,
            adventure_journal: list,
            attacks_sorceries: list,
            features_traits: list,
            death_saves: 3,
            inventory: inventoryList,
            backstory: "",
            ideals: "",
            proficiencies: "",
            flaws: "",
            personality_traits: "",
            bonds: "",
            age: Math.floor((Math.random()) * 80) + 15,
            avatar: "",
            languages: "Common",
            owner: code
        }

        dbo.collection("characters").insertOne(newData), (err, result) => {
            if (err)    console.log(err);
            else{
                db.close();
            }
        };
    });
    res.end();
}

exports.list = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");

        result = dbo.collection('characters').find({}).toArray((err, result) => {
            if (err) throw err;
            db.close();
            return res.json(result)
        }) 
    })
}

exports.clist = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var code = req.params.owner;
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");

        result = dbo.collection('characters').find({owner:code}).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
            return res.json(result);
        })
    })
}

exports.add = (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("Dungeon4Dummies");

        var json = JSON.parse(JSON.stringify(req.body));
        var ids = "c" + Math.floor(100000 + Math.random() * 900000);
        var newData = {
            _id: ids,
            id: ids,
            name: json.name,
            surname: json.surname,
            alias: json.alias,
            status: json.status,
            race: json.race,
            campaigns: json.campaigns,
            alignment: json.alignment,
            level: json.level,
            exp: json.exp,
            character_class: json.character_class,
            archetype: json.archetype,
            stats: json.stats,
            max_hp: json.max_hp,
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
            owner: json.owner
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

    let status;
    if (json.current_hp < 1 && json.death_saves < 1)
        status = "Dead"
    else if (json.current_hp < 1 && json.death_saves >= 1)
        status = "Unconscious"

    var nuevosDatos = {
            id: json.id,
            name: json.name,
            surname: json.surname,
            alias: json.alias,
            status: json.status,
            race: json.race,
            campaigns: json.campaigns,
            alignment: json.alignment,
            level: json.level,
            exp: json.exp,
            character_class: json.character_class,
            archetype: json.archetype,
            stats: json.stats,
            max_hp: json.max_hp,
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
            owner: json.owner
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