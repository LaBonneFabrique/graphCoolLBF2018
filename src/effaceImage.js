export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  var cloudinary = require('cloudinary');
  cloudinary.config({ 
    cloud_name: 'la-bonne-fabrique', 
    api_key: '', 
    api_secret: '' 
  });

  const { imageId } = event.data
  let retour = ''
  
  cloudinary.v2.uploader.destroy(imageId, function(error, result){
    retour = result.deleted
  });

  return {
    data: {
      message: retour
    }
  }
}
