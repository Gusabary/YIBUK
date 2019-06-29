import React from 'react'
import { withStyles, Typography, Divider, Paper, IconButton } from '@material-ui/core'
import BookInfoList from './BookInfoList'
import ModeButtons from './ModeButtons/index'
import Add from '@material-ui/icons/Add'
import agent from '../../agent';
import { connect } from 'react-redux';
import AddComment from './AddComment';

const parseText = content => {
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

const mapStateToProps = state => ({
    userId: state.user.userId,
    token: state.user.token
})

class BookContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentOpen: false,
            commentIndexes: [],
        }
        this.parseComments = this.parseComments.bind(this)
        this.handleClickComment = this.handleClickComment.bind(this)
        this.handleCommentOk = this.handleCommentOk.bind(this)
        this.handleCommentClose = this.handleCommentClose.bind(this)
    }

    handleClickComment(indexes) {
        console.log(indexes)
        this.setState({
            commentOpen: true,
            commentIndexes: indexes
        })
    }

    async handleCommentOk(comment) {
        await agent.Books.postComment(this.props.book.bookId, this.state.commentIndexes, this.props.userId, comment, this.props.token)
        this.handleCommentClose();
        this.props.updateBook();
        console.log(this.props.book)
    }

    handleCommentClose() {
        this.setState({
            commentOpen: false
        })
    }

    parseComments(comments, indexes) {
        if (comments == null)
            return null;
        const cntIndexes = indexes;
        return comments.map((comment, index) =>
            <Paper style={CommentStyle}>
                <Typography variant="h6" style={{ float: 'left' }}>
                    #{comment.userId} &nbsp;
                    {parseTime(comment.time)}
                </Typography>
                <IconButton style={{ position: 'relative', bottom: 6 }} onClick={() => this.handleClickComment(cntIndexes.concat(index))}>
                    <Add fontSize="small" />
                </IconButton>
                <Divider />
                <Typography variant="body1" style={{ clear: 'both' }}>
                    {parseText(comment.content)}
                </Typography>
                {this.parseComments(comment.followup, cntIndexes.concat(index))}
            </Paper>
        )
    }

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
                        {parseText(book.introduction)}
                    </div>

                    <div style={{ flex: 1, marginTop: 30, width: 1000 }}>
                        <Typography variant='h4' style={{ flexBasis: '80%', float: 'left' }}>
                            Comments
                        </Typography>
                        <IconButton onClick={() => this.handleClickComment([])}>
                            <Add />
                        </IconButton>
                        <Divider />
                        <br />
                        {this.parseComments(book.comments, []) || "No comments yet."}
                    </div>
                </div>
                <br />
                <AddComment
                    open={this.state.commentOpen}
                    handleCommentOk={this.handleCommentOk}
                    handleClose={this.handleCommentClose}
                />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BookContent));