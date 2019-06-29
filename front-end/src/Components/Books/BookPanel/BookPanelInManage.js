import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { connect } from 'react-redux';
import BookTitleInHome from '../BookTitle/BookTitleInHome';
import BookContent from '../BookContent';
import agent from '../../../agent';

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
        const {  classes, index, isExpanded, isToDelete  } = this.props;
        return (
            <React.Fragment>
                <ExpansionPanel
                    className={classes.post}
                    onChange={this.props.handleDeleteToggle}
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={this.handleExpanded} />}
                        className={isExpanded ?
                            (isToDelete ? classes.EDtitle : classes.ENDtitle) :
                            (isToDelete && classes.NEDtitle)}
                    >
                        <BookTitleInHome book={this.state.book} isExpanded={isExpanded} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={isToDelete? classes.Dcontent: classes.NDcontent}>
                        <BookContent book={this.state.book} index={index} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookPanelInManage);