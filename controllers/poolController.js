const Pool = require('../models/pool')

exports.getAddPoolPage = (req, res) => {
    res.render('addPool')
}

exports.postAddPool = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, location, price, guests, aboutPool, backyardPrivacy, amenities, aboutHost } = req.body;

        // Validate data
        if (!name || !location || !price || !guests || !aboutPool || !backyardPrivacy || !amenities || !aboutHost) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new pool document
        const newPool = new Pool({
            name,
            location,
            price,
            guests,
            aboutPool,
            backyardPrivacy,
            amenities,
            aboutHost
        });

        // Save to the database
        await newPool.save();

        // Send success response
        res.status(201).json({ message: 'Pool added successfully', pool: newPool });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// exports.getFullDetails = (req, res) => {
//     res.render('details')
// }

exports.getFullDetails = async (req, res) => {
    try {
        const poolId = req.params.id; // Get the poolId from the URL params
        const pool = await Pool.findById(poolId); // Query the database for the pool by ID
        
        if (!pool) {
            return res.status(404).json({ message: 'Pool not found' }); // Handle case where pool is not found
        }

        // Render the details page and pass the pool data to it
        res.render('details', { pool });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};