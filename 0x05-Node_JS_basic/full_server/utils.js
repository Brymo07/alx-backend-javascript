import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(console.log(err));
      } else {
        const lines = data.split('\n');
        const students = {};
        lines.forEach((line) => {
          const [field, firstname] = line.split(',');
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
        });
        resolve(students);
      }
    });
  });
}

export default readDatabase;
