import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import Book from './Book'
import Sort from './Sort'
import Filter from './Filter'

const getBooksCopy = (books) => {
    let booksCopy = [];
    books.forEach((book) => {
        booksCopy.push(book)
    })
    return booksCopy;
}

//Does content contains filterKey?
const contain = (content, filterKey) => {
    const strContent = content.toString();
    if (strContent.indexOf(filterKey) !== -1)
        return true;
    return false;
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

        this.state = {
            isExpanded: modelArray,
            sortedBooks: this.props.books,
            filteredBooks: this.props.books,
            sortBy: 0,
            filterBy: 0,
            filterKey: '',
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
        this.handleFilterKeyChange = this.handleFilterKeyChange.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }

    async sort(sortBy) {
        let sortedBooks = getBooksCopy(this.state.sortedBooks)
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
        await this.setState({
            sortBy,
            sortedBooks
        })
        this.filter()
    }

    //convert sortedBooks to filteredBooks
    filter() {
        let filteredBooks = [];
        const bookAttr = ['bookId', 'bookName', 'author', 'ISBN', 'storage', 'price']
        this.state.sortedBooks.forEach((book) => {
            if (contain(book[bookAttr[this.state.filterBy]], this.state.filterKey)) {
                filteredBooks.push(book)
            }
        })
        this.setState({
            filteredBooks
        })
    }

    async handleFilterKeyChange(event) {
        await this.setState({
            filterKey: event.target.value
        })
        this.filter();
    }

    async handleFilterFieldChange(filterBy) {
        await this.setState({
            filterBy
        })
        this.filter();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortedBooks: nextProps.books,
            filteredBooks: nextProps.books,
        })
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
                <Filter
                    attr={this.state.filterBy}
                    handleChange={(filterBy)=>this.handleFilterFieldChange(filterBy)}
                    filterKey={this.state.filterKey}
                    onChange={(event) => this.handleFilterKeyChange(event)}
                />

                <div className={classes.padding}></div>

                {this.state.filteredBooks.map((book, index) =>
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