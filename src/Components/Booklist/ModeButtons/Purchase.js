import React from 'react'
import { Typography, withStyles, Button,Dialog,TextField } from '@material-ui/core'
import Create from '@material-ui/icons/Create'
import { connect } from 'react-redux';
import agent from '../../../agent'

const styles = theme => ({
    edit: {
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: "#f4ff81",
        color: "#0277bd",
        border: 'solid',
        textDecoration: 'underline',
    },
    buttonIcon: {
        marginLeft: -theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

const mapStateToProps = state => ({
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() }),
})

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            number: 1
        }
        this.handlePurchaseOK = this.handlePurchaseOK.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handlePurchaseOK() {
        if (this.props.book.storage < this.state.number) {
            alert('Storage is not enough!');
            return;
        }
        await agent.Orders.buy(this.props.userId, this.props.book.bookId, this.state.number);
        this.props.onLoad();
        this.handleClose();
    }

    handleClose() {
        this.setState({
            open: false,
            number: 1
        })
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
                    <Create className={classes.buttonIcon} />
                    Purchase
                </Button>

                <Dialog open={this.state.open}>
                    <Typography variant="h5">
                        Purchase it?
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
                    <Button onClick={this.handlePurchaseOK}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Purchase));