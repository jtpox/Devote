"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const app = new index_1.default();
app.listen(8080, () => {
    console.log('Started!');
});
app.get('/', (req, res) => {
    res.send('This is a test send');
});
app.post('/', (req, res) => {
    // res.send('This is a test send on a POST request.');
    res.json({
        it: 'works',
    });
});
//# sourceMappingURL=test.js.map