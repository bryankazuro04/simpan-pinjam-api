const { readData, writeData } = require("./Database");

class JenisTransaksi {
  static all() {
    const data = readData();
    return data.jenistransaksi;
  }

  static findById(id) {
    const data = readData();
    return data.jenistransaksi.find((jt) => jt.id === parseInt(id));
  }

  static create(jenisTransaksiBaru) {
    const data = readData();
    const id = data.jenistransaksi.length + 1;
    const jenisTransaksi = { id, ...jenisTransaksiBaru };
    data.jenistransaksi.push(jenisTransaksi);
    writeData(data);
    return jenisTransaksi;
  }

  static update(id, updateData) {
    const data = readData();
    const jenisTransaksi = data.jenistransaksi.find((jt) => jt.id === parseInt(id));
    if (!jenisTransaksi) return null;

    Object.assign(jenisTransaksi, updateData);
    writeData(data);
    return jenisTransaksi;
  }

  static delete(id) {
    const data = readData();
    const jenisTransaksiIndex = data.jenistransaksi.findIndex((jt) => jt.id === parseInt(id));
    if (jenisTransaksiIndex === -1) return null;

    const deletedJenisTransaksi = data.jenistransaksi.splice(jenisTransaksiIndex, 1);
    writeData(data);
    return deletedJenisTransaksi;
  }
}

module.exports = JenisTransaksi;
