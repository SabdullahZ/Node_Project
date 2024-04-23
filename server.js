/*const index = require('./hello.js');
var os = require('os');
var fs = require('fs');
var user = os.userInfo();
console.log(user);
fs.appendFile('greet.txt', 'hello ' + user.username + '!\n', () => {
    console.log("file created...");
});
var areaResult = index.area(5, 4); // invoking the area function
var abcValue = index.abc; // accessing the abc variable
console.log(areaResult); // Outputting the result of the area function
console.log(abcValue); // Outputting the value of abc variable*/
/*const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //bodyParser converts anytype of incoming data in an object an return to us, json formate will convert in object and stores in req.body. we will use it just
const person = require('./models/person');

app.get('/', function (req, res) {
  res.send('Welcome to our page: ')
})

app.post('/person', async(req, res)=> {
    try{
        const data = req.body;  //body parser has converted data in it
        const newPerson = new person(data)

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

   /newPerson.name = data.name;
    newPerson.age = data.age;
    newPerson.contact = data.contact;
    newPerson.work = data.work;
    newPerson.email = data.email;    this all can be done by passsing data variable in person()
    newPerson.address = data.address;
    newPerson.salary = data.salary;

    newPerson.save((error, savedPerson) => { this callback function is no longer use, we use async/await now
        if (error) {
            console.log('error saving the person', error);
            res.status(500).json({ error: 'internal server error' });
        } else {
            console.log('Data saved successfully');
            res.status(200).json(savedPerson);
        }
    }); 
    


    

})
app.listen(3001, ()=>{
    console.log("server is live...")
})*/

const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
 // Import the menu model

app.use(bodyParser.json()); 

app.get('/', function (req, res) {
  res.send('hello, no errors here: ')
})

/*app.post('/person', async(req, res)=> {
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
app.get('/person', async (req, res) => {
    try {
        const people = await person.find(); // Fetch all documents from the 'person' collection
        res.status(200).json(people); // Send the fetched data as JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/person/:workType', async (req, res) => {
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
});*/


/*app.post('/menu', async(req, res) => {
    try{
        const data = req.body;
        const newMenu = new menu(data);

        const response = await newMenu.save();
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
app.get('/menu', async(req, res) => {
try{
    const menus = await menu.find();
    console.log('Data Fetched');
    res.status(200).json(menus);
}catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
}
})*/

//import router files

const personRouter = require('./routes/personRoutes');
app.use('/person', personRouter);

const menuRouter = require('./routes/menuRoutes')
app.use('/menu', menuRouter);

app.listen(3001, ()=>{
    console.log("server is live...")
})
