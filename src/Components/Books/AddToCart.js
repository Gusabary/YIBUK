import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Toolbar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Create from '@material-ui/icons/Create'
import Delete from '@material-ui/icons/Delete'
import PermIdentiy from '@material-ui/icons/PermIdentity';
import { Link } from 'react-router-dom'

const styles = theme => ({
    edit: {
        marginLeft: theme.spacing.unit * 2,
        color: theme.palette.secondary.main,
        border: 'solid',
        textDecoration: 'underline',
    },
    buttonIcon: {
        marginLeft: -theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
})

class AddToCart extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Button
                className={classes.edit}
                //onClick={() => this.props.onClickEdit(post._id, index)}
                variant="outlined"
            >
                <Create className={classes.buttonIcon} />
                Add to Cart
            </Button>
        )
    }
}

export default (withStyles(styles)(AddToCart));