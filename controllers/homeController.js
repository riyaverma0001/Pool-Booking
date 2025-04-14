const Pool = require('../models/pool');

exports.homepage = async (req, res) => {
    try {
        
        // Fetch all pools from the database
        const pools = await Pool.find(); // Mongoose query to get all pools from the database

        // Render the homepage and pass the pools data to the view
        res.render('home', { pools, session: req.session });
    } catch (err) {
        console.error('Error fetching pools:', err); // Log any error
        res.status(500).send('Server error'); // Send a 500 status if there’s an error
    }
}