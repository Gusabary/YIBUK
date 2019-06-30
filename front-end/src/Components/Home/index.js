import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import BooklistInHome from '../Books/Booklist/BooklistInHome'
import agent from '../../agent'
import Loading from '../Loading';

const styles = theme => ({
});


const mapStateToProps = state => ({
    books: state.books.books,
    isLoading: state.common.isLoading,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch({ type: 'LOAD_MODE', payload: 1 })
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
    }
})

class Books extends React.Component {
    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        const { classes, books } = this.props;
        //Booklist may have three kinds: visit, manage, cart.
        if (this.props.isLoading)
            return (
                <Loading />
            )
        else
            return (
                <React.Fragment>
                    <BooklistInHome books={books} history={this.props.history} />
                </React.Fragment>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));