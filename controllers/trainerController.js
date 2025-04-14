const Trainer = require('../models/trainer')
const bcrypt = require('bcryptjs')

exports.getSignupPage = (req, res) => {
        res.render('trainerSignup');
}

exports.postSignupPage = async (req, res) => {
    console.log(req.body);  // Log the incoming data to see what's being sent
  
    const { username, email, phone, password, confirmPassword } = req.body;
  
    // Check if user already exists
    const existingTrainer = await Trainer.findOne({ email: email });
    if (existingTrainer) {
      req.flash('error', 'Trainer already exists!');
      return res.redirect('/trainerSignup');
      // return res.send('User already exists.');
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      req.flash('error' , "Passwords do not match")
      return res.redirect('/trainerSignup');
      // return res.send('Passwords do not match.');
    }
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newTrainer = new Trainer({ username, email, phone, password: hashedPassword});
    await newTrainer.save();
    
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/trainerLogin')
    // res.send('User registered successfully');
  };

  exports.getLoginPage = (req, res) => {
    res.render('trainerLogin')
  }
  
  // Post Login Route (POST /login)
exports.postLoginPage = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const trainer = await Trainer.findOne({ email: email });
    if (!trainer) {
      req.flash('error', 'Trainer not found.');
      return res.redirect('/trainerLogin');
        // return res.send('User not found.');
    }

    // Compare the entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/trainerLogn');
        // return res.send('Invalid credentials.');
    }

    req.session.trainer = {
      id: trainer._id,
      username: trainer.username,
      email: trainer.email,
      phone: trainer.phone
  };
  console.log('trainerId in session is :', req.session.trainer)

  req.flash('success', 'Login successful!');
    res.redirect('/home')
    // If credentials are correct, you can create a session or generate a JWT token for the user
    // res.send('Login successful');
};

exports.logoutTrainer = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.send('Failed to log out');
      }

      res.redirect('/trainerLogin');  // Redirect to login page after logout
  });
};