import React from 'react'
import { ExpansionPanel, withStyles, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore' 
import BookTitle from './BookTitle';
import BookContent from './BookContent';

const styles = theme => ({
    post: {
        width: 1050,
        marginLeft: '15%',
        //border: 'solid',
        //borderColor: theme.palette.primary.main,
    },
    expandedTitle: {
        backgroundColor: theme.palette.primary.main,
    },
    content: {
        borderLeft: 'solid',
        borderBottom: 'solid',
        borderRight: 'solid',
        borderColor: theme.palette.primary.main,
        borderBottomColor: theme.palette.primary.main,
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({

})

class Book extends React.Component {
    render() {
        const { classes, book, index, isExpanded } = this.props;
        return (
            <React.Fragment>
                <ExpansionPanel
                    className={classes.post}
                    onChange={this.props.handleExpanded}
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        className={isExpanded && classes.expandedTitle}
                    >
                        <BookTitle book={book} isExpanded={isExpanded} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.content}>
                        <BookContent book={book} index={index} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Book));