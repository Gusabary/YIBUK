import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import Booklist from '../Booklist/index'
import BooklistCart from './Booklist'
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
        if (book.bookId === cart[k].bookId) {
            booksInCart.push(book);
            k++;
        }
    })
    return booksInCart;
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksInCart: [],
            isBuying: false,
            isDeleting: false,
            isToBuy: generateArray(1000, false),
            isToDelete: generateArray(1000, false),
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleToggle(field, index) {
        if (field === 'Buy') {
            const isToBuy = this.state.isToBuy
            this.setState({
                isToBuy: isToBuy.fill(!isToBuy[index], index, index + 1),
            })
        }
        else {
            const isToDelete = this.state.isToDelete
            this.setState({
                isToDelete: isToDelete.fill(!isToDelete[index], index, index + 1),
            })
        }
    }

    async handleOK(field) {
        this.setState({
            isBuying: false,
            isDeleting: false,
        });
        if (field === 'Buy') {
            let bookIdOfBuy = [];
            let bookIndexOfBuy = [];
            let quantity = [];
            this.state.isToBuy.forEach((element, index) => {
                if (element) {
                    this.setState({
                        isToBuy: this.state.isToBuy.fill(false, index, index + 1),
                    })
                    bookIdOfBuy.push(this.state.booksInCart[index].bookId);
                    bookIndexOfBuy.push(index);
                    quantity.push(this.props.toBuy[index])
                }
            });

            let isEnough = true;
            bookIndexOfBuy.forEach((bookIndex, index) => {
                if (this.state.booksInCart[bookIndex].storage < quantity[index]) {
                    alert('Storage is not enough!');
                    isEnough = false;
                }
            })
            if (isEnough) {
                await agent.Cart.buy(this.props.userId, bookIdOfBuy, quantity);
                this.props.onLoadBooks();
                this.props.onLoadCart(this.props.userId);
            }
        }
        else {
            let bookIdOfDelete = [];
            this.state.isToDelete.forEach((element, index) => {
                if (element) {
                    this.setState({
                        isToDelete: this.state.isToDelete.fill(false, index, index + 1),
                    })
                    bookIdOfDelete.push(this.state.booksInCart[index].bookId);
                }
            });
            await agent.Cart.delete(this.props.userId, bookIdOfDelete);
            this.props.onLoadCart(this.props.userId);
        }
    }

    handleClick(field) {
        if (field === 'Buy')
            this.setState({
                isBuying: !this.state.isBuying
            })
        else
            this.setState({
                isDeleting: !this.state.isDeleting
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
                        isBuying={this.state.isBuying}
                        isDeleting={this.state.isDeleting}
                        handleClick={(field) => this.handleClick(field)}
                        handleOK={(field) => this.handleOK(field)}
                    />
                    {this.state.isBuying &&
                        <BooklistCart
                            books={this.state.booksInCart}
                            isToBuy={this.state.isToBuy}
                            isBuying={true}
                            handleToggle={(index) => this.handleToggle('Buy', index)}
                        />}
                    {this.state.isDeleting &&
                        <BooklistCart
                            books={this.state.booksInCart}
                            isToDelete={this.state.isToDelete}
                            isBuying={false}
                            handleToggle={(index) => this.handleToggle('Delete', index)}
                        />}
                    {this.state.isBuying || this.state.isDeleting ||
                        <Booklist books={this.state.booksInCart} />
                    }
                </React.Fragment>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));