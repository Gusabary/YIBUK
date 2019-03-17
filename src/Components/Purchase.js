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
    cart: state.cart.cart,
    userId: state.user.userId,
    redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = dispatch => ({
    onBuy: async (userId, bookIdOfBuy) => {
        await agent.Cart.buy(userId, bookIdOfBuy);
        dispatch({ type: 'LOAD_BOOKS_AFTER_BUY', payload: agent.Books.show() })
    },
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})

class Purchase extends React.Component {
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

        let bookIndexes = [];
        let k = 0;
        this.props.books.forEach((book, index) => {
            if (k >= this.props.cart.length)
                return;
            if (book.bookId === this.props.cart[k].bookId) {
                bookIndexes.push(index);
                k++;
            }
        })

        this.state = {
            isExpanded: modelArray,
            isToBuy: modelArray2,
            open: false,
            bookIndexes: bookIndexes,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleBuyOK = this.handleBuyOK.bind(this);
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

    handleBuyOK() {
        let bookIdOfBuy = [];
        this.state.isToBuy.forEach((element, index) => {
            if (element) {
                this.setState({
                    isExpanded: this.state.isExpanded.fill(false, index, index + 1),
                    isToBuy: this.state.isToBuy.fill(false, index, index + 1),
                })
                bookIdOfBuy.push(this.props.books[this.state.bookIndexes[index]].bookId);
            }
        });
        this.props.onBuy(this.props.userId, bookIdOfBuy);
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

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBuyOK}
                    >
                        OK
                    </Button>
                    <Link to="Cart">
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Cancel
                        </Button>
                    </Link>
                </div>

                <div className={classes.padding}></div>
                {
                    this.state.bookIndexes.map((bookIndex, index) =>
                        <ExpansionPanel
                            className={classes.post}
                            onChange={() => this.handleExpanded(index)}
                            expanded={this.state.isExpanded[index]}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={this.state.isExpanded[index] ? classes.title1 : classes.title2}
                            >
                                {this.state.isExpanded[index] ?
                                    <ListItemText secondary={this.props.books[bookIndex].author} className={classes.titleContent} >
                                        <Typography variant='h4'>
                                            {"《" + this.props.books[bookIndex].bookName + "》"}
                                        </Typography>
                                    </ListItemText> :
                                    <ListItemText>
                                        <Typography variant='h6' className={classes.q1}>
                                            《{this.props.books[bookIndex].bookName}》&nbsp; {this.props.books[bookIndex].author}
                                        </Typography>
                                    </ListItemText>
                                }

                                <Checkbox
                                    checked={this.state.isToBuy[index]}
                                    onChange={() => this.handleBuy(index)}
                                />

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.content}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex", flexDirection: "row", width: 1000, flex: 30 }}>
                                        <img src={"images/" + this.props.books[bookIndex].coverPath} className={classes.cover} style={{ flex: 36 }} />

                                        <div className={classes.text} style={{ flex: 64 }}>
                                            <Typography variant='h4'>
                                                Book Info.
                                            </Typography>
                                            <Divider />
                                            <BookInfoList book={this.props.books[bookIndex]} />

                                        </div>
                                    </div>
                                    <div style={{ flex: 1, marginTop: 30, width: 1000 }}>
                                        <Typography variant='h4'>
                                            Book Introduction
                                        </Typography>
                                        <Divider />
                                        <br />
                                        {parse(this.props.books[bookIndex].introduction)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Purchase));