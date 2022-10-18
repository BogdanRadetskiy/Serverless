import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';

import { env } from '../config/config';

import { User } from '../models';

export function loadSequelize() {
  return new Sequelize({
    username: env.POSTGRES_USER,
    database: env.POSTGRES_NAME,
    password: env.POSTGRES_PASSWORD,
    host: env.POSTGRES_HOST,
    dialectModule: pg,
    dialect: 'postgres',
    schema: 'public',
    models: [ User ],
    logging: false,
    sync: {force: true},
  });
}

// const sequelize = loadSequelize();

// const doSequelizeSync = true;

// if (doSequelizeSync) {
//   (async () => {
//     try {
//       await sequelize.sync({
//         force: true,
//       });
//     } catch (e) {
//       console.error(e);
//       process.exit(1);
//     }
//   })();
// }

// export default sequelize;
