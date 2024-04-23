const express = require('express');
const router = express.Router(); 
const menu = require('./../models/menu');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menu(data);

        const response = await newMenu.save();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const menus = await menu.find();
        console.log('Data Fetched');
        res.status(200).json(menus);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:flavour', async (req, res) => {
    try {
        const flavour = req.params.flavour; 
        if (flavour === 'sweet' || flavour === 'sour' || flavour === 'spicy') {
            const response = await menu.find({ taste: flavour }); // Use menu.find() to fetch data from the 'menu' model
            console.log('Data Fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid flavour' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*router.put('/:id', async (req, res) => {
    try {
        let menuID = req.params.id;

        // Trim the ID to the correct length
        menuID = menuID.substring(0, 24);

        const updatedMenu = req.body;

        const response = await menu.findByIdAndUpdate(menuID, updatedMenu, {
            new: true,  // After updation
            runValidator: true, // Before updation, validating the ID
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});*/

router.put('/:id', async (req, res) => {
    try {
        let menuID = req.params.id;

        // Check if the ID is in the correct format
        if (!isValidObjectId(menuID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const updatedMenu = req.body;

        const response = await menu.findByIdAndUpdate(menuID, updatedMenu, {
            new: true,  // After updation
            runValidator: true, // Before updation, validating the ID
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to validate ObjectId format
function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}


/*router.delete('/:id', async (req, res) => {
    try{
        const menuID = req.params.id;
        const response = await menu.findByIdAndDelete(menuID);
        if(!response){
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Data deleted');
            res.status(200).json({message: 'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})*/

router.delete('/:id', async (req, res) => {
    try {
        const menuID = req.params.id;

        // Check if the ID is in the correct format
        if (!isValidObjectId(menuID)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const response = await menu.findByIdAndDelete(menuID);
        
        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (err) {
        console.log(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
