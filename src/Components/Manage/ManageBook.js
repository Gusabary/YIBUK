import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Radio, Dialog, Divider, Checkbox } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import agent from '../../agent'

import BookInfoList from '../Books/BookInfoList'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
    post: {
        width: 1050,
        marginLeft: '15%',
    },
    title1: {
        backgroundColor: theme.palette.primary.main,
    },
    titleContent: {
        marginBottom: -theme.spacing.unit,
    },
    buttons: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 5,
        float: 'left',
    },

    cover: {
        width: theme.spacing.unit * 45,
        height: theme.spacing.unit * 60,
        marginTop: theme.spacing.unit,

    },
    content: {
        borderLeft: 'solid',
        borderBottom: 'solid',
        borderRight: 'solid',
        borderColor: theme.palette.primary.main,
        borderBottomColor: theme.palette.primary.main,
    },
    text: {
        marginLeft: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 2,
        marginRight: 0,
        wordWrap: 'break-word',
    },
    icon: {
        marginLeft: theme.spacing.unit * 5,
    },
    q1: {
        position: "relative",
        top: 5,
    },
    title2: {
        marginTop: -10,
        //marginBottom: -10,
    }
});

const parse = content => {
    const splitedContent = content.split('\n');
    return splitedContent.map(para =>
        <p>{para}</p>
    )
}

const mapStateToProps = state => ({
    identity: state.user.identity,
    books: state.books.books,
})

const mapDispatchToProps = dispatch => ({
    onDelete: (indexOfDeleted, bookIdOfDeleted) => {
        agent.Books.delete(bookIdOfDeleted);
        dispatch({ type: "DELETE_BOOKS", payload: { indexOfDeleted } });
    }
})

class ManageBook extends React.Component {
    constructor(props) {
        super(props);
        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);
        let modelArray2 = [];
        modelArray2[0] = false;
        modelArray2[1000] = false;
        modelArray2.fill(false, 0, 1000);
        this.state = {
            isExpanded: modelArray,
            isToDelete: modelArray2,
            isDeleting: false,
            open: false,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleDeleteOK = this.handleDeleteOK.bind(this);
        this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }

    handleDelete(index) {
        this.handleExpanded(index);
        const isToDelete = this.state.isToDelete
        this.setState({
            isToDelete: isToDelete.fill(!isToDelete[index], index, index + 1),
        })
    }

    handleClickDelete() {
        this.setState({
            isDeleting: true,
        })
    }

    handleDeleteOK() {
        this.setState({
            isDeleting: false,
        });

        let indexOfDeleted = [];
        let bookIdOfDeleted = [];
        this.state.isToDelete.forEach((element, index) => {
            if (element) {
                this.setState({
                    isExpanded: this.state.isExpanded.fill(false, index, index + 1),
                    isToDelete: this.state.isToDelete.fill(false, index, index + 1),
                })
                indexOfDeleted.push(index);
                bookIdOfDeleted.push(this.props.books[index].bookId);
            }
        });
        this.props.onDelete(indexOfDeleted, bookIdOfDeleted);
    }

    handleDeleteCancel() {
        this.setState({
            isDeleting: false,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.isDeleting ?
                    <h3>is deleting...</h3> :
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickDelete}
                    >
                        Delete
                    </Button>
                }
                {this.state.isDeleting && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleDeleteOK}
                        >
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleDeleteCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
                <div className={classes.padding}></div>
                {
                    this.props.books.map((book, index) =>
                        <ExpansionPanel
                            className={classes.post}
                            onChange={() => this.handleExpanded(index)}
                            expanded={this.state.isExpanded[index]}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={this.state.isExpanded[index] ? classes.title1 : (this.state.isDeleting && classes.title2)}
                            >
                                {this.state.isExpanded[index] ?
                                    <ListItemText secondary={book.author} className={classes.titleContent} >
                                        <Typography variant='h4'>
                                            {"《" + book.bookName + "》"}
                                        </Typography>
                                    </ListItemText> :
                                    <ListItemText>
                                        <Typography variant='h6' className={this.state.isDeleting && classes.q1}>
                                            《{book.bookName}》&nbsp; {book.author}
                                        </Typography>
                                    </ListItemText>
                                }
                                {this.state.isDeleting &&
                                    <Checkbox
                                        checked={this.state.isToDelete[index]}
                                        onChange={() => this.handleDelete(index)}
                                    />
                                }
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.content}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex", flexDirection: "row", width: 1000, flex: 30 }}>
                                        <img src={"images/" + book.coverPath} className={classes.cover} style={{ flex: 36 }} />

                                        <div className={classes.text} style={{ flex: 64 }}>
                                            <Typography variant='h4'>
                                                Book Info.
                                        </Typography>
                                            <Divider />
                                            <BookInfoList book={book} />
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, marginTop: 30, width: 1000 }}>
                                        <Typography variant='h4'>
                                            Book Introduction
                                    </Typography>
                                        <Divider />
                                        <br />
                                        {parse(book.introduction)}
                                    </div>
                                </div>
                                <br />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                }

                <Dialog open={this.state.open}>
                    <Typography>
                        Purchase it?
                    </Typography>
                    <Button onClick={this.handleClose}>
                        Yes
                    </Button>
                    <Button onClick={this.handleClose}>
                        No
                    </Button>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageBook));