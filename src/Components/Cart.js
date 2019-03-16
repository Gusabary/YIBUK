import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Radio, Dialog, Divider, Checkbox } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import agent from '../agent'
import BookInfoList from './Books/BookInfoList'

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
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    onBuy: (userId, bookIdOfBuy) => {
        agent.Cart.buy(userId, bookIdOfBuy);
        //dispatch({ type: "BUY_BOOKS", payload: { indexOfBuy } });
    },
    onEdit: (index) => {
        dispatch({ type: "EDIT_START", payload: { index } })
    }
})

class Cart extends React.Component {
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
            isToBuy: modelArray2,
            isBuying: false,
            open: false,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleClickBuy = this.handleClickBuy.bind(this);
        this.handleBuyOK = this.handleBuyOK.bind(this);
        this.handleBuyCancel = this.handleBuyCancel.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }

    handleBuy(index) {
        this.handleExpanded(index);
        const isToBuy = this.state.isToBuy
        this.setState({
            isToBuy: isToBuy.fill(!isToBuy[index], index, index + 1),
        })
    }

    handleClickBuy() {
        this.setState({
            isBuying: true,
        })
    }

    handleBuyOK() {
        this.setState({
            isBuying: false,
        });

        let bookIdOfBuy = [];
        this.state.isToBuy.forEach((element, index) => {
            if (element) {
                this.setState({
                    isExpanded: this.state.isExpanded.fill(false, index, index + 1),
                    isToBuy: this.state.isToBuy.fill(false, index, index + 1),
                })
                bookIdOfBuy.push(this.props.books[index].bookId);
            }
        });
        this.props.onBuy(this.props.userId, bookIdOfBuy);
    }

    handleBuyCancel() {
        this.setState({
            isBuying: false,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.isBuying ?
                    <h3>is buying...</h3> :
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickBuy}
                    >
                        Buy
                    </Button>
                }
                {this.state.isBuying && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleBuyOK}
                        >
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleBuyCancel}
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
                                className={this.state.isExpanded[index] ? classes.title1 : (this.state.isBuying && classes.title2)}
                            >
                                {this.state.isExpanded[index] ?
                                    <ListItemText secondary={book.author} className={classes.titleContent} >
                                        <Typography variant='h4'>
                                            {"《" + book.bookName + "》"}
                                        </Typography>
                                    </ListItemText> :
                                    <ListItemText>
                                        <Typography variant='h6' className={this.state.isBuying && classes.q1}>
                                            《{book.bookName}》&nbsp; {book.author}
                                        </Typography>
                                    </ListItemText>
                                }
                                {this.state.isBuying &&
                                    <Checkbox
                                        checked={this.state.isToBuy[index]}
                                        onChange={() => this.handleBuy(index)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));