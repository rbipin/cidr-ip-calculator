import { writeFile } from 'fs';
import * as colors from 'colors';
import * as dotenv from 'dotenv';
dotenv.config();
const environment = process.argv[2];
// Configure Angular `environment.ts` file path
let targetPath = '';
switch (environment) {
  case 'prod':
    targetPath = `./src/environments/environment.prod.ts`;
    break;
  case 'test':
    targetPath = `./src/environments/environment.test.ts`;
    break;
  default:
    targetPath = `./src/environments/environment.ts`;
    break;
}

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  apiUrl: 'https://cidr-calc-api.herokuapp.com',
  apiKey: '${process.env.api_key}',
  production: ${process.env.production}
};
`;
console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
);
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});
