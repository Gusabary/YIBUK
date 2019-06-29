import React from 'react'
import { withStyles, Typography, Divider, Paper } from '@material-ui/core'
import BookInfoList from './BookInfoList'
import ModeButtons from './ModeButtons/index'

const parseIntroduction = content => {
    const splitedContent = content.split('\n');
    return splitedContent.map(para =>
        <p>{para}</p>
    )
}

const CommentStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "purple",
    marginTop: 10,
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
}

const parseComments = comments => {
    if (comments == null)
        return null
    return comments.map(comment =>
        <Paper style={CommentStyle}>
            <Typography variant="h6">
                #{comment.userId} &nbsp;
                {parseTime(comment.time)}
            </Typography>
            <Typography variant="body1">
                {comment.content}
            </Typography>
            {parseComments(comment.followup)}
        </Paper>
    )
}

const parseTime = time => {
    let parsedTime = time.substr(0, 9);
    parsedTime = parsedTime.concat(" ");
    parsedTime = parsedTime.concat(time.substr(11, 8));
    return parsedTime;
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
        if (!book.hasOwnProperty("isbn"))
            return <div>loading</div>
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
                        {parseIntroduction(book.introduction)}
                    </div>

                    <div style={{ flex: 1, marginTop: 30, width: 1000 }}>
                        <Typography variant='h4'>
                            Comments
                        </Typography>
                        <Divider />
                        <br />
                        {parseComments(book.comments)||"No comments yet."}
                    </div>
                </div>
                <br />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BookContent);