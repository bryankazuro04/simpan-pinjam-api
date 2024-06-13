const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readData, writeData } = require("../models/Database");

exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  const user = data.users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Password salah" });
  }

  const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: "1h" });
  res.json({ token });
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  const userExists = data.users.some((user) => user.name === username);

  if (userExists) {
    return res.status(400).json({ message: "Username sudah ada." });
  }

  const hashedPassword = bcrypt(hashSync(password, 10));
  const id = data.users.length + 1;
  const newUser = { id, username, password: hashedPassword };

  data.users.push(newUser);
  writeData(data);

  res.status(201).json(newUser);
};

exports.logout = (req, res) => {
  res.json({ message: "Logout berhasil" });
};

exports.get_user = (req, res) => {
  const data = readData();
  const user = data.users.find((user) => user.id === req.user.id);

  if (!user) return res.status(404).json({ message: "User tidak ditemukan." });

  res.json(user);
};
