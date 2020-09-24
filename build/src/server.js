"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const app = express();
app.get('/', (request, response) => {
    response.send('Hello world!');
});
app.listen(5000);
//# sourceMappingURL=server.js.map