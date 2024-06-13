const { readData, writeData } = require("../models/Database");

exports.index = (req, res) => {
  const data = readData();
  res.json(data.tabungan);
};

exports.store = (req, res) => {
  const { idAnggota, jumlah, tanggal } = req.body;
  if (!idAnggota || !jumlah || !tanggal) {
    return res.status(400).json({ message: "Data tabungan tidak lengkap." });
  }

  const data = readData();
  const id = data.tabungan.length + 1;
  const tabunganBaru = { id, idAnggota, jumlah, tanggal };

  data.tabungan.push(tabunganBaru);
  writeData(data);

  res.status(201).json(tabunganBaru);
};

exports.show = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const tabungan = data.tabungan.find((t) => t.id === parseInt(id));

  if (!tabungan) {
    return res.status(404).json({ message: "Tabungan tidak ditemukan." });
  }

  res.json(tabungan);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { jumlah, tanggal } = req.body;
  const data = readData();
  const tabungan = data.tabungan.find((t) => t.id === parseInt(id));

  if (!tabungan) {
    return res.status(404).json({ message: "Tabungan tidak ditemukan." });
  }

  if (jumlah !== undefined) tabungan.jumlah = jumlah;
  if (tanggal) tabungan.tanggal = tanggal;

  writeData(data);

  res.json(tabungan);
};

exports.destroy = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const tabunganIndex = data.tabungan.findIndex((t) => t.id === parseInt(id));

  if (tabunganIndex === -1) {
    return res.status(404).json({ message: "Tabungan tidak ditemukan." });
  }

  data.tabungan.splice(tabunganIndex, 1);
  writeData(data);

  res.status(204).send();
};

exports.saldo = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const tabungan = data.tabungan.filter((t) => t.idAnggota === parseInt(id));

  if (!tabungan.length) {
    return res.status(404).json({ message: "Tidak ada tabungan untuk anggota ini." });
  }

  const saldo = tabungan.reduce((acc, t) => acc + t.jumlah, 0);
  res.json({ saldo });
};
