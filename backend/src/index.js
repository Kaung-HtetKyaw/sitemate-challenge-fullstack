require('dotenv').config();

const { composeCommand, startServerCommand } = require('./core/commands');

// TODO: validity checks for some env variables

composeCommand(startServerCommand());
