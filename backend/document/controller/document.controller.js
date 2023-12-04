const GDrive = require("../services/gdrive");
const DocumentModel = require("../models/document.model");
const Document = require("../objects/document")

exports.upload = async (req, res) => {
  const { userid: userId, type } = req.headers;
  const gdriveClient = new GDrive();

  try{
    const document =  new Document(DocumentModel, gdriveClient);
    const result = await document.upload(req.body, userId, type);

    res.json(result);
  }catch(err){
    res.send(err);
  }

}

exports.getDocumentInfo = async (req, res) => {
  const { documentId } = req.params;

  try{
    const document =  new Document(DocumentModel);
    const result = await document.getDocumentInfo(documentId);

    res.json(result);
  }catch(err){
    res.send(err);
  }

}
  

exports.getDocumentForUser = async (req, res) => {
  const { userId } = req.params;

  try{
    const document =  new Document(DocumentModel);
    const result = await document.getDocumentsForUser(userId);

    res.json(result);
  }catch(err){
    res.send(err);
  }
}

exports.getDocument = async (req, res) => {
  const { documentId } = req.params;
  const gdriveClient = new GDrive();

  try{
    const document =  new Document(DocumentModel, gdriveClient);
    const result = await document.getDocument(documentId);

    res.json(result);
  }catch(err){
    res.send(err);
  }
}
