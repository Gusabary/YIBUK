import React from 'react'
import { Typography, withStyles, Button, TextField, Dialog, Divider } from '@material-ui/core'
import { connect } from 'react-redux';
import InfoOfCartAndBuy from './InfoOfCartAndBuy';
import InfoOfDelete from './InfoOfDelete'
import InfoOfOrder from './InfoOfOrder';

const getHint = type => {
    switch (type) {
        case 'cart':
            return "Add to cart?"
        case 'purchase':
            return "Purchase it?"
        case 'delete':
            return "Sure to delete?"
        case 'order':
            return "Sure to buy?"
        case 'default':
            return "Dialog"
    }
}

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2.5,
        paddingRight: theme.spacing.unit * 2.5,
        border: 'solid',
        borderColor: theme.palette.primary.main,
    },
    hint: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 0.5,
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
    },
    buttons: {
        float: 'right',
        position: 'relative',
        left: 8
    },
})

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class DialogT extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
    render() {
        const { classes } = this.props;
        console.log(this.props.type)
        return (
            <React.Fragment>
                <Dialog open={this.props.open} fullWidth={this.props.type === 'order'} maxWidth="md">
                    <div className={classes.root}>
                        <Typography variant="h5" className={classes.hint}>
                            {getHint(this.props.type)}
                        </Typography>
                        <Divider />

                        {(this.props.type === 'cart' || this.props.type === 'purchase') && (
                            <InfoOfCartAndBuy
                                bookName={this.props.bookName}
                                number={this.props.number}
                                handleNumberChange={this.props.handleNumberChange}
                            />
                        )}
                        {this.props.type === 'delete' && (
                            <InfoOfDelete
                                books={this.props.books}
                                indexesToDelete={this.props.indexesToDelete}
                            />
                        )}
                        {this.props.type === 'order' && (
                            <InfoOfOrder
                                books={this.props.books}
                                indexesToBuy={this.props.indexesToBuy}
                            />
                        )}

                        <div className={classes.buttons}>
                            <Button onClick={() => { this.props.handleOK(); this.props.handleClose(); }} className={classes.button} >
                                Yes
                            </Button>
                            <Button onClick={this.props.handleClose} className={classes.button} >
                                No
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogT));