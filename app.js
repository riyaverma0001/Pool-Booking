const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB
mongoose.connect('', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Failed to connect to MongoDB:', err));

// ✅ Session Middleware (Stored in MongoDB)
app.use(session({
    secret: 'yourSecretKey',  // Change this to a strong secret
    resave: false,            // Don't resave unchanged sessions
    saveUninitialized: false, // Don't create empty sessions
    store: MongoStore.create({ 
        mongoUrl: '<add_mongo_uri>',
        collectionName: 'sessions'
    }),
    cookie: {
        secure: false,        // Change to `true` if using HTTPS
        httpOnly: true,       // Prevent client-side JS access
        maxAge: 1000 * 60 * 60 // 1-hour session expiry
    }
}));

// ✅ Flash Messages Middleware (After Session)
app.use(flash());

// ✅ Global Flash Variables
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success');
    res.locals.error_message = req.flash('error');
    next();
});

// ✅ Middleware for Parsing Requests
app.use(express.json());  // Parse JSON data
app.use(express.urlencoded({ extended: true }));  // Parse form data

// ✅ Set View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Import Routes
const homeRoutes = require('./routers/homeRoutes');
const userRoutes = require('./routers/userRoutes');
const poolRoutes = require('./routers/poolRoutes');
const adminRoutes = require('./routers/adminRoutes');
const trainerRoutes = require('./routers/trainerRoutes');

// ✅ Use Routes
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', poolRoutes);
app.use('/', adminRoutes);
app.use('/', trainerRoutes);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at:
    👉 http://localhost:${PORT}/login
    👉 http://localhost:${PORT}/adminLogin
    👉 http://localhost:${PORT}/trainerLogin`);
});
