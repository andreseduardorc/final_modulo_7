const { users } = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createUser = (user) => {
  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
    .then((user) => {
      console.log(`usuario creado: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch((err) => {
      console.log(`error al crear usuario-${err}`);
    });
};

exports.findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(`error al buscar usuarios ${err}`);
    });
};
exports.findAll = () => {
  return User.findAll({
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "tittle"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(`error al buscar ${err}`);
    });
};

exports.updateUserById = (userId, fName, Lname) => {
  return User.update(
    {
      firstName: fName,
      lastName: Lname,
    },
    {
      where: {
        id: userId,
      },
    }
  )
    .then((user) => {
      console.log(
        `se ha actualizado el usuario :${JSON.stringify(user, null, 4)}`
      );
      return user;
    })
    .catch((err) => {
      console.log(`error al actualizar usuario ${err}`);
    });
};

exports.deleteUserId = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      console.log(
        `se ha eliminado el usuario ${JSON.stringify(user, null, 4)}`
      );
    })
    .catch((err) => {
      console.log(`no se ha podido eliminar el usuario ${err}`);
    });
};
