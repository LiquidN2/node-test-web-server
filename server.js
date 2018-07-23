const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', err => {
        if(err) console.log('Unable to append to server.log');
    })
    
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// serving static files
app.use(express.static(__dirname + '/public'));

// helper is a function that runs inside handlebars template
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// helper as function can take arguments as well
hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // response.send('<h1>Hello Express!</h1>');
    
    // sending JSON
    // response.send({
    //     name: 'Hugh',
    //     likes: [
    //         'coffee',
    //         'books'
    //     ]
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to find requested page'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);    
});