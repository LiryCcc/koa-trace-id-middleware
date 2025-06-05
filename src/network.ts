import { networkInterfaces } from 'node:os';

const getServerIPV4 = (): string => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets![name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
};

const getHexIPV4 = () => {
  return getServerIPV4()
    .split('.')
    .map((x) => parseInt(x).toString(16).padStart(2, '0'))
    .join('');
};

export { getHexIPV4, getServerIPV4 };
