import React from 'react'
import { withStyles, Drawer, TextField, Button } from '@material-ui/core'

const styles = theme => ({
    content: {
        margin: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 1.5
    },
    buttons: {
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 1.5,
        textAlign: 'right'
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light
    },
});

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClickOk = this.handleClickOk.bind(this)
        this.handleClickCancel = this.handleClickCancel.bind(this)
    }

    handleChange(event) {
        this.setState({
            comment: event.target.value
        })
    }

    handleClickOk() {
        this.setState({
            comment: ''
        })
        this.props.handleCommentOk(this.state.comment)
    }

    handleClickCancel() {
        this.setState({
            comment: ''
        })
        this.props.handleClose()
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Drawer anchor="bottom" open={this.props.open}>
                    <TextField
                        type="text"
                        variant="outlined"
                        label='comment'
                        className={classes.content}
                        value={this.state.comment}
                        onChange={this.handleChange}
                        autoFocus
                        multiline
                        rows="12"
                    />
                    <div className={classes.buttons}>
                        <Button className={classes.button} onClick={this.handleClickOk}>
                            OK
                        </Button>
                        <Button className={classes.button} onClick={this.handleClickCancel}>
                            Cancel
                        </Button>
                    </div>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddComment);