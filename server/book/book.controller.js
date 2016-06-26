/**
 * Created by Shahar on 19/06/2016.
 */
//	import Book from './book.model';
import request from 'request';
import User from '../user/user.model';

const api = 'https://www.googleapis.com/books/v1/volumes?q=';

function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	User.list({ limit, skip })
			.then((users) => {
				const books = users.map((user) => ({
					id: user._id,
					books: user.books
				}));
				res.json(books);
			})
			.catch((err) => {
				next(new Error(err));
			});
}

function get(req, res, next) { // eslint-disable-line no-unused-vars
	const user = req.user;
	res.json(user.books);
}

function load(req, res, next, id) {
	const user = req.user;
	const book = user.books.id(id);
	if (book) {
		req.book = book; // eslint-disable-line no-param-reassign
		next();
	} else {
		next(new Error('Could not find the book'));
	}
}

function deleteBook(req, res, next) {
	const book = req.book;
	const user = req.user;

	book.remove();

	user.saveAsync()
			.then((savedUser) => res.json(savedUser.books))
			.error((e) => next(e));
}

function create(req, res, next) {
	const url = `${api}${req.body.name}`;
	request.get({ url, json: true }, (error, response, json) => {
		if (error) {
			next(new Error(error));
		}

		const firstBook = json.items[0];
		const pictureUrl = (firstBook.volumeInfo.imageLinks) ?
				firstBook.volumeInfo.imageLinks.thumbnail : '';
		const book = {
			name: firstBook.volumeInfo.title,
			picture: pictureUrl
		};

		const user = req.user;
		user.books.push(book);

		user.saveAsync()
				.then((savedUser) => res.json(savedUser.books))
				.error((e) => next(e));
	});
}

export default { create, deleteBook, list, load, get };
