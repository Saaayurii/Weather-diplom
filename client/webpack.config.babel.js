// Используем .cjs версии конфигов для совместимости с babel-register
module.exports = env => require(`./build/${env}.cjs`);