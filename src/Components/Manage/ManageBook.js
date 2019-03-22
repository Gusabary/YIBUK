import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Radio, Dialog, Divider, Checkbox } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import agent from '../../agent'
import BookInfoList from '../Booklist/BookInfoList'
import Booklist from '../Booklist/index'
import BooklistManage from './BooklistManage';
import ControlManage from './ControlManage';

const styles = theme => ({

});

const mapStateToProps = state => ({
    identity: state.user.identity,
    books: state.books.books,
    redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = dispatch => ({
    onDelete: async (bookIdOfDeleted) => {
        console.log(bookIdOfDeleted)
        await agent.Books.delete(bookIdOfDeleted);
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    },
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})

class ManageBook extends React.Component {
    constructor(props) {
        super(props);

        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);

        this.state = {
            isDeleting: false,
            isToDelete: modelArray,
        }
        this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
        this.handleDeleteOK = this.handleDeleteOK.bind(this);
    }

    handleDeleteToggle(index) {
        const isToDelete = this.state.isToDelete
        this.setState({
            isToDelete: isToDelete.fill(!isToDelete[index], index, index + 1),
        })
    }

    handleDeleteOK() {
        this.setState({
            isDeleting: false,
        });

        let bookIdOfDeleted = [];
        this.state.isToDelete.forEach((element, index) => {
            if (element) {
                this.setState({
                    isToDelete: this.state.isToDelete.fill(false, index, index + 1),
                })
                bookIdOfDeleted.push(this.props.books[index].bookId);
            }
        });
        this.props.onDelete(bookIdOfDeleted);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ControlManage
                    isDeleting={this.state.isDeleting}
                    handleClick={() => this.setState({ isDeleting: !this.state.isDeleting })}
                    handleDeleteOK={this.handleDeleteOK}
                />
                {this.state.isDeleting ?
                    <BooklistManage
                        books={this.props.books}
                        isToDelete={this.state.isToDelete}
                        handleDeleteToggle={(index) => this.handleDeleteToggle(index)}
                    /> :
                    <Booklist books={this.props.books} />
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageBook));