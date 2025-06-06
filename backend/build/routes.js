"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/ping', (req, res) => {
    res.send('pong!');
});
router.get('/hello', (req, res) => {
    res.send('world!');
});
exports.default = router;
