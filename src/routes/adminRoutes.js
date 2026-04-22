const router = require("express").Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const ctrl = require("../controllers/adminController");

router.get("/threads", auth, roleCheck("admin"), ctrl.getAllThreads);
router.delete("/comments/:id", auth, roleCheck("admin"), ctrl.deleteComment);

module.exports = router;