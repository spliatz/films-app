const express = require('express');
const mongoose = require('mongoose');
const CONFIG = require('./config');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/favourites', require('./routes/favourites.routes'));
app.use('/api/watch-later', require('./routes/watchLater.routes'));

(async () => {
    try {
        await mongoose.connect(CONFIG.dbURL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(CONFIG.PORT, () =>
            console.log(`Server is listening. http://localhost:${CONFIG.PORT}`),
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
