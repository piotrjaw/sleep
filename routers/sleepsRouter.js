const router = require("express").Router();
const pool = require("../db");

// create a sleep

router.post("/", async (req, res) => {
  try {
    const { time, date, user_id } = req.body;
    // date = new Date(date);
    console.log("eklenen tarih: ", date);
    const newSleep = await pool.query(
      "INSERT INTO sleep (time, date, user_id) VALUES($1, $2, $3)  RETURNING *",
      [time, date, user_id]
    );

    res.json(newSleep.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all sleeps for an user

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const allSleeps = await pool.query(
      "SELECT * FROM sleep WHERE user_id = $1 ORDER BY date",
      [user_id]
    );
    res.json(allSleeps.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a sleep

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sleep = await pool.query("SELECT * FROM sleep WHERE sleep_id = $1", [
      id,
    ]);

    res.json(sleep.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a sleep

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { time } = req.body;
    const updateSleep = await pool.query(
      "UPDATE sleep SET time = $1 WHERE sleep_id = $2",
      [time, id]
    );

    res.json("Sleep updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a sleep

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSleep = await pool.query(
      "DELETE FROM sleep WHERE sleep_id = $1",
      [id]
    );
    res.json("Sleep deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
