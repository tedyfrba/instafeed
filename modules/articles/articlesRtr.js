let express = require('express')
const articleCtlr = require('./articleCtlr');

let router = express.Router()

router.get('/', articleCtlr.list);
router.get('/:id', articleCtlr.detail);
router.post('/', articleCtlr.create_post);
router.put('/:id', articleCtlr.update_put);
router.patch('/:id', articleCtlr.update_patch);
router.delete('/:id', articleCtlr.delete);

module.exports = router