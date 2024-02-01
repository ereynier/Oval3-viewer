"use strict";
exports.__esModule = true;
exports.client = void 0;
var viem_1 = require("viem");
var chains_1 = require("./chains");
exports.client = (0, viem_1.createPublicClient)({
    chain: chains_1.chain,
    transport: (0, viem_1.http)(chains_1.chainRpc)
});
