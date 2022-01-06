const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
