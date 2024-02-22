const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'covid_vaccination_db'
});

// Use cors middleware
app.use(cors());

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
    // Create the table if not exists
    connection.query(`
      CREATE TABLE IF NOT EXISTS vaccinations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        count INT NOT NULL
      )
    `, (createTableErr) => {
      if (createTableErr) {
        console.error('Error creating table:', createTableErr);
      }
    });
  }
});



app.use(bodyParser.json());

// Endpoint to fetch available vaccines
app.get('/api/vaccines', (req, res) => {
  connection.query('SELECT * FROM vaccinations', (queryErr, results) => {
    if (queryErr) {
      console.error('Error fetching vaccines from database:', queryErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// server.js
// ... (your existing code)

// Fetch all vaccinations
app.get('/api/vaccinations', (req, res) => {
    connection.query('SELECT * FROM vaccinations', (err, results) => {
      if (err) {
        console.error('Error fetching vaccinations:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  
  
  // Delete a vaccination by ID
  app.delete('/api/vaccinations/:id', (req, res) => {
    const vaccinationId = req.params.id;
  
    connection.query('DELETE FROM vaccinations WHERE id = ?', [vaccinationId], (err, results) => {
      if (err) {
        console.error('Error deleting vaccination:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true, message: 'Vaccination deleted successfully' });
      }
    });
  });
  
  // Insert a new vaccination record
  app.post('/api/vaccinations', (req, res) => {
    const { type, location, count } = req.body;
  
    connection.query(
      'INSERT INTO vaccinations (type, location, count) VALUES (?, ?, ?)',
      [type, location, count],
      (err, results) => {
        if (err) {
          console.error('Error inserting vaccination:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ success: true, message: 'Vaccination inserted successfully' });
        }
      }
    );
  });
  // Add a new endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user exists in the database
    connection.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (queryErr, results) => {
        if (queryErr) {
          console.error('Error checking user credentials:', queryErr);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if (results.length > 0) {
            // User found, send a success response
            res.json({ success: true, message: 'User authenticated successfully' });
          } else {
            // User not found or credentials are incorrect
            res.status(401).json({ error: 'Invalid credentials' });
          }
        }
      }
    );
  });
  


app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
  
    connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      (queryErr, results) => {
        if (queryErr) {
          console.error('Error registering user:', queryErr);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ success: true, message: 'User registered successfully' });
        }
      }
    );
  });

  app.post('/api/vaccinations', (req, res) => {
    // Assuming your request body contains the vaccine details
    const newVaccine = {
      type: req.body.type,
      location: req.body.location,
      count: req.body.count
    };
  
    // TODO: Insert the newVaccine into your database
    // Example using a simple array for demonstration purposes
    vaccines.push(newVaccine);
  
    res.json({ message: 'Vaccine added successfully', vaccine: newVaccine });
  });


app.put('/api/decrement/:id', (req, res) => {
    const vaccineId = req.params.id;
  
    // Assuming you have a 'vaccinations' table with columns 'id' and 'count'
    connection.query(
      'UPDATE vaccinations SET count = count - 1 WHERE id = ?',
      [vaccineId],
      (queryErr, results) => {
        if (queryErr) {
          console.error('Error decrementing vaccine count:', queryErr);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ success: true, message: 'Vaccine count decremented successfully' });
        }
      }
    );
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
