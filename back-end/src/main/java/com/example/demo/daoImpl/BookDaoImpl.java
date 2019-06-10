package com.example.demo.daoImpl;

import com.example.demo.dao.BookDao;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    BookRepository bookRepository;

    @Override
    public Iterable<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public void save(Book book) {
        bookRepository.save(book);
    }

    @Override
    public void deleteById(int bookId) {
        bookRepository.deleteById(bookId);
    }

    @Override
    public Book findById(int bookId) {
        return bookRepository.findById(bookId).get();
    }

}
