import React from 'react'
import { ExpansionPanel, withStyles, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import BookTitle from '../Booklist/BookTitle';
import BookContent from '../Booklist/BookContent';

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

class Book extends React.Component {
    render() {
        const { classes, book, index, isExpanded, isToBuy } = this.props;
        return (
            <React.Fragment>
                <ExpansionPanel
                    className={classes.post}
                    onChange={this.props.handleBuyToggle}
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={this.props.handleExpanded} />}
                        className={isExpanded ?
                            (isToBuy ? classes.EBtitle : classes.ENBtitle) :
                            (isToBuy && classes.NEBtitle)}
                    >
                        <BookTitle book={book} isExpanded={isExpanded} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={isToBuy? classes.Bcontent: classes.NBcontent}>
                        <BookContent book={book} index={index} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Book);