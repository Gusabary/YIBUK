import React from 'react'
import { ExpansionPanel, withStyles, ExpansionPanelSummary, ExpansionPanelDetails, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore' 
import BookTitleInHome from '../BookTitle/BookTitleInHome';
import BookContent from '../BookContent';
import agent from '../../../agent';

const styles = theme => ({
    post: {
        width: 1050,
        marginLeft: '15%',
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

class BookPanelInHome extends React.Component {
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
        const { classes, index, isExpanded } = this.props;
        return (
            <React.Fragment>
                <ExpansionPanel
                    className={classes.post}
                    onChange={this.handleExpanded}
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        className={isExpanded && classes.expandedTitle}
                    >
                        <BookTitleInHome book={this.state.book} isExpanded={isExpanded} />
                        
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.content}>
                        <BookContent book={this.state.book} index={index} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookPanelInHome);