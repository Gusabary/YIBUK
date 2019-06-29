import React from 'react'
import { ExpansionPanel, withStyles, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import BookTitleInCart from '../BookTitle/BookTitleInCart';
import BookContent from '../BookContent';
import agent from '../../../agent';

const styles = theme => ({
    post: {
        width: 1050,
        marginLeft: '15%',
    },
    EBtitle: {
        backgroundColor: theme.palette.secondary.main,
    },
    ENBtitle: {
        backgroundColor: theme.palette.primary.main,
    },
    NEBtitle: {
        border: 'solid',
        borderColor: theme.palette.secondary.main,
    },
    Bcontent: {
        border: 'solid',
        borderColor: theme.palette.secondary.main,
    },
    NBcontent: {
        border: 'solid',
        borderColor: theme.palette.primary.main,
    },
});

class BookPanelInCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book
        }
        this.handleExpanded = this.handleExpanded.bind(this);
    }

    async handleExpanded() {
        this.props.handleExpanded();
        this.setState({
            book: await agent.Books.showById(this.state.book.bookId)
        })
    }

    render() {
        const { classes, index, isExpanded, isToBuy } = this.props;
        return (
            <React.Fragment>
                <ExpansionPanel
                    className={classes.post}
                    onChange={this.props.handleBuyToggle}
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={this.handleExpanded} />}
                        className={isExpanded ?
                            (isToBuy ? classes.EBtitle : classes.ENBtitle) :
                            (isToBuy && classes.NEBtitle)}
                    >
                        <BookTitleInCart
                            book={this.state.book}
                            isExpanded={isExpanded}
                            handleBuyToggle={this.props.handleBuyToggle}
                            isToBuy={isToBuy}
                            index={index}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={isToBuy? classes.Bcontent: classes.NBcontent}>
                        <BookContent book={this.state.book} index={index} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookPanelInCart);