import React from 'react'
import { withStyles, Button } from '@material-ui/core'
import DialogT from '../Dialog/index'
import agent from '../../agent'
import { connect } from 'react-redux';

const styles = theme => ({

});

const mapStateToProps = state => ({
    userId: state.user.userId,
    toBuy: state.cart.toBuy,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    onLoadCart: (userId, token) => {
        dispatch({ type: 'LOAD_MODE', payload: 3 });
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId, token) })
    },
    onLoadBooks: () => {
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    },
})

class ButtonsOfBuy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleBuyConfirm = this.handleBuyConfirm.bind(this);
    }

    async handleBuyConfirm() {
        let bookIdOfBuy = [];
        let bookIndexOfBuy = this.props.bookIndexesSelected;
        let quantity = [];
        bookIndexOfBuy.forEach((bookIndex) => {
            bookIdOfBuy.push(this.props.books[bookIndex].bookId);
            quantity.push(this.props.toBuy[bookIndex])
        });

        const resBody = await agent.Cart.buy(this.props.userId, bookIdOfBuy, quantity, this.props.token);
        if (resBody.message === 'Storage is not enough!') {
            alert('Storage is not enough!');
            return;
        }

        this.props.onLoadBooks();
        this.props.onLoadCart(this.props.userId, this.props.token);

        this.props.handleStatusChange(0)
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.props.status === 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.handleStatusChange(1)}
                    >
                        Buy
                    </Button>
                )}
                {this.props.status === 1 && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.setState({ open: true })}
                        >
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.handleStatusChange(0)}
                        >
                            Cancel
                        </Button>
                    </div>
                )}

                <DialogT
                    open={this.state.open}
                    type={"order"}
                    handleOK={this.handleBuyConfirm}
                    handleClose={() => this.setState({ open: false })}
                    books={this.props.books}
                    indexesToBuy={this.props.bookIndexesSelected}
                />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonsOfBuy));