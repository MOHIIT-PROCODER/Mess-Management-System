// backend/src/server.js
const app = require('./app');
const env = require('./config/env');

const PORT = env.port || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Mess Management Express Server running on port ${PORT} [${env.nodeEnv}]`);
  console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health`);
});
