import React from 'react'
import { withStyles, Typography, IconButton, TextField } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText';
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import { connect } from 'react-redux';

const styles = theme => ({
    titleContent: {
        marginBottom: -theme.spacing.unit,
        float: 'left'
    },
    unexpanded: {
        marginTop: 12,
    },
    expanded: {
        marginTop: 21,
    },
    expandedNum: {
        paddingTop: 9,
    },
    iconContainer: {
        marginTop: -20,
        marginBottom: -20,
    }
});

const mapStateToProps = state => ({
    cart: state.cart.cart,
    toBuy: state.cart.toBuy
})

const mapDispatchToProps = dispatch => ({
    onQuantityChange: (index, quantity) =>
        dispatch({ type: 'CHANGE_QUANTITY', payload: { index, quantity } })
})

class BookTitleInCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.cart[this.props.index].quantity,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(isAdding) {
        await this.setState({
            quantity: isAdding ? this.state.quantity + 1 : this.state.quantity - 1
        })
        this.props.handleBuyToggle()
        this.props.onQuantityChange(this.props.index, this.state.quantity);
    }

    render() {
        const { classes, book, isExpanded, isToBuy, index } = this.props;
        return (
            <React.Fragment>
                {isExpanded ?
                    <ListItemText secondary={book.author} className={classes.titleContent} >
                        <Typography variant='h4'>
                            {"《" + book.bookName + "》"}
                        </Typography>
                    </ListItemText> :
                    <Typography variant='h6' style={{ flexBasis: '80%' }}>
                        {"《" + book.bookName + "》"}&nbsp; {book.author}
                    </Typography>
                }
                {isToBuy &&
                    <React.Fragment><div className={classes.iconContainer}>
                        <IconButton disableRipple onClick={() => this.handleClick(1)} className={isExpanded?classes.expanded:classes.unexpanded}>
                            <Add />
                        </IconButton></div>
                        <Typography variant='h6' className={isExpanded && classes.expandedNum}>
                            {this.state.quantity}
                        </Typography><div className={classes.iconContainer}>
                        <IconButton disableRipple onClick={() => this.handleClick(0)} className={isExpanded?classes.expanded:classes.unexpanded}>
                            <Remove />
                    </IconButton></div>
                    <div></div>
                    </React.Fragment>}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookTitleInCart));