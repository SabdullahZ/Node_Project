const express = require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/', async(req, res)=> {
    try{
        const data = req.body;
        const newPerson = new person(data); 

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }    

})

router.get('/', async (req, res) => {
    try {
        const people = await person.find(); // Fetch all documents from the 'person' collection
        res.status(200).json(people); // Send the fetched data as JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // extract work type from parameter
        if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
            const response = await person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let personID = req.params.id;

        // Trim the ID to the correct length
        personID = personID.substring(0, 24);

        const updatedPerson = req.body;

        const response = await person.findByIdAndUpdate(personID, updatedPerson, {
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

});

router.delete('/:id', async (req, res) => {
    try{
        const personID = req.params.id;
        const response = await person.findByIdAndDelete(personID);
        if(!response){
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Data deleted');
            res.status(200).json({message: 'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   

})




module.exports = router;