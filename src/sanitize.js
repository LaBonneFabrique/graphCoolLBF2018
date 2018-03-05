export default async event => {
  var sanitizeHtml = require('sanitize-html')
  
  const { texte } = event.data
  
  return {
    data: {
      sanitized: sanitizeHtml(texte)
    }
  }
}