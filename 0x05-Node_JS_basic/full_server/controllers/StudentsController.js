import readDatabase from '../utils';
import path from 'path';

class StudentsController {
  static getAllStudents(request, response) {
	  // Get the absolute path to the database.csv file using '__dirname'
    const dbFilePath = path.join(__dirname, '..', 'database.csv');
    readDatabase(dbFilePath)
      .then((students) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        let res = 'This is the list of our students\n';
        const fields = ['CS', 'SWE'];
        fields.forEach((field) => {
          const firstNames = students[field];
          res += `Number of students in ${field}: ${firstNames.length}. List: ${firstNames.join(', ')}\n`;
        });
        response.end(res);
      })
      .catch((err) => {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { url } = request;
    const { major } = new URLSearchParams(url.split('?')[1]);
    if (!['CS', 'SWE'].includes(major)) {
      response.statusCode = 500;
      response.setHeader('Content-Type', 'text/plain');
      response.end('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(dbFilePath)
      .then((students) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        const firstNames = students[major];
        response.end(`List: ${firstNames.join(', ')}`);
      })
      .catch((err) => {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Cannot load the database');
      });
  }
}

export default StudentsController;

