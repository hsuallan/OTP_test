'use strict';
var express = require('express');
var router = express.Router();
var qrcode = require("qrcode");
var speakeasy = require("speakeasy");
var secret;
/* GET home page. */
router.get('/', function (req, res) {
    secret = speakeasy.generateSecret({ name: "test1",algorithm: "sha256"});
    qrcode.toDataURL(secret.otpauth_url, function (err, data_url) {
        res.render('index', {
            title: 'OTP',
            code : data_url
    });
    }); 
});
router.post('/test', function (req, res) {
    var token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    if (token === req.body.pw) {
        res.render("res", {
            title: 'otp_res',
            par1: 'true'
        });
    }
    else {
        res.render("res", {
            title: 'otp_res',
            par1: 'false'
        });
    }
    

});
module.exports = router;
