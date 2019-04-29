import React from 'react'
import { Typography, withStyles, Button, TextField, Dialog, Divider } from '@material-ui/core'
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2.5,
        paddingRight: theme.spacing.unit * 2,
        border: 'solid',
        borderColor: theme.palette.primary.main,
    },
    hint: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 0.5,
    },
    title: {
        textAlign: 'center',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    button: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
    }
})

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class MyDialog extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Dialog open={this.props.open}>
                    <div className={classes.root}>
                        <Typography variant="h5" className={classes.hint}>
                            {this.props.isPurchase ? "Purchase it?" : "Add to cart?"}
                        </Typography>
                        <Divider />
                        <Typography className={classes.title}>
                            {'《' + this.props.bookName + '》'}
                        </Typography>

                        <TextField
                            type="text"
                            label='number'
                            value={this.props.number}
                            onChange={(event) => this.setState({ number: event.target.value })}
                        />
                        <Button onClick={this.props.handleOK} className={classes.button} >
                            Yes
                        </Button>
                        <Button onClick={this.props.handleClose} className={classes.button} >
                            No
                        </Button>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyDialog));