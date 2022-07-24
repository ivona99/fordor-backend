const express = require('express');
const cors = require('cors');
const http = require('http');
const path=require('path')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
const postRoutes = require('./routes/postsRoutes');
const imageRoutes = require('./routes/imageRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/api/posts', postRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/comments', commentRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});