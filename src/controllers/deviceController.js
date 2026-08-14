const deviceService = require('../services/deviceService');

exports.getAll = (req, res) => {
  const devices = deviceService.getAll();
  res.json(devices);
};

exports.getById = (req, res) => {
  const device = deviceService.getById(req.params.id);
  if (!device) return res.status(404).json({ error: 'Device not found' });
  res.json(device);
};

exports.create = (req, res) => {
  const { nome, marca, modelo, sistema_operacional, numero_serie } = req.body;
  if (!nome || !marca || !modelo || !sistema_operacional || !numero_serie) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const device = deviceService.create({ nome, marca, modelo, sistema_operacional, numero_serie });
  res.status(201).json(device);
};

exports.update = (req, res) => {
  const updated = deviceService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Device not found' });
  res.json(updated);
};

exports.remove = (req, res) => {
  const ok = deviceService.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Device not found' });
  res.status(204).send();
};
