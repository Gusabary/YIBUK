import React from 'react'
import { withStyles, Button } from '@material-ui/core'
import DialogT from '../Dialog/index'
import agent from '../../agent'
import { connect } from 'react-redux';

const styles = theme => ({

});

const mapStateToProps = state => ({
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    onLoadCart: (userId) => {
        dispatch({ type: 'LOAD_MODE', payload: 3 });
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId) })
    },
})

class ButtonsOfDelete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    }

    async handleDeleteConfirm() {
        let bookIdOfDelete = [];
        this.props.bookIndexesSelected.forEach(bookIndex => {
            bookIdOfDelete.push(this.props.books[bookIndex].bookId)
        })
        await agent.Cart.delete(this.props.userId, bookIdOfDelete);
        this.props.onLoadCart(this.props.userId);
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
                        onClick={() => this.props.handleStatusChange(2)}
                    >
                        Delete
                    </Button>
                )}
                {this.props.status === 2 && (
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
                    type={"delete"}
                    handleOK={this.handleDeleteConfirm}
                    handleClose={() => this.setState({ open: false })}
                    books={this.props.books}
                    indexesToDelete={this.props.bookIndexesSelected}
                />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonsOfDelete));