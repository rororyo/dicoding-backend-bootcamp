import { saveBook, showAllBooks, getBookById, updateBook, deleteBook } from './handler.js'

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: showAllBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById
  },
  {
    method: 'POST',
    path: '/books',
    handler: saveBook
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
]

export default routes
