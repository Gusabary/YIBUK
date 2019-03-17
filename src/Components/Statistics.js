import React from 'react'
import { Paper, withStyles, TextField, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent';

const styles = theme => ({

});

const getBookSoldMost = orders => {
    let bookSold = [];
    orders.forEach(order => {
        let hasExisted = false;
        bookSold.forEach(element => {
            if (element.bookId === order.bookId) {
                element.quantity += order.quantity;
                hasExisted = true;
            }
        })
        if (!hasExisted) {
            const tmp = {
                bookId: order.bookId,
                quantity: order.quantity,
            }
            bookSold.push(tmp);
        }

    });
    //console.log(orders)
    let bookIdOfSoldMost = 0, quantityOfSoldMost = 0;
    bookSold.forEach(element => {
        if (element.quantity > quantityOfSoldMost) {
            quantityOfSoldMost = element.quantity;
            bookIdOfSoldMost = element.bookId;
        }
    })
    const bookSoldMost = {
        bookId: bookIdOfSoldMost,
        quantity: quantityOfSoldMost,
    }
    return bookSoldMost;
}

const getCustomerBuyMost = orders => {
    let customerBuy = [];
    orders.forEach(order => {
        let hasExisted = false;
        customerBuy.forEach(element => {
            if (element.userId === order.userId) {
                element.quantity += order.quantity;
                hasExisted = true;
            }
        })
        if (!hasExisted) {
            const tmp = {
                userId: order.userId,
                quantity: order.quantity,
            }
            customerBuy.push(tmp);
        }
    });
    let userIdOfCustomerBuyMost = 0, quantityOfCustomerBuyMost = 0;
    customerBuy.forEach(element => {
        if (element.quantity > quantityOfCustomerBuyMost) {
            quantityOfCustomerBuyMost = element.quantity;
            userIdOfCustomerBuyMost = element.userId;
        }
    })
    const customerBuyMost = {
        userId: userIdOfCustomerBuyMost,
        quantity: quantityOfCustomerBuyMost,
    }
    return customerBuyMost;
}

const mapStateToProps = state => ({
    identity: state.user.identity,
    userId: state.user.userId,
    orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
    onLoadAll: () =>
        dispatch({ type: 'LOAD_ORDERS', payload: agent.Orders.showAll() }),
})

class Statistics extends React.Component {
    componentWillMount() {
        this.props.onLoadAll()
    }
    render() {
        const bookSoldMost = getBookSoldMost(this.props.orders);
        const customerPaidMost = getCustomerBuyMost(this.props.orders);
        return (
            <React.Fragment>
                {this.props.identity != 1 ?
                    <p>You are not administrator!</p> :
                    (<div>
                        <br />
                        <Typography variant="h4">
                            BookId of the book sold most is {bookSoldMost.bookId}, whose sales volume is {bookSoldMost.quantity}.
                        </Typography>
                        <br />
                        <Typography variant="h4">
                            UserId of the customer buying most is {customerPaidMost.userId}, who has buyed {customerPaidMost.quantity} books.
                        </Typography>
                    </div>)
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Statistics));