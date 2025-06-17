import os from 'os';

function getServerInfo() {
  const interfaces = os.networkInterfaces();
  let ip = '127.0.0.1';

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        ip = net.address;
      }
    }
  }

  return {
    server_ip: ip,
    hostname: os.hostname(),
  };
}
