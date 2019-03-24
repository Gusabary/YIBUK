import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import BookToBuy from './Book'
import BookToDelete from '../Manage/Book'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class BooklistCart extends React.Component {
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
        this.props.handleToggle(index);
    }

    render() {
        const { classes, isToBuy, isToDelete, isBuying } = this.props;
        if (this.props.books.length === 0)
            return (
                <h1>
                    Loading...
            </h1>
            )

        return (
            <React.Fragment>
                <div className={classes.padding}></div>
                {isBuying ?
                    (this.props.books.map((book, index) =>
                        <BookToBuy
                            book={book}
                            isExpanded={this.state.isExpanded[index]}
                            handleExpanded={() => this.handleExpanded(index)}
                            isToBuy={isToBuy[index]}
                            handleBuyToggle={() => this.props.handleToggle(index)}
                            index={index}
                        />
                    )) :
                    (this.props.books.map((book, index) =>
                        <BookToDelete
                            book={book}
                            isExpanded={this.state.isExpanded[index]}
                            handleExpanded={() => this.handleExpanded(index)}
                            isToDelete={isToDelete[index]}
                            handleDeleteToggle={() => this.props.handleToggle(index)}
                            index={index}
                        />
                    ))
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooklistCart));