import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import Book from './Book'
import Sort from './Sort'

const getBooksCopy = (books) => {
    let booksCopy = [];
    books.forEach((book) => {
        booksCopy.push(book)
    })
    return booksCopy;
}

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 5,
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class Booklist extends React.Component {
    constructor(props) {
        super(props);
        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);
        //console.log(this.props.books)

        this.state = {
            isExpanded: modelArray,
            sortedBooks: this.props.books,
            sortBy: 0,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.sort = this.sort.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }

    sort(sortBy) {
        if (sortBy === -1)
            return;
        let sortedBooks = getBooksCopy(this.props.books);
        const bookAttr = ['bookId', 'bookName', 'author', 'ISBN', 'storage', 'price']
        const attr = bookAttr[sortBy];
        const len = this.props.books.length;
        for (let i = 0; i < len - 1; i++)
            for (let j = i + 1; j < len; j++)
                if (sortedBooks[i][attr] > sortedBooks[j][attr]) {
                    const tmp = sortedBooks[j]
                    sortedBooks[j] = sortedBooks[i]
                    sortedBooks[i] = tmp
                }
        this.setState({
            sortBy,
            sortedBooks
        })
        //console.log(this.props.books)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortedBooks: nextProps.books,
        })
        //console.log(this.state.sortedBooks)
    }

    render() {
        const { classes } = this.props;
        if (this.props.books.length === 0)
            return (
                <h1>
                    Loading...
                </h1>
            )
        return (
            <React.Fragment>
                <Sort
                    attr={this.state.sortBy}
                    handleChange={(value) => this.sort(value)}
                />
                <div className={classes.padding}></div>

                {this.state.sortedBooks.map((book, index) =>
                    <Book
                        book={book}
                        handleExpanded={() => this.handleExpanded(index)}
                        isExpanded={this.state.isExpanded[index]}
                        index={index}
                        history={this.props.history}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Booklist));