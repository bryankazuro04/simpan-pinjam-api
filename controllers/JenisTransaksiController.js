const { readData, writeData } = require("../models/Database");

exports.index = (req, res) => {
  const data = readData();
  res.json(data.jenistransaksi);
};

exports.store = (req, res) => {
  const { nama } = req.body;
  if (!nama) {
    return res.status(400).json({ message: "Nama jenis transaksi harus diberikan." });
  }

  const data = readData();
  const id = data.jenistransaksi.length + 1;
  const jenisTransaksiBaru = { id, nama };

  data.jenistransaksi.push(jenisTransaksiBaru);
  writeData(data);

  res.status(201).json(jenisTransaksiBaru);
};

exports.show = (req, res) => {
  const { jenistransaksi } = req.params;
  const data = readData();
  const jenisTransaksi = data.jenistransaksi.find((jt) => jt.id === parseInt(jenistransaksi));

  if (!jenisTransaksi) {
    return res.status(404).json({ message: "Jenis transaksi tidak ditemukan." });
  }

  res.json(jenisTransaksi);
};

exports.update = (req, res) => {
  const { jenistransaksi } = req.params;
  const { nama } = req.body;
  const data = readData();
  const jenisTransaksi = data.jenistransaksi.find((jt) => jt.id === parseInt(jenistransaksi));

  if (!jenisTransaksi) {
    return res.status(404).json({ message: "Jenis transaksi tidak ditemukan." });
  }

  if (nama) jenisTransaksi.nama = nama;

  writeData(data);

  res.json(jenisTransaksi);
};

exports.destroy = (req, res) => {
  const { jenistransaksi } = req.params;
  const data = readData();
  const jenisTransaksiIndex = data.jenistransaksi.findIndex((jt) => jt.id === parseInt(jenistransaksi));

  if (jenisTransaksiIndex === -1) {
    return res.status(404).json({ message: "Jenis transaksi tidak ditemukan." });
  }

  data.jenistransaksi.splice(jenisTransaksiIndex, 1);
  writeData(data);

  res.status(204).send();
};
