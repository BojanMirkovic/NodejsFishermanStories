const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log(formData);
    
    fs.readFile('booking.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        
        let jsonData = [];
        
        if (data) {
            jsonData = JSON.parse(data);
        }
        
        jsonData.push(formData);
        
        fs.writeFile('booking.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }
            
            res.send('Form data saved successfully');
        });
    });
});

//Here, we have added a new route for handling DELETE requests
app.delete('/delete-form/:id', (req, res) => {
  const userId = req.params.id;

  // read the existing data from the file
  fs.readFile('booking.json', (err, data) => {
      if (err) {
          console.log(err);
          res.status(500).send('Internal server error');
      } else {
          const jsonData = JSON.parse(data);

          // find the form data with the given user ID
          const userIndex = jsonData.findIndex(user => user.id == userId);

          if (userIndex === -1) {
              // user ID not found in the data array
              res.status(404).send('User not found');
          } else {
              // remove the form data for the user with the given ID
              const deletedUser = jsonData.splice(userIndex, 1)[0];

              // write the updated data back to the file
              fs.writeFile('booking.json', JSON.stringify(jsonData), (err) => {
                  if (err) {
                      console.log(err);
                      res.status(500).send('Internal server error');
                  } else {
                      res.send(`Form data for user ${deletedUser.name} (ID: ${deletedUser.id}) deleted successfully`);
                  }
              });
          }
      }
  });
});

//Load data from booking.json

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/data', (req, res) => {
  fs.readFile('booking.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    res.json(JSON.parse(data));
  });
});



//Seting the Server listener
const port = 4000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

