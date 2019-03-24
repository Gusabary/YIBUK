import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
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
    toBuy: state.cart.toBuy,
})

const mapDispatchToProps = dispatch => ({
    onLoadCart: (/*userId*/payload) => {
        dispatch({ type: 'LOAD_MODE', payload: 3 });
        //dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId) })
        dispatch({ type: "LOAD_CART", payload: payload })
    },
    onLoadBooks: () => {
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    },
    /*onBuyToggle: (isToBuy, index, quantity) =>
        dispatch({ type: "CHANGE_QUANTITY", payload: { index, quantity: isToBuy ? quantity : 0 } })*/
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
        //this.props.onLoadCart(this.props.userId);
        //const booksInCart = updateCart(this.props.books, this.props.cart);

        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);

        this.state = {
            booksInCart: [],
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

    async handleBuyOK() {
        this.setState({
            isBuying: false,
        });
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
        bookIndexOfBuy.forEach((bookIndex,index) => {
            if (this.state.booksInCart[bookIndex].storage < quantity[index]) {
                alert('Storage is not enough!');
                isEnough = false;
            }
        })
        if (isEnough) {
            await agent.Cart.buy(this.props.userId, bookIdOfBuy,quantity);
            this.props.onLoadBooks();
        }
    }

    async componentWillMount() {
        const payload = await agent.Cart.show(this.props.userId);
        this.props.onLoadCart(payload);
        const booksInCart = updateCart(this.props.books, this.props.cart);
        this.setState({
            booksInCart: booksInCart,
        })
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