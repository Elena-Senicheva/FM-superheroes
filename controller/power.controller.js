const createError = require('http-errors');
const { Superpower } = require('../models');

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    //const createdTask = await Task.create({...body, userId: userInstance.userId});
    const createdSuperpower = await userInstance.createSuperpower(body);
    res.status(201).send({
      data: createdSuperpower,
    });
  } catch (err) {
    res.status(400).send({
      err,
    });
    //next(err);
  }
};

module.exports.getHeroPowers = async (req, res, next) => {
  try {
    const { userInstance, pagination = {} } = req;

    const tasks = await userInstance.getSuperpowers({ ...pagination });
    console.log(userInstance);
    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperpower = async (req, res, next) => {
  try {
    const {
      params: { superpowerId },
      body,
    } = req;

    const [rowsCount, updatedSuperpower] = await Superpower.update(body, {
      where: { id: superpowerId },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, "Power can't be updated"));
    }

    res.send({
      data: updatedSuperpower,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      params: { SuperpowerId },
    } = req;

    const rowsCount = await Superpower.destroy({ where: { id: uperpowerId } });

    if (rowsCount !== 1) {
      return next(createError(404, 'Power not found'));
    }

    res.send({
      data: rowsCount,
    });
  } catch (err) {
    next(err);
  }
};