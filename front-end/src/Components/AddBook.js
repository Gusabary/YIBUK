import React from 'react'
import { Paper, withStyles, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent'

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
    },
    previewButton: {
        marginTop: theme.spacing.unit,
        marginLeft: '79%',
        backgroundColor: theme.palette.primary.light,
    },
    hidden: {
        display: 'none',
    },
    content: {
        width: '96%',
    },
    preview: {
        width: '96%',
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
    },
    save: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        marginLeft: '2%',
        backgroundColor: theme.palette.primary.light,
    },
    cancel: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light,
    },
    info: {
        float: 'left',
        marginLeft: '2%',
    },
    intro: {
        marginLeft: '20%',
    }
});

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    bookInEditing: state.books.bookInEditing,
    books: state.books.books,
    isEditing: state.common.isEditing,
})

const mapDispatchToProps = dispatch => ({
    onSave: () =>
        dispatch({ type: 'MANAGE_OK' }),
    onCancel: () =>
        dispatch({ type: 'MANAGE_CANCEL' }),
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})


class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: '',
            author: '',
            image: '',
            isbn: '',
            storage: '',
            price: '',
            introduction: '',
        }

        this.updateState = this.updateState.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState = field => event => {
        this.setState({
            [field]: event.target.value
        });
    };

    handleImageChange(event) {
        this.setState({
            image: event.target.files[0],
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { bookName, author, image, isbn, storage, price, introduction } = this.state;
        if (this.props.isEditing) {
            const bookId = this.props.books[this.props.bookInEditing].bookId;
            await agent.Books.update(bookId, bookName, author, image, isbn, storage, price, introduction)
            this.props.onSave();
        }
        else {
            await agent.Books.create(bookName, author, image, isbn, storage, price, introduction)
            this.props.onSave();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    componentWillMount() {
        if (this.props.isEditing) {
            this.setState({
                bookName: this.props.books[this.props.bookInEditing].bookName,
                author: this.props.books[this.props.bookInEditing].author,
                //image: this.props.books[this.props.bookInEditing].image,
                isbn: this.props.books[this.props.bookInEditing].isbn,
                storage: this.props.books[this.props.bookInEditing].storage,
                price: this.props.books[this.props.bookInEditing].price,
                introduction: this.props.books[this.props.bookInEditing].introduction,
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={classes.info}>
                            <TextField
                                type="text"
                                label='Book Title'
                                className={classes.title}
                                value={this.state.bookName}
                                onChange={this.updateState('bookName')}
                            />
                            <br />
                            <TextField
                                type="text"
                                label='Author'
                                className={classes.title}
                                value={this.state.author}
                                onChange={this.updateState('author')}
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
                                //value={this.state.image}
                                className={classes.hidden}
                            />
                            <br />
                            <TextField
                                type="text"
                                label='isbn'
                                className={classes.title}
                                value={this.state.isbn}
                                onChange={this.updateState('isbn')}
                            />
                            <br />
                            <TextField
                                type="text"
                                label='storage'
                                className={classes.title}
                                value={this.state.storage}
                                onChange={this.updateState('storage')}
                            />
                            <br />
                            <TextField
                                type="text"
                                label='price'
                                className={classes.title}
                                value={this.state.price}
                                onChange={this.updateState('price')}
                            />
                            <br />
                            <Button
                                variant="contained"
                                className={classes.save}
                                type="submit"
                            >
                                OK
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.cancel}
                                onClick={this.props.onCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div className={classes.intro}>
                            <TextField
                                type="text"
                                label='Introduction'
                                className={classes.content}
                                value={this.state.introduction}
                                onChange={this.updateState('introduction')}
                                multiline
                                rows="18"
                            />
                        </div>
                        <br />
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddBook));