import React from 'react'
import { Typography, withStyles, Button,Dialog,TextField } from '@material-ui/core'
import Create from '@material-ui/icons/Create'
import { connect } from 'react-redux';
import agent from '../../../agent'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'

const styles = theme => ({
    edit: {
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: "#f4ff81",
        color: "#0277bd",
        border: 'solid',
        textDecoration: 'underline',
        height: 70,
        width: 170,
    },
    buttonIcon: {
        marginLeft: -theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

const mapStateToProps = state => ({
    userId: state.user.userId,
    identity: state.user.identity
})

const mapDispatchToProps = dispatch => ({
    onLoad: (userId) => {
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId) })
    },
})

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            number: 1
        }

        this.handleAddToCartOK = this.handleAddToCartOK.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    async handleAddToCartOK() {
        await agent.Cart.add(this.props.userId, this.props.book.bookId, this.state.number);
        this.props.onLoad(this.props.userId);
        this.handleClose();
    }

    handleClose() {
        this.setState({
            open: false,
            number: 1
        })
    }

    handleClick() {
        if (this.props.identity === 2) {
            alert('Please sign in first!')
            return;
        }
        this.setState({
            open: true
        })
    }

    render() {
        const { classes, book } = this.props;
        return (
            <React.Fragment>
                <Button
                    className={classes.edit}
                    onClick={this.handleClick}
                    variant="contained"
                >
                    <AddShoppingCart className={classes.buttonIcon} />
                    Add to Cart
                </Button>

                <Dialog open={this.state.open}>
                    <Typography variant="h5">
                        Add to cart?
                    </Typography>
                    <Typography>
                        {'《' + book.bookName + '》'}
                    </Typography>

                    <TextField
                        type="text"
                        label='number'
                        value={this.state.number}
                        onChange={(event) => this.setState({ number: event.target.value })}
                    />
                    <Button onClick={this.handleAddToCartOK}>
                        Yes
                    </Button>
                    <Button onClick={this.handleClose}>
                        No
                    </Button>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddToCart));