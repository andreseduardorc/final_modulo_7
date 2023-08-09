const { users, bootcamps } = require("../models");
const db = require("../models");
const Bootcamp = db.bootcamps;
const User = db.users;

exports.createBootcamp = (bootcamp) => {
  return Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description,
  })
    .then((bootcamp) => {
      console.log(`..Creando bootcamp : ${JSON.stringify(bootcamp, null, 4)}`);
      return bootcamp;
    })
    .catch((err) => {
      console.log(`..Error al crear bootcamp: ${err}`);
    });
};

exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("no se encontro bootcamp");
        return null;
      }
      return userId.findByPk(userId).then((user) => {
        if (!user) {
          console.log("no se encontro usuario");
          return null;
        }
        bootcamp.addUser(user);
        console.log("*****************");
        console.log(
          `usuario agregado id : ${user.id} al bootcamp ${bootcamp.id}`
        );
        console.log("*****************");
        return bootcamp;
      });
    })
    .catch((err) => {
      console.log(`.. Error al agregar usuario al bootcamp ${err}`);
    });
};

exports.findByPk = (id) => {
  return Bootcamp.findByPk(id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamp) => {
      return bootcamp;
    })
    .catch((err) => {
      console.log(`error al encontrar el bootcamp ${err}`);
    });
};

exports.findAll = () => {
  return Bootcamp.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firsName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamps) => {
      return bootcamps;
    })
    .catch((err) => {
      console.log(`.. error buscando los bootcamps ${err}`);
    });
};
