

class GDrive {
  constructor(){
    
  }

  async upload(file){
    return {
      gdriveId: 'test-file-id',
      filename: 'test-file-name',
    }
  }

  async getFile(id){
    return 'suppose to be stream'
  }
}

module.exports = GDrive