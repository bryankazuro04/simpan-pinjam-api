const { readData, writeData } = require("./Database");

class Anggota {
  static all() {
    const data = readData();
    return data.anggota;
  }

  static findById(id) {
    const data = readData();
    return data.anggota.find((a) => a.id === parseInt(id));
  }

  static create(anggotaBaru) {
    const data = readData();
    const id = data.anggota.length + 1;
    const anggota = { id, ...anggotaBaru };
    data.anggota.push(anggota);
    writeData(data);
    return anggota;
  }

  static update(id, updateData) {
    const data = readData();
    const anggota = data.anggota.find((a) => a.id === parseInt(id));
    if (!anggota) return null;

    Object.assign(anggota, updateData);
    writeData(data);
    return anggota;
  }

  static delete(id) {
    const data = readData();
    const anggotaIndex = data.anggota.findIndex((a) => a.id === parseInt(id));
    if (anggotaIndex === -1) return null;

    const deletedAnggota = data.anggota.splice(anggotaIndex, 1);
    writeData(data);
    return deletedAnggota;
  }
}

module.exports = Anggota;
