import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Toolbar, Dialog, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import AddToCart from './AddToCart';
import Purchase from './Purchase'
import ListItemText from '@material-ui/core/ListItemText';
import agent from '../../agent'

import BookInfoList from './BookInfoList'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
    post: {
        width: 1050,
        marginLeft: '15%',
    },
    title: {
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
})

class Books extends React.Component {
    constructor(props) {
        super(props);
        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);
        this.state = {
            isExpanded: modelArray,
            purchaseOpen: false,
            addToCartOpen:false,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }
    handleAddToCart() {
        this.setState({
            addToCartOpen: true,
        })
    }
    handlePurchase() {
        console.log(!1);
        this.setState({
            purchaseOpen: true,
        })
    }
    handleClose() {
        this.setState({
            purchaseOpen: false,
            addToCartOpen:false,
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
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
                                className={this.state.isExpanded[index] && classes.title}
                            >
                                {this.state.isExpanded[index] ?
                                    <ListItemText secondary={book.author} className={classes.titleContent} >
                                        <Typography variant='h4'>
                                            {"《" + book.bookName + "》"}
                                        </Typography>
                                    </ListItemText> :
                                    <Typography variant='h6'>
                                        {"《" + book.bookName + "》"}&nbsp; {book.author}
                                    </Typography>
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
                                            <div className={classes.buttons}>
                                                <AddToCart onClick={this.handleAddToCart} />
                                                <Purchase onClick={this.handlePurchase} />
                                            </div>
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

                <Dialog open={this.state.addToCartOpen}>
                    <Typography>
                        Add to cart?
                    </Typography>
                    <Button onClick={this.handleClose}>
                        Yes
                    </Button>
                    <Button onClick={this.handleClose}>
                        No
                    </Button>
                </Dialog>
            

                <Dialog open={this.state.purchaseOpen}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));