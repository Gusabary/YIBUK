import React from 'react'
import { Paper, withStyles, TextField, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent';

const styles = theme => ({
    root: {
        width: '82%',
        marginLeft: '9%',
        marginTop: theme.spacing.unit * 3,
    },
    title: {
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
    },
    imageButton: {
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
        backgroundColor: theme.palette.primary.light,
    },
    image: {
        width: theme.spacing.unit * 30,
        //height: theme.spacing.unit*10,
    },
    previewButton: {
        marginTop: theme.spacing.unit,
        //position: 'absolute',
        marginLeft: '79%',
        backgroundColor: theme.palette.primary.light,
    },
    hidden: {
        display: 'none',
    },
    content: {
        width: '96%',
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
    },
    preview: {
        width: '96%',
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
        //height: theme.spacing.unit * 37,
    },
    save: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        marginLeft: '2%',
        backgroundColor: theme.palette.primary.light,
    },
});

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (bookName,image) => {
            dispatch({ type: 'ADD_BOOK', payload: agent.Books.create(bookName,image) })
    },
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})


class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: '',
            image: '',
        }

        this.handlebookNameChange = this.handlebookNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlebookNameChange(event) {
        this.setState({
            bookName: event.target.value,
        })
    }

    handleImageChange(event) {
        this.setState({
            image: event.target.files[0],
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { bookName, image } = this.state;
        this.props.onSubmit(bookName,image);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            type="text"
                            label='Book Name'
                            className={classes.title}
                            value={this.state.bookName}
                            onChange={this.handlebookNameChange}
                        />
                        <br />
                        <Button
                            variant="contained"
                            className={classes.imageButton}
                            onClick={() => this.imagePicker.click()}
                        >
                            Pick Cover
                        </Button>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            ref={ref => this.imagePicker = ref}
                            onChange={this.handleImageChange}
                            className={classes.hidden}
                        />
                        <br />
                        <Button
                            variant="contained"
                            className={classes.save}
                            type="submit"
                        >
                            Add Book
                        </Button>
                        <br />
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Manage));