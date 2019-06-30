import React from 'react'
import { withStyles, Toolbar, Button, Paper } from '@material-ui/core'
import { connect } from 'react-redux';
import BookPanelInHome from '../BookPanel/BookPanelInHome'
import Sort from '../Sort'
import Filter from '../Filter'
import { generateArray, sort, getCopy, filter } from '../../../auxiliary'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 5,
    },
    button: {
        marginTop: theme.spacing.unit,
        marginLeft: -theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light,
    }
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class BooklistInHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: generateArray(1000, false),
            sortedBooks: this.props.books,
            filteredBooks: this.props.books,
            sortBy: 0,
            filterBy: 0,
            filterKey: '',
            fsOpen: false,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilterKeyChange = this.handleFilterKeyChange.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }

    async handleSort(sortBy) {
        console.log("********")
        let sortedBooks = getCopy(this.state.sortedBooks)
        const bookAttr = ['bookId', 'bookName', 'author', 'isbn', 'storage', 'price']
        sort(sortedBooks, bookAttr[sortBy]);
        console.log("-----------")
        await this.setState({
            sortBy,
            sortedBooks
        })
        console.log(this.state.sortedBooks)
        this.handleFilter()
    }

    //convert sortedBooks to filteredBooks
    handleFilter() {
        const bookAttr = ['bookId', 'bookName', 'author', 'isbn', 'storage', 'price']
        const filteredBooks = filter(this.state.sortedBooks, [bookAttr[this.state.filterBy]], [this.state.filterKey])
        this.setState({
            filteredBooks
        })
    }

    async handleFilterKeyChange(event) {
        await this.setState({
            filterKey: event.target.value
        })
        this.handleFilter();
    }

    async handleFilterFieldChange(filterBy) {
        await this.setState({
            filterBy
        })
        this.handleFilter();
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
                    No books.
                </h1>
            )
            //console.log(this.state.filteredBooks)
        return (
            <React.Fragment>
                <Toolbar>
                    <Button
                        variant='contained'
                        onClick={() => this.setState({ fsOpen: !this.state.fsOpen })}
                        className={classes.button}
                    >
                        Sort/Filter
                    </Button>
                    {this.state.fsOpen && (
                        <React.Fragment>
                            <Sort
                                attr={this.state.sortBy}
                                handleChange={(value) => this.handleSort(value)}
                            />
                            <Filter
                                attr={this.state.filterBy}
                                handleFilterFieldChange={(filterBy) => this.handleFilterFieldChange(filterBy)}
                                filterKey={this.state.filterKey}
                                handleFilterKeyChange={(event) => this.handleFilterKeyChange(event)}
                            />
                        </React.Fragment>
                    )}
                </Toolbar>
                <div className={classes.padding}></div>

                {this.state.filteredBooks.map((book, index) => {
                    console.log(book)
                    return (
                        <BookPanelInHome
                            book={book}
                            handleExpanded={() => this.handleExpanded(index)}
                            isExpanded={this.state.isExpanded[index]}
                            index={index}
                            history={this.props.history}
                        />)
                }
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooklistInHome));