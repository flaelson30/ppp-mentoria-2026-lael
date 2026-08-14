const { v4: uuidv4 } = require('uuid');

let devices = [];

module.exports = {
  getAll: () => devices,
  getById: (id) => devices.find((d) => d.id === id),
  create: (data) => {
    const device = { id: uuidv4(), ...data };
    devices.push(device);
    return device;
  },
  update: (id, data) => {
    const idx = devices.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    devices[idx] = Object.assign({}, devices[idx], data);
    return devices[idx];
  },
  remove: (id) => {
    const idx = devices.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    devices.splice(idx, 1);
    return true;
  },
};
