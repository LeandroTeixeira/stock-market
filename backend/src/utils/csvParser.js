const fs = require('fs');

function parseCSV(path) {
  try {
    if (typeof path !== 'string') throw new Error('Path must be string');
    const file = fs.readFileSync(path).toString().replaceAll('\r', '').split('\n');

    const keys = file[0].split(',');
    const values = file.slice(1, -1);
    const resul = values.map((line) => {
      const data = line.split(',');
      const obj = {};
      for (let i = 0; i < data.length; i += 1) { obj[keys[i]] = data[i]; }
      return obj;
    });
    return resul;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

module.exports = { parseCSV };
