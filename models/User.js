const { readData, writeData } = require("./Database");
const bcrypt = require("bcryptjs");

class User {
  static findByUsername(username) {
    const data = readData();
    return data.users.find((u) => u.username === username);
  }

  static findById(id) {
    const data = readData();
    return data.users.find((u) => u.id === parseInt(id));
  }

  static create(userBaru) {
    const data = readData();
    const id = data.users.length + 1;
    const hashedPassword = bcrypt.hashSync(userBaru.password, 10);
    const user = { id, ...userBaru, password: hashedPassword };
    data.users.push(user);
    writeData(data);
    return user;
  }
}

module.exports = User;
