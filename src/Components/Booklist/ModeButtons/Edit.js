import React from 'react'
import { withStyles, Button } from '@material-ui/core'
import Create from '@material-ui/icons/Create'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
    redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = dispatch => ({
    onEdit: (index) => {
        dispatch({ type: "EDIT_START", payload: { index } })
    },
})

class Edit extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        const { classes, index } = this.props;
        return (
            <React.Fragment>
                <Link to="AddBook">
                    <Button
                        className={classes.edit}
                        onClick={() => this.props.onEdit(index)}
                        variant="contained"
                    >
                        <Create className={classes.buttonIcon} />
                        Edit
                    </Button>
                </Link>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Edit));