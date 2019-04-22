package com.example.demo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "book")
public class Book {

    @Id
    /*@GeneratedValue(generator = "AI")
    @GenericGenerator(name = "AI", strategy = "increment")*/
    @Column(name = "bookId")
    private int bookId;

    @Column(name = "bookName")
    private String bookName;

    @Column(name = "author")
    private String author;

    @Column(name = "coverPath")
    private String coverPath;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "storage")
    private int storage;

    @Column(name = "price")
    private double price;

    @Column(name = "introduction")
    private String introduction;

    public Book() {}

    public Book(String bookName, String author, String coverPath, String isbn, int storage, double price, String introduction) {
        this.bookName = bookName;
        this.author = author;
        this.coverPath =coverPath;
        this.isbn = isbn;
        this.storage = storage;
        this.price = price;
        this.introduction = introduction;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCoverPath() {
        return coverPath;
    }

    public void setCoverPath(String coverPath) {
        this.coverPath = coverPath;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getStorage() {
        return storage;
    }

    public void setStorage(int storage) {
        this.storage = storage;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

}
