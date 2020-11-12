module.exports = {
  apps: [
    {
      name: "nelongso-server",
      script: "./index.js",
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
