/**
 * Created by Shahar on 19/06/2016.
 */
import express from 'express';
// import validate from 'express-validation';
import bookCtrl from './book.controller';
import userCtrl from '../user/user.controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('')
	.get(bookCtrl.list);

router.route('/:username')
	.get(bookCtrl.get)
    .post(bookCtrl.create);

router.route('/:username/:bookid')
    .delete(bookCtrl.deleteBook);

router.param('username', userCtrl.load);
router.param('bookid', bookCtrl.load);

export default router;
