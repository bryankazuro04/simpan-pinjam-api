const { readData, writeData } = require("./Database");

class SettingBunga {
  static all() {
    const data = readData();
    return data.settingbunga;
  }

  static create(settingBungaBaru) {
    const data = readData();
    const id = data.settingbunga.length + 1;
    const settingBunga = { id, ...settingBungaBaru };
    data.settingbunga.push(settingBunga);
    writeData(data);
    return settingBunga;
  }
}

module.exports = SettingBunga;
