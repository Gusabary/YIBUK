import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { connect } from 'react-redux';
import BookTitleInHome from '../BookTitle/BookTitleInHome';
import BookContent from '../BookContent';

const styles = theme => ({
    post: {
        width: 1050,
        marginLeft: '15%',
    },
    EDtitle: {
        backgroundColor: theme.palette.secondary.main,
    },
    ENDtitle: {
        backgroundColor: theme.palette.primary.main,
    },
    NEDtitle: {
        border: 'solid',
        borderColor: theme.palette.secondary.main,
    },
    Dcontent: {
        border: 'solid',
        borderColor: theme.palette.secondary.main,
    },
    NDcontent: {
        border: 'solid',
        borderColor: theme.palette.primary.main,
    },
});

class BookPanelInManage extends React.Component {
    render() {
        const {  classes, book, index, isExpanded, isToDelete  } = this.props;
        return (
            <React.Fragment>
                <ExpansionPanel
                    className={classes.post}
                    onChange={this.props.handleDeleteToggle}
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={this.props.handleExpanded} />}
                        className={isExpanded ?
                            (isToDelete ? classes.EDtitle : classes.ENDtitle) :
                            (isToDelete && classes.NEDtitle)}
                    >
                        <BookTitleInHome book={book} isExpanded={isExpanded} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={isToDelete? classes.Dcontent: classes.NDcontent}>
                        <BookContent book={book} index={index} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookPanelInManage);