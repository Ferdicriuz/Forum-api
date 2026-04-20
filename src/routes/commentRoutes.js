const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/commentController");

router.post("/threads/:id/comments", auth, ctrl.addComment);
router.post("/comments/:id/reply", auth, ctrl.replyComment);

module.exports = router;