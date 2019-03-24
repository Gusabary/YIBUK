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

        let modelArray2 = [];
        modelArray2[0] = false;
        modelArray2[1000] = false;
        modelArray2.fill(false, 0, 1000);

        this.state = {
            booksInCart: [],
            isBuying: false,
            isDeleting: false,
            isToBuy: modelArray,
            isToDelete: modelArray2,
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
                const payload = await agent.Cart.show(this.props.userId);
                this.props.onLoadCart(payload);
                /*const booksInCart = updateCart(this.props.books, this.props.cart);
                this.setState({
                    booksInCart: booksInCart,
                })*/
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
            const payload = await agent.Cart.show(this.props.userId);
            this.props.onLoadCart(payload);
            const booksInCart = updateCart(this.props.books, this.props.cart);
            this.setState({
                booksInCart: booksInCart,
            })
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