import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../../agent'
import BooklistInHome from '../../Books/Booklist/BooklistInHome'
import BooklistInManage from '../../Books/Booklist/BooklistInManage';
import ControlButtons from './ControlButtons';
import { generateArray, sort, getCopy, filter } from '../../../auxiliary'

const styles = theme => ({

});

const mapStateToProps = state => ({
    identity: state.user.identity,
    books: state.books.books,
    redirectTo: state.common.redirectTo,
    isLoading: state.common.isLoading,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch({ type: 'LOAD_MODE', payload: 2 })
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    },
})

class ManageBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false,
            isToDelete: generateArray(1000,false),
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

    async handleDeleteOK() {
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
        await agent.Books.delete(bookIdOfDeleted);
        this.props.onLoad();
    }

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        const { classes } = this.props;
        if (this.props.isLoading)
            return (
                <h1>Loading...</h1>
            )
        else
        return (
            <React.Fragment>
                <ControlButtons
                    isDeleting={this.state.isDeleting}
                    handleClick={() => this.setState({ isDeleting: !this.state.isDeleting })}
                    handleDeleteOK={this.handleDeleteOK}
                />
                {this.state.isDeleting ?
                    <BooklistInManage
                        books={this.props.books}
                        isToDelete={this.state.isToDelete}
                        handleDeleteToggle={(index) => this.handleDeleteToggle(index)}
                    /> :
                    <BooklistInHome books={this.props.books} />
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageBook));