const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')

exports.getSignupPage = (req, res) => {
        res.render('adminSignup');
}

exports.postSignupPage = async (req, res) => {
    console.log(req.body);  // Log the incoming data to see what's being sent
  
    const { username, email, phone, password, confirmPassword } = req.body;
  
    // Check if user already exists
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      req.flash('error', 'admin already exists!');
      return res.redirect('/adminSignup');
      // return res.send('User already exists.');
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      req.flash('error' , "Passwords do not match")
      return res.redirect('/adminSignup');
      // return res.send('Passwords do not match.');
    }
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newAdmin = new Admin({ username, email, phone, password: hashedPassword});
    await newAdmin.save();
    
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/adminLogin')
    // res.send('User registered successfully');
  };

  exports.getLoginPage = (req, res) => {
    res.render('adminLogin')
  }
  
  // Post Login Route (POST /login)
exports.postLoginPage = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      req.flash('error', 'User not found.');
      return res.redirect('/adminLogin');
        // return res.send('User not found.');
    }

    // Compare the entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/adminLogin');
        // return res.send('Invalid credentials.');
    }

    req.session.admin = {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      phone: admin.phone
  };
  
  console.log('adminId in session is :', req.session.admin)

  req.flash('success', 'Login successful!');
    res.redirect('/home')
    // If credentials are correct, you can create a session or generate a JWT token for the user
    // res.send('Login successful');
};

exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.send('Failed to log out');
      }

      res.redirect('/adminLogin');  // Redirect to login page after logout
  });
};