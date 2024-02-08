"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("../utils/client");
var Oval3Abi = require("../utils/abi/Oval3.abi.json");
var fs = require("fs");
var viem_1 = require("viem");
var ownersJSON = require("..//utils/datas/owners.json");
var CONTRACT_ADDRESS = "0x83a5564378839EeF0721bc68A0fbeb92e2dE73d2";
var owners = __assign({}, ownersJSON.owners);
function updateOwners(logs) {
    return __awaiter(this, void 0, void 0, function () {
        var transfers, _loop_1, _i, transfers_1, transfer, blockNb, datas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Updating owners", logs);
                    transfers = logs.map(function (log) {
                        return {
                            from: log.args.from,
                            to: log.args.to,
                            tokenId: Number(log.args.tokenId)
                        };
                    });
                    console.log("Transfers", transfers);
                    _loop_1 = function (transfer) {
                        var from = transfer.from;
                        var to = transfer.to;
                        var tokenId = transfer.tokenId;
                        if (from !== to) {
                            if (from != viem_1.zeroAddress && owners[from] && owners[from].length > 0) {
                                owners[from].filter(function (v) { return v !== tokenId; });
                            }
                            if (owners[to]) {
                                owners[to].push(tokenId);
                            }
                            else {
                                owners[to] = [tokenId];
                            }
                        }
                        console.log("Transfer from", from, "to", to, "tokenId", tokenId);
                    };
                    for (_i = 0, transfers_1 = transfers; _i < transfers_1.length; _i++) {
                        transfer = transfers_1[_i];
                        _loop_1(transfer);
                    }
                    return [4 /*yield*/, client_1.client.getBlockNumber()];
                case 1:
                    blockNb = _a.sent();
                    datas = { "block": Number(blockNb), "owners": owners };
                    fs.writeFileSync('./data.json', JSON.stringify(datas, null, 2), 'utf-8');
                    return [2 /*return*/];
            }
        });
    });
}
function TransferListener(contractAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var unwatch;
        var _this = this;
        return __generator(this, function (_a) {
            unwatch = client_1.client.watchContractEvent({
                address: contractAddress,
                abi: Oval3Abi,
                eventName: 'Transfer',
                onLogs: function (logs) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, updateOwners(logs)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
            return [2 /*return*/];
        });
    });
}
function main() {
    if (!CONTRACT_ADDRESS) {
        throw new Error('CONTRACT_ADDRESS is required');
    }
    if (!(0, viem_1.isAddress)(CONTRACT_ADDRESS)) {
        throw new Error('CONTRACT_ADDRESS is not a valid address');
    }
    console.log('Listening for Transfer events on contract', CONTRACT_ADDRESS);
    TransferListener(CONTRACT_ADDRESS);
}
main();
