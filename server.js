const express = require('express')
const server = express()
const helmet = require('helmet')
const path = require("path")
const port = 3002


// Helmet pour les en-têtes de sécurité, y compris CSP
server.use(helmet.contentSecurityPolicy({
    directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'https://stackpath.bootstrapcdn.com', "'unsafe-inline'"],
    },
})
);

// Debu  date
    // Middleware pour vérifier les heures ouvrables
function checkBusinessHours(req, res, next) {
    const now = new Date();
    const dayOfWeek = now.getDay();  // 0 = dimanche, 1 = lundi, ..., 6 = samedi
    const hour = now.getHours();     // Heure actuelle (format 24h)

    // Vérifie si c'est un jour de la semaine (lundi à vendredi) et entre 9h et 17h
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue vers la route suivante
    } else {
        res.status(403).send("L'application n'est disponible que pendant les heures ouvrables : du lundi au vendredi, de 9h à 17h.");
    }
}

server.use(checkBusinessHours);

// Fin date

// server.set("views", path.join(__dirname, "views"))
server.use(express.static(path.join(__dirname, 'public')));

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))

})

server.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/services.html"))
})

server.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/contact.html"))
})


server.listen(port, () => {
    console.log(`Prés à écouter au port ${port}`);
    
})