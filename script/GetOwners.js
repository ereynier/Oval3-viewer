"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var client_1 = require("../utils/client");
var Oval3Abi = require("../utils/abi/Oval3.abi.json");
var fs = require("fs");
var process_1 = require("process");
function getOwners(contractAddress, maxId) {
    if (maxId === void 0) { maxId = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var owners, totalSupply, i, owner, blockNb, datas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    owners = {};
                    return [4 /*yield*/, client_1.client.readContract({
                            address: contractAddress,
                            abi: Oval3Abi,
                            functionName: "totalSupply",
                            args: []
                        })];
                case 1:
                    totalSupply = _a.sent();
                    if (maxId > 0) {
                        totalSupply = maxId;
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < Number(totalSupply))) return [3 /*break*/, 5];
                    return [4 /*yield*/, client_1.client.readContract({
                            address: contractAddress,
                            abi: Oval3Abi,
                            functionName: "ownerOf",
                            args: [i]
                        })];
                case 3:
                    owner = _a.sent();
                    owners[owner] = __spreadArray(__spreadArray([], (owners[owner] || []), true), [i], false);
                    console.log("".concat(((i / Number(totalSupply)) * 100).toFixed(0), " / 100 - ").concat(i, " / ").concat(Number(totalSupply)));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, client_1.client.getBlockNumber()];
                case 6:
                    blockNb = _a.sent();
                    datas = { "block": Number(blockNb), "owners": owners };
                    fs.writeFileSync('./data.json', JSON.stringify(datas, null, 2), 'utf-8');
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    var maxId = Number(process_1.argv[2]) || 0;
    getOwners("0x83a5564378839EeF0721bc68A0fbeb92e2dE73d2", maxId);
}
main();
