const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: "Maintenance Shutdown",
//         welcomeMessage: "The website is currently under cosntruction. We will be back in a jiffy"
//     });
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to the file.');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to this page. This is just the beginning"
    });
});

app.get('/about', (req, res) => {
    // res.send("<h1>About Page</h2>");
    res.render('about.hbs', {
        pageTitle: "About this Page",
        welcomeMessage: "Random About message"
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects",
        welcomeMessage: "Portfolio Page can be viewed here"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to access the page"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});