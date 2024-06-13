const { readData, writeData } = require("../models/Database");

exports.index = (req, res) => {
  const data = readData();
  res.json(data.anggota);
};

exports.store = (req, res) => {
  const { nama } = req.body;

  if (!nama) return res.status(400).json({ message: "Nama anggota harus diberikan" });

  const data = readData();
  const id = data.anggota.length + 1;
  const anggotaBaru = { id, nama };

  data.anggota.push(anggotaBaru);
  writeData(data);

  res.status(201).json(anggotaBaru);
};

exports.show = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const anggota = data.anggota.find((a) => a.id === parseInt(id));

  if (!anggota) return res.status(404).json({ message: "Anggota tidak ditemukan" });

  res.json(anggota);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  const data = readData();
  const anggota = data.anggota.find((a) => a.id === parseInt(id));

  if (!anggota) return res.status(404).json({ message: "Anggota tidak ditemukan." });

  if (nama) anggota.nama = nama;

  writeData(data);
  res.json(anggota);
};

exports.destroy = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const anggotaIndex = data.anggota.findIndex((a) => a.id === parseInt(id));

  if (anggotaIndex === -1) return res.status(404).json({ message: "Anggota tidak ditemukan." });

  data.anggota.splice(anggotaIndex, 1);
  writeData(data);
  res.status(204).send();
};
