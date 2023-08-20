const db = require('./App/models');
const userController = require('./App/controllers/user.controller');
const bootcampController = require('./App/controllers/bootcamp.controller');

async function createUsers() {
  const usersData = [
    { firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' },
    { firstName: 'Santiago', lastName: 'Mejias', email: 'santiago.mejias@correo.com' },
    { firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' },
    { firstName: 'Facundo', lastName: 'Fernández', email: 'facundo.fernandez@correo.com' },
  ];

  const userPromises = usersData.map(userData => userController.createUser(userData));
  return Promise.all(userPromises);
}

async function createBootcamps() {
  const bootcampsData = [
    {
      title: 'Introduciendo El Bootcamp De React',
      cue: 10,
      description: "React es la librería más usada en JavaScript para el desarrollo de interfaces",
    },
    {
      title: 'Bootcamp Desarrollo Web Full Stack',
      cue: 12,
      description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS",
    },
    {
      title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
      cue: 12,
      description: "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning",
    },
  ];

  const bootcampPromises = bootcampsData.map(bootcampData => bootcampController.createBootcamp(bootcampData));
  return Promise.all(bootcampPromises);
}

async function run() {
  // Crear usuarios y bootcamps en paralelo
  const [users, bootcamps] = await Promise.all([createUsers(), createBootcamps()]);

  // Agregar usuarios a bootcamps y mostrar resultados
  await bootcampController.addUser(bootcamps[0].id, users[0].id);
  await bootcampController.addUser(bootcamps[0].id, users[1].id);
  await bootcampController.addUser(bootcamps[1].id, users[0].id);
  await bootcampController.addUser(bootcamps[2].id, users[0].id);
  await bootcampController.addUser(bootcamps[2].id, users[1].id);
  await bootcampController.addUser(bootcamps[2].id, users[2].id);
  await bootcampController.addUser(bootcamps[2].id, users[3].id);

  const _bootcamp1 = await bootcampController.findById(bootcamps[0].id);
  console.log("Bootcamp 1: ", JSON.stringify(_bootcamp1, null, 2));

  const allBootcamps = await bootcampController.findAll();
  console.log("Bootcamps: ", JSON.stringify(allBootcamps, null, 2));

  const _user = await userController.findUserById(users[0].id);
  console.log("User 1: ", JSON.stringify(_user, null, 2));

  const allUsers = await userController.findAll();
  console.log("Users: ", JSON.stringify(allUsers, null, 2));

  const updatedUser = await userController.updateUserById(users[0].id, "Pedro", "Sánchez");
  const _updatedUser = await userController.findUserById(users[0].id);
  console.log("Updated User 1: ", JSON.stringify(_updatedUser, null, 2));
}

db.sequelize.sync({
  force: true
}).then(() => {
  console.log('Eliminando y resincronizando la base de datos.');
  run();
});
