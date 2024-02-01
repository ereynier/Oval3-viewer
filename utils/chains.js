"use strict";
exports.__esModule = true;
exports.chainRpc = exports.chain = void 0;
var chains_1 = require("viem/chains");
var CHAIN = process.env.NEXT_PUBLIC_CHAIN || "polygon";
var POLYGON_ALCHEMY_API_KEY = process.env.POLYGON_ALCHEMY_API_KEY || "";
var chains = {
    polygon: chains_1.polygon
};
var rpc = {
    polygon: POLYGON_ALCHEMY_API_KEY
};
exports.chain = chains[CHAIN];
exports.chainRpc = rpc[CHAIN];
