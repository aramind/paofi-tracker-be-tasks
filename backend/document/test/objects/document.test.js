const Document = require('../../objects/document');

const mockFind = jest.fn()
const mockFindById = jest.fn()
const mockDocumentModel = {
    find: mockFind,
    findById: mockFindById
}


const mockUpload = jest.fn()
const mockGetFile = jest.fn()
const mockGDrive = {
  upload: mockUpload,
  getFile: mockGetFile
}

describe('Document', () => {
    
    const documentClass = new Document(mockDocumentModel, mockGDrive);

    const mockMongoData = {
      _id: "91076683-2805-43ff-ba91-95f7eb2cbc59",
      type: "document-type",
      userId: "test-user-id",
      filename: "test-file-name",
      gdriveId: "test-file-id",
    };
    
    test('getDocumentInfo', async () => {
      mockFindById.mockResolvedValue(mockMongoData)
      const result = await documentClass.getDocumentInfo('test-id');
      expect(result).toEqual(mockMongoData);
    })


    test('getDocument', async () => {
      const mockData = 'mock-stream';
      mockFindById.mockResolvedValue(mockMongoData)
      mockGetFile.mockResolvedValue(mockData)

      const result = await documentClass.getDocument('test-id');
      expect(result).toEqual(mockData);
    })

    test('getDocumentsForUser', async () => {
      mockFind.mockResolvedValue(mockMongoData)

      const result = await documentClass.getDocumentsForUser('test-id');
      expect(result).toEqual(mockMongoData);
    })
})
