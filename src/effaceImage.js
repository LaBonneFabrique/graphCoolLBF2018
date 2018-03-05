export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  var cloudinary = require('cloudinary');
  cloudinary.config({ 
    cloud_name: 'la-bonne-fabrique', 
    api_key: '355229151489945', 
    api_secret: 'O8T7uwlHS6uu4LKqS2W50DZX7sI' 
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