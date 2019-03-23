import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import Booklist from '../Booklist/index'
import agent from '../../agent'

const styles = theme => ({
});


const mapStateToProps = state => ({
    books: state.books.books,
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
        return (
            <React.Fragment>
                <Booklist books={books} history={this.props.history} />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));