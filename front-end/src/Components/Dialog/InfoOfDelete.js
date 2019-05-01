import React from 'react'
import { Typography, withStyles, Button, TextField, Dialog, Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { connect } from 'react-redux';

const styles = theme => ({
    list: {
        marginTop: 8,
        marginBottom: -16
    },
    bookName: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class InfoOfDelete extends React.Component {
    render() {
        const { classes } = this.props;
        console.log(this.props.indexesToDelete)
        return (
            <React.Fragment>
                <List className={classes.list}>
                    {this.props.indexesToDelete.map((bookIndex) => (
                        <ListItem>
                            <ListItemText>
                                <Typography>
                                    <span  className={classes.bookName}>《{this.props.books[bookIndex].bookName}》</span> &nbsp; &nbsp; &nbsp; 
                                    {this.props.books[bookIndex].author} &nbsp;
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoOfDelete));