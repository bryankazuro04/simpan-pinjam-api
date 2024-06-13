const { readData, writeData } = require("./Database");

class TabunganAnggota {
  static all() {
    const data = readData();
    return data.tabungan;
  }

  static findById(id) {
    const data = readData();
    return data.tabungan.find((t) => t.id === parseInt(id));
  }

  static findByAnggotaId(idAnggota) {
    const data = readData();
    return data.tabungan.filter((t) => t.idAnggota === parseInt(idAnggota));
  }

  static create(tabunganBaru) {
    const data = readData();
    const id = data.tabungan.length + 1;
    const tabungan = { id, ...tabunganBaru };
    data.tabungan.push(tabungan);
    writeData(data);
    return tabungan;
  }

  static update(id, updateData) {
    const data = readData();
    const tabungan = data.tabungan.find((t) => t.id === parseInt(id));
    if (!tabungan) return null;

    Object.assign(tabungan, updateData);
    writeData(data);
    return tabungan;
  }

  static delete(id) {
    const data = readData();
    const tabunganIndex = data.tabungan.findIndex((t) => t.id === parseInt(id));
    if (tabunganIndex === -1) return null;

    const deletedTabungan = data.tabungan.splice(tabunganIndex, 1);
    writeData(data);
    return deletedTabungan;
  }

  static getSaldo(idAnggota) {
    const tabungan = this.findByAnggotaId(idAnggota);
    if (!tabungan.length) return 0;
    return tabungan.reduce((acc, t) => acc + t.jumlah, 0);
  }
}

module.exports = TabunganAnggota;
