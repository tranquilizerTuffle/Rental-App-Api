const express = require('express');
const router = new express.Router();
const admin = require('../controllers/admin.js');
const user = require ('../controllers/user.js');
const asset = require ('../controllers/asset.js');
const request = require('../controllers/request.js');

router.route('/admin/:id?')
    .get(admin.get)
    .post(admin.post)
    .put(admin.put)
    .delete(admin.delete);

router.route('/user/:id?')
.get(user.get)
.post(user.post)
.put(user.put)
.delete(user.delete);   

router.route('/asset/:id?')
.get(asset.get)
.post(asset.post)
.put(asset.put)
.delete(asset.delete);   

router.route('/request/:id?')
.get(request.get)
.post(request.post)
.put(request.put)
.delete(request.delete);   


module.exports = router;