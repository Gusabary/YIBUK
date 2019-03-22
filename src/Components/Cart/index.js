import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Radio, Dialog, Divider, Checkbox } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import agent from '../../agent'
import BookInfoList from '../Booklist/BookInfoList'
import Book from '../Booklist/Book'
import Booklist from '../Booklist/index'
import BooklistCart from './BooklistCart'
import ControlPurchase from './ControlPurchase'

const styles = theme => ({

});

const mapStateToProps = state => ({
    books: state.books.books,
    cart: state.cart.cart,
    isLoading: state.common.isLoading,
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    onLoad: (userId) => {
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId) })
        dispatch({ type: 'LOAD_MODE_3' });
    },
    onBuy: async (userId, bookIdOfBuy) => {
        await agent.Cart.buy(userId, bookIdOfBuy);
        dispatch({ type: 'LOAD_BOOKS_AFTER_BUY', payload: agent.Books.show() })
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
        this.props.onLoad(this.props.userId);
        const booksInCart = updateCart(this.props.books, this.props.cart);

        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);

        this.state = {
            booksInCart: booksInCart,
            isBuying: false,
            isToBuy: modelArray,
        }
        this.handleBuyToggle = this.handleBuyToggle.bind(this);
        this.handleBuyOK = this.handleBuyOK.bind(this);
    }

    handleBuyToggle(index) {
        const isToBuy = this.state.isToBuy
        this.setState({
            isToBuy: isToBuy.fill(!isToBuy[index], index, index + 1),
        })
    }

    handleBuyOK() {
        let bookIdOfBuy = [];
        this.state.isToBuy.forEach((element, index) => {
            if (element) {
                this.setState({
                    isToBuy: this.state.isToBuy.fill(false, index, index + 1),
                })
                bookIdOfBuy.push(this.state.booksInCart[index].bookId);
            }
        });
        /*let isEnough = true;
        bookIdOfBuy.forEach((bookId, index) => {
            if (this.state.booksInCart[index].storage < this.state.number[index]) {
                alert('Storage is not enough!');
                isEnough = false;
            }
        })
        if (isEnough)*/
        this.props.onBuy(this.props.userId, bookIdOfBuy);
    }

    //Does this hook really work?
    componentWillMount() {
        this.props.onLoad(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        const booksInCart = updateCart(nextProps.books, this.props.cart);
        this.setState({
            booksInCart: booksInCart,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ControlPurchase
                    isBuying={this.state.isBuying}
                    handleClick={() => this.setState({ isBuying: !this.state.isBuying })}
                    handleBuyOK={this.handleBuyOK}
                />
                {this.state.isBuying ?
                    <BooklistCart
                        books={this.state.booksInCart}
                        isToBuy={this.state.isToBuy}
                        handleBuyToggle={(index) => this.handleBuyToggle(index)}
                    /> :
                    <Booklist books={this.state.booksInCart} />
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));