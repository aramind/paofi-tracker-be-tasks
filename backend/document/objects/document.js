const uuid = require("uuid");

class Document {
  constructor(model, gdrive){
    this.model = model;
    this.gdrive = gdrive;
  }

  async upload(file, userId, type){
    if(!userId) {
      const error = new Error('No userId was given')
      error.code = 400;
      throw error
    }

    const { gdriveId, filename } = await this.gdrive.upload(file);

    const documentInfo = new this.model({
      _id: uuid.v4(),
      userId,
      gdriveId,
      type,
      filename
    })

    const documentMapping = await documentInfo.save();

    return {
      message: 'Document uploaded',
      ...documentMapping
    }
  }
  
  getDocumentInfo(documentId){
    if(!documentId) {
      const error = new Error('No documentId was given')
      error.code = 400;
      throw error
    }

    return this.model.findById(documentId);
  }

  async getDocument(documentId){
    if(!documentId) {
      const error = new Error('No documentId was given')
      error.code = 400;
      throw error
    }

    const documentInfo = await this.model.findById(documentId);

    if(!documentInfo){
      const error = new Error('No document found')
      error.code = 404;
      throw error
    }

    return this.gdrive.getFile(documentInfo.gdriveId);

  }

  getDocumentsForUser(userId){
    if(!userId) {
      const error = new Error('No userId was given')
      error.code = 400;
      throw error
    }

    return this.model.find({ userId });
  }
}

module.exports = Document