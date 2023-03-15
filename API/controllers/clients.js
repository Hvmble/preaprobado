const { response, request } = require('express');
const Client = require('../models/Client');

const clientsGet = async (req = request, res = response) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });

  }
}
const clientsGetOne = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    client ? res.json(client) : res.status(404).json({ message: `No existe un usuario con ese Id: ${id}` })
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });

  }
}
const clientsPost = async (req = request, res = response) => {
  try {
    
    const data = req.body;
    console.log('data',data)
    await Client.create(data);
    res.status(201).json({ message: "Se ha insertado un nuevo cliente" });

  } catch (error) {
    console.log('error',error)
    return res.status(500).json({ message: "Something goes wrong" });
  }

}


module.exports = {
  clientsGet,
  clientsPost,
  clientsGetOne
}
