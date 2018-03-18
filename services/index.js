require('module-alias/register');
const http = require('http'),
      InventoryManagerAPI = require('@InventoryManagerAPI'),
      InventoryManagerServer = http.Server(InventoryManagerAPI),
      InventoryManagerPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';
InventoryManagerServer.listen(InventoryManagerPORT, LOCAL, () => console.log(`InventoryManagementAPI running on ${InventoryManagerPORT}`));