# Slutprojekt i Backend del 1 || Moa Berglund

## REST webbtjänst för fiktiv restaurang
### Express applikation med stöd för
* registrering + inloggning av användare med JWT
* lägga till, redigera och ta bort meny som finns via skyddad route
* se bokningar på skyddad route
* se meddelanden på skyddad route
---
* läsa ut lagrad meny till publik sida
* lägga till bokning
* skicka kontakt-formulär
---

## CRUD & JWT
I API:et finns stöd för Create, Read, Update och Delete kopplingar.
Där finns även skyddad rutter som endast koms åt med autentisering men hjälp av JWT.

## Struktur
Webbtjänsten har mongoose schemas för att bestämma struktur av data och kontrollera typ av data, att den är ifylld samt längd. 
Ett exempel på struktur av ett schema:
```
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
```

Respektive CRUD kopplingar ligger sedan i controllers som vidare importeras till routes och slutligen till server.js.

## Publicering
Expressapplikationen är kopplad till en Atlas MongoDB databas och hostas via Render.
Dess url [går att se här](https://b-project.onrender.com/api/)

API:et har även används för att bygga en frontend applikation för en restaurang.
Repot för detta finns att granska här: [Frontend](https://github.com/moaberglund/B-PROJECT-FRONTEND?tab=readme-ov-file)
Och webbpltsen här: [Sartoria Panettieri](https://pizzeriasartoria.netlify.app/)