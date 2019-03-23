import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
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
    onLoad: () => {
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    },
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