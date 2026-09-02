import { uploadToCloudinary } from '../utils/cloudinary.js';

// Upload image to Cloudinary (Admin only)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, 'zakhira/products')
      );
      const results = await Promise.all(uploadPromises);
      const urls = results.map((result) => result.secure_url);

      return res.status(200).json({
        success: true,
        message: 'Images uploaded successfully',
        urls,
        data: urls,
      });
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'zakhira/products');
      return res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        url: result.secure_url,
        data: result.secure_url,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed',
    });
  }
};
