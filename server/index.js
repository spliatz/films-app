import express from 'express';
import mongoose from 'mongoose';
import * as CONFIG from './config.js';
import bodyParser from 'body-parser';

const app = express();

import AuthRouter from './routes/auth.routes.js';
import WatchLaterRouter from './routes/watchLater.routes.js';
import FavouritesRouter from './routes/favourites.routes.js';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/favourites', FavouritesRouter);
app.use('/api/watch-later', WatchLaterRouter);

(async () => {
    try {
        await mongoose.connect(CONFIG.dbURL);
        app.listen(CONFIG.PORT, () =>
            console.log(`Server is listening. http://localhost:${CONFIG.PORT}`),
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
