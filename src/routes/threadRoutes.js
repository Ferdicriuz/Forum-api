const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/threadController");

router.post("/", auth, ctrl.createThread);
router.get("/", ctrl.getThreads);
router.get("/:id", ctrl.getThreadById);
router.delete("/:id", auth, ctrl.deleteThread);

module.exports = router;