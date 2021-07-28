const { Superhero } = require('../models');
const createError = require('http-errors');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSuperhero = await Superhero.create(body);
    console.log(createdSuperhero);
    res.status(201).send({
      data: createdSuperhero,
    });
  } catch (error) {
    next(err);
  }
};

module.exports.getAllSuperheroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const {count: rowsCount, rows: superheroes} = await Superhero.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      ...pagination,
    });
    if (rowsCount === 0) {
      const err = createError(404, 'Users not found');
      return next(err);
    }
    res.status(200).send({
      data: superheroes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await Superhero.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!superhero) {
      const err = createError(404, 'User not found');
      return next(err);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const [rowsCount, updatedSuperhero] = await Superhero.update(body, {
      where: { id },
      returning: true,
    });
    if (rowsCount !== 1) {
      return next(createError(400, "User can't be updated"));
    }

    //delete updatedUser.password;
    updatedUser.password = undefined;

    res.send({
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Superhero.destroy({
      where: { id },
    });

    if (rowsCount !== 1) {
      return next(createError(404, 'User not found'));
    }

    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
