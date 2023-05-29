const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const cors = require('cors');
// ROUTES
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const commentRoute = require('./routes/comment');
const guideRoute = require('./routes/guide');
const noteRoute = require('./routes/note');
const userRoute = require('./routes/user');

app.use(cors());
app.use(BodyParser.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/auth/', authRoute);
app.use('/category/', categoryRoute);
app.use('/comment/', commentRoute);
app.use('/guide/', guideRoute);
app.use('/note/', noteRoute);
app.use('/user/', userRoute);

app.listen(3001, () => {
    console.log('Server started on port 3001');
})