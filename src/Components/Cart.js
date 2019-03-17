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
    books: state.books.books,
    cart: state.cart.cart,
    isLoading: state.common.isLoading,
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    onLoad: (userId) => {
        dispatch({ type: "LOAD_CART", payload: agent.Cart.show(userId) })
    }
})

class Cart extends React.Component {
    constructor(props) {
        super(props);
        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);
        console.log(this.props.cart)
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
        console.log(bookIndexes);
        this.state = {
            isExpanded: modelArray,
            bookIndexes: bookIndexes,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
    }

    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }

    componentWillMount() {
        console.log(this.props.userId)
        this.props.onLoad(this.props.userId);
    }

    render() {
        const { classes } = this.props;
        /*if (this.props.isLoading)
            return (
                <div></div>
            )*/
        return (
            <React.Fragment>
                <Link to="Purchase">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickBuy}
                    >
                        Buy
                    </Button>
                </Link>
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
                                className={this.state.isExpanded[index] && classes.title1}
                            >
                                {this.state.isExpanded[index] ?
                                    <ListItemText secondary={this.props.books[bookIndex].author} className={classes.titleContent} >
                                        <Typography variant='h4'>
                                            {"《" + this.props.books[bookIndex].bookName + "》"}
                                        </Typography>
                                    </ListItemText> :
                                    <ListItemText>
                                        <Typography variant='h6'>
                                            《{this.props.books[bookIndex].bookName}》&nbsp; {this.props.books[bookIndex].author}
                                        </Typography>
                                    </ListItemText>
                                }
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
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));