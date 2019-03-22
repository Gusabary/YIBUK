import React from 'react'
import {  withStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    titleContent: {
        marginBottom: -theme.spacing.unit,
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({

})

class BookTitle extends React.Component {
    render() {
        const { classes, book, isExpanded } = this.props;
        return (
            <React.Fragment>
                {isExpanded ?
                    <ListItemText secondary={book.author} className={classes.titleContent} >
                        <Typography variant='h4'>
                            {"《" + book.bookName + "》"}
                        </Typography>
                    </ListItemText> :
                    <Typography variant='h6'>
                        {"《" + book.bookName + "》"}&nbsp; {book.author}
                    </Typography>
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookTitle));