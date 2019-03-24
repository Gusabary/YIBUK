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
        this.props.handleBuyToggle(index);
    }

    render() {
        const { classes, isToBuy } = this.props;
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
                        isToBuy={isToBuy[index]}
                        handleBuyToggle={() => this.props.handleBuyToggle(index)}
                        index={index}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooklistCart));