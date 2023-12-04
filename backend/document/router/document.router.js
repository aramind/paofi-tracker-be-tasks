const express = require("express");

const {
  upload, 
  getDocumentInfo,
  getDocumentForUser,
  getDocument,
} = require("../controller/document.controller");

const router = express.Router();

router.post("/upload", upload);
router.get("/:documentId/info", getDocumentInfo);
router.get("/user/:userId/", getDocumentForUser);
router.get("/:documentId", getDocument);

module.exports = router;