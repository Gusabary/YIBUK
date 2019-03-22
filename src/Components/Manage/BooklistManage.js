import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import Book from './Book'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
});

const mapStateToProps = state => ({
    identity: state.user.identity,
    //books: state.books.books,
    userId: state.user.userId,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() }),
})

class BooklistManage extends React.Component {
    constructor(props) {
        super(props);
        let modelArray = [];
        modelArray[0] = false;
        modelArray[1000] = false;
        modelArray.fill(false, 0, 1000);
        this.state = {
            isExpanded: modelArray,
        }
        this.handleExpanded = this.handleExpanded.bind(this);
    }
    handleExpanded(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
        this.props.handleDeleteToggle(index);
    }

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        const { classes, isToDelete } = this.props;
        if (this.props.books.length === 0)
        return (
            <h1>
                Loading...
            </h1>
        )
        
        return (
            <React.Fragment>
                <div className={classes.padding}></div>
                {this.props.books.map((book, index) =>
                    <Book
                        book={book}
                        isExpanded={this.state.isExpanded[index]}
                        handleExpanded={() => this.handleExpanded(index)}
                        isToDelete={isToDelete[index]}
                        handleDeleteToggle={()=>this.props.handleDeleteToggle(index)}
                        index={index}
                        history={this.props.history}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooklistManage));