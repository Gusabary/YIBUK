import React from 'react'
import { Typography, withStyles, Button, TextField } from '@material-ui/core'
import Create from '@material-ui/icons/Create'
import { connect } from 'react-redux';
import agent from '../../../agent'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import DialogT from '../../Dialog/index'

const styles = theme => ({
    edit: {
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: "#f4ff81",
        color: "#0277bd",
        border: 'solid',
        textDecoration: 'underline',
        height: 70,
        width: 210,
    },
    text: {
        color: "#0277bd",
    },
    buttonIcon: {
        marginLeft: -theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

const mapStateToProps = state => ({
    userId: state.user.userId,
    identity: state.user.identity,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    onLoad: (userId, token) => {
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId, token) })
    },
})

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            number: 1,
        }

        this.handleAddToCartOK = this.handleAddToCartOK.bind(this);
    }

    async handleAddToCartOK() {
        await agent.Cart.add(this.props.userId, this.props.book.bookId, this.state.number, this.props.token);
        this.props.onLoad(this.props.userId, this.props.token);
    }

    render() {
        const { classes, book } = this.props;
        return (
            <React.Fragment>
                <Button
                    className={classes.edit}
                    onClick={() => this.setState({ open: true })}
                    variant="contained"
                >
                    <AddShoppingCart className={classes.buttonIcon} />
                    <Typography variant='h6' className={classes.text}>
                        Add to Cart
                    </Typography>
                </Button>

                <DialogT
                    open={this.state.open}
                    type={"cart"}
                    handleOK={this.handleAddToCartOK}
                    handleClose={() => this.setState({ open: false, number: 1 })}
                    bookName={book.bookName}
                    number={this.state.number}
                    handleNumberChange={event => this.setState({ number: event.target.value })}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddToCart));