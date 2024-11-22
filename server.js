const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());

// Get images endpoint
app.get('/api/images', async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:gallery')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();
    res.json(result.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 