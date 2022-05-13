// require("dotenv").config();
module.exports = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [


          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
