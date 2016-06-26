import express from 'express';
import userRoutes from '../user/user.routes';
import loginRoutes from '../login/login.routes';
import bookRoutes from '../book/book.routes';
import requestRoutes from '../request/request.routes';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
	res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

router.use('/login', loginRoutes);

router.use('/books', bookRoutes);

router.use('/requests', requestRoutes);

export default router;
