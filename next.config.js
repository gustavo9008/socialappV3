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
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: "camera=(); battery=(self); geolocation=(); microphone=('https://somewhere.com')",
          },
        ],
      },
    ];
  },
};
