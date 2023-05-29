const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const cors = require('cors');
// ROUTES
// const authRoute = require('./routes/auth');

app.use(cors());
app.use(BodyParser.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ extended: true }));
// app.use('/auth/', authRoute);

app.listen(3001, () => {
    console.log('Server started on port 3001');
})