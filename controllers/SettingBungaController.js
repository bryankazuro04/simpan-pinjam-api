const { readData, writeData } = require("../models/Database");

exports.index = (req, res) => {
  const data = readData();
  res.json(data.settingbunga);
};

exports.addSettingBunga = (req, res) => {
  const { bunga } = req.body;
  if (bunga === undefined) {
    return res.status(400).json({ message: "Bunga harus diberikan." });
  }

  const data = readData();
  const id = data.settingbunga.length + 1;
  const settingBungaBaru = { id, bunga };

  data.settingbunga.push(settingBungaBaru);
  writeData(data);

  res.status(201).json(settingBungaBaru);
};
