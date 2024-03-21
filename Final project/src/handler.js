import books from '../books.js'
import { nanoid } from 'nanoid'
// GET handler
function showAllBooks (request, h) {
  try {
    let filteredBook = []
    const { name, reading, finished } = request.query
    if (reading) {
      const readingBool = reading === '1'
      filteredBook = books.filter((book) => book.reading === readingBool)
      return h.response({
        status: 'success',
        data: {
          books: filteredBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }))
        }
      }).code(200)
    }
    if (name) {
      const formattedName = name.toLowerCase()
      filteredBook = books.filter((book) => book.name.toLowerCase().includes(formattedName))
      return h.response({
        status: 'success',
        data: {
          books: filteredBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }))
        }
      }).code(200)
    }

    if (finished) {
      const finishedBool = finished === '1'
      filteredBook = books.filter((book) => book.finished === finishedBool)
      return h.response({
        status: 'success',
        data: {
          books: filteredBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }))
        }
      }).code(200)
    }
    return h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    }).code(200)
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    }).code(500)
  }
}

function getBookById (request, h) {
  try {
    const { bookId } = request.params
    const book = books.filter((book) => book.id === bookId)[0]
    if (book === undefined) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      }).code(404)
    } else {
      return h.response({
        status: 'success',
        data: {
          book
        }
      }).code(200)
    }
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    }).code(500)
  }
}

// POST handler
function saveBook (request, h) {
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const finished = readPage === pageCount
  try {
    // invalid input
    if (name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      }).code(400)
    } else if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400)
    } else {
      // valid input
      const id = nanoid(16)
      const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }
      books.push(newBook)
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      }).code(201)
    }
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    }).code(500)
  }
}
// PUT handler
function updateBook (request, h) {
  try {
    const { bookId } = request.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const bookIndex = books.findIndex(book => book.id === bookId)
    const updatedAt = new Date().toISOString()
    const finished = readPage === pageCount
    if (bookIndex === -1) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      }).code(404)
    }
    if (name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      }).code(400)
    }
    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      }).code(400)
    } else {
      books[bookIndex] = {
        ...books[bookIndex],
        id: bookId,
        name: name ?? books[bookIndex].name,
        year: year ?? books[bookIndex].year,
        author: author ?? books[bookIndex].author,
        summary: summary ?? books[bookIndex].summary,
        publisher: publisher ?? books[bookIndex].publisher,
        pageCount: pageCount ?? books[bookIndex].pageCount,
        readPage: readPage ?? books[bookIndex].readPage,
        finished: finished ?? books[bookIndex].finished,
        reading: reading ?? books[bookIndex].reading,
        updatedAt
      }
      return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }).code(200)
    }
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    }).code(500)
  }
}
// DELETE handler
function deleteBook (request, h) {
  const { bookId } = request.params
  const bookIndex = books.findIndex(book => book.id === bookId)
  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404)
  } else {
    books.splice(bookIndex, 1)
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
  }
}

export { showAllBooks, saveBook, getBookById, updateBook, deleteBook }
