// Device model description (for reference)
// Fields: id, nome, marca, modelo, sistema_operacional, numero_serie

function validateDevice(obj) {
  const required = ['nome', 'marca', 'modelo', 'sistema_operacional', 'numero_serie'];
  for (const k of required) if (!obj[k]) return false;
  return true;
}

module.exports = { validateDevice };
