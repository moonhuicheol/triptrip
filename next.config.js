module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login", // 원하는 페이지로 변경
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["static.wikia.nocookie.net", "storage.googleapis.com"],
  },
};
