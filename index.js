const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());


app.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "user"');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/", async (req, res) => {
    const { name, password } = req.body;
    console.log("Data", name);
    console.log("Data", password);
    try {
        const result = await pool.query(
            'INSERT INTO "user" (name, password) VALUES ($1, $2) RETURNING *',
            [name, password]
        );
        res.status(201).json({ message: `User created with ID: ${result.rows[0].id}` });
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(3000, () => {
    console.log("SERVER IS UP");
});
