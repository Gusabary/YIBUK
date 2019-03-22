import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import Booklist from '../Booklist/index'

const styles = theme => ({
});


const mapStateToProps = state => ({
    books: state.books.books,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: 'LOAD_MODE_1' }),
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