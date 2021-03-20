# save-images-node
The created server on the node.js, loads the page, and then accepts the parameters: file-picture, username, and name of the picture.
When uploading a image, it saves it in the folder - /upload.
After submitting the form, it makes an entry in the mysql database table (id, original name, username, user-invented name) and saves the file in the folder '/static/images', 
deleting it from the folder  '/upload'.
