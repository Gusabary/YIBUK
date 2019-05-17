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

class ButtonsOfEmpty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleEmptyConfirm = this.handleEmptyConfirm.bind(this);
    }

    async handleEmptyConfirm() {
        const resBody = await agent.Cart.empty(this.props.userId)
        if (resBody.message === 'Storage is not enough!') {
            alert('Storage is not enough!');
            return;
        }
        this.props.onLoadBooks();
        this.props.onLoadCart(this.props.userId);
    }

    render() {
        const { classes } = this.props;
        let bookIndexesSelected = [];
        this.props.books.forEach((book, index) => bookIndexesSelected.push(index))
        return (
            <React.Fragment>
                {this.props.status === 0 && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.setState({ open: true })}
                    >
                        Empty
                    </Button>
                )}

                <DialogT
                    open={this.state.open}
                    type={"order"}
                    handleOK={this.handleEmptyConfirm}
                    handleClose={() => this.setState({ open: false })}
                    books={this.props.books}
                    indexesToBuy={bookIndexesSelected}
                />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonsOfEmpty));