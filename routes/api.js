const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/ApiController");
const AnggotaController = require("../controllers/AnggotaController");
const JenisTransaksiController = require("../controllers/JenisTransaksiController");
const TabunganAnggotaController = require("../controllers/TabunganAnggotaController");
const SettingBungaController = require("../controllers/SettingBungaController");
const auth = require("../middleware/auth");

router.post("/login", ApiController.authenticate);
router.post("/register", ApiController.register);
router.get("/logout", auth, ApiController.logout);
router.get("/user", auth, ApiController.get_user);

router.get("/anggota", auth, AnggotaController.index);
router.post("/anggota", auth, AnggotaController.store);
router.get("/anggota/:id", auth, AnggotaController.show);
router.put("/anggota/:id", auth, AnggotaController.update);
router.delete("/anggota/:id", auth, AnggotaController.destroy);

router.get("/jenis-transaksi", auth, JenisTransaksiController.index);
router.post("/jenis-transaksi", auth, JenisTransaksiController.store);
router.get("/jenis-transaksi/:jenistransaksi", auth, JenisTransaksiController.show);
router.put("/jenis-transaksi/:jenistransaksi", auth, JenisTransaksiController.update);
router.delete("/jenis-transaksi/:jenistransaksi", auth, JenisTransaksiController.destroy);

router.get("/tabungan", auth, TabunganAnggotaController.index);
router.post("/tabungan", auth, TabunganAnggotaController.store);
router.get("/tabungan/:id", auth, TabunganAnggotaController.show);
router.put("/tabungan/:id", auth, TabunganAnggotaController.update);
router.delete("/tabungan/:id", auth, TabunganAnggotaController.destroy);
router.get("/saldo/:id", auth, TabunganAnggotaController.saldo);

router.get("/setting-bunga", auth, SettingBungaController.index);
router.post("/add-setting-bunga", auth, SettingBungaController.addSettingBunga);

module.exports = router;
