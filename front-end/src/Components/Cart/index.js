import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import BooklistInHome from '../Books/Booklist/BooklistInHome'
import BooklistInCart from '../Books/Booklist/BooklistInCart'
import ControlButtons from './ControlButtons'
import { generateArray, sort, getCopy, filter } from '../../auxiliary'

const styles = theme => ({

});

const mapStateToProps = state => ({
    books: state.books.books,
    cart: state.cart.cart,
    isLoading: state.common.isLoading,
    userId: state.user.userId,
    toBuy: state.cart.toBuy,
})

const mapDispatchToProps = dispatch => ({
    onLoadCart: (userId) => {
        dispatch({ type: 'LOAD_MODE', payload: 3 });
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId) })
    },
    onLoadBooks: () => {
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    },
})

const updateCart = (books, cart) => {
    let booksInCart = [];
    let k = 0;
    books.forEach((book) => {
        if (k >= cart.length)
            return;
        if (book.bookId > cart[k].bookId)
            k++
        if (k >= cart.length)
            return;
        if (book.bookId === cart[k].bookId) {
            booksInCart.push(book);
            k++;
        }
    })
    return booksInCart;
}

const convert = isToDelete => {
    let indexesToDelete = [];
    isToDelete.forEach((element, index) => {
        if (element)
            indexesToDelete.push(index);
    });
    return indexesToDelete;
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksInCart: [],
            status: 0,  //0 means viewing, 1 means buying and 2 means deleting
            isSelected: generateArray(1000, false),
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleToggle(index) {
        const isSelected = this.state.isSelected
        this.setState({
            isSelected: isSelected.fill(!isSelected[index], index, index + 1),
        })
    }

    handleStatusChange(status) {
        this.setState({ status });
        if (status === 0)
            this.setState({
                isSelected: generateArray(1000, false),
            })
    }

    componentWillMount() {
        this.props.onLoadCart(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            booksInCart: updateCart(nextProps.books, nextProps.cart),
        })
    }

    render() {
        const { classes } = this.props;
        if (this.props.isLoading)
            return (
                <h1>Loading...</h1>
            )
        else
            return (
                <React.Fragment>
                    <ControlButtons
                        status={this.state.status}
                        books={this.state.booksInCart}
                        bookIndexesSelected={convert(this.state.isSelected)}
                        handleStatusChange={status => this.handleStatusChange(status)}
                    />
                    {this.state.status === 0 &&
                        <BooklistInHome books={this.state.booksInCart} />
                    }
                    {this.state.status === 1 &&
                        <BooklistInCart
                            books={this.state.booksInCart}
                            isToBuy={this.state.isSelected}
                            isBuying={true}
                            handleToggle={(index) => this.handleToggle(index)}
                        />}
                    {this.state.status === 2 &&
                        <BooklistInCart
                            books={this.state.booksInCart}
                            isToDelete={this.state.isSelected}
                            isBuying={false}
                            handleToggle={(index) => this.handleToggle(index)}
                        />}
                </React.Fragment>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));