const router = require("express").Router();
const pool = require("../db");

// Create a user

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING *",
      [username]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all users

router.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
