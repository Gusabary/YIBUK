import React from 'react'
import { Typography, withStyles, Button, TextField, Dialog, Divider } from '@material-ui/core'
import { connect } from 'react-redux';

const styles = theme => ({
    title: {
        textAlign: 'center',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    number: {
        float: 'left'
    }
})

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class InfoOfCartAndBuy extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography className={classes.title}>
                    {'《' + this.props.bookName + '》'}
                </Typography>

                <TextField
                    type="text"
                    label='number'
                    value={this.props.number}
                    onChange={this.props.handleNumberChange}
                    className={classes.number}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoOfCartAndBuy));