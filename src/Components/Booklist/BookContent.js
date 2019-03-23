import React from 'react'
import {  withStyles, Typography, Divider } from '@material-ui/core'
import BookInfoList from './BookInfoList'
import ModeButtons from './ModeButtons/index'

const parse = content => {
    const splitedContent = content.split('\n');
    return splitedContent.map(para =>
        <p>{para}</p>
    )
}

const styles = theme => ({
    cover: {
        width: theme.spacing.unit * 45,
        height: theme.spacing.unit * 60,
        marginTop: theme.spacing.unit,

    },
    text: {
        marginLeft: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 2,
        marginRight: 0,
        wordWrap: 'break-word',
    },
});

class BookContent extends React.Component {
    render() {
        const { classes, book, index } = this.props;
        return (
            <React.Fragment>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row", width: 1000, flex: 30 }}>
                        <img src={"images/" + book.coverPath} className={classes.cover} style={{ flex: 36 }} />
                        <div className={classes.text} style={{ flex: 64 }}>
                            <Typography variant='h4'>
                                Book Info.
                            </Typography>
                            <Divider />
                            <BookInfoList book={book} />
                            <ModeButtons book={book} index={index} history={this.props.history} />
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
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookContent);