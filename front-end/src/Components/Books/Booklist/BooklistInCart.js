import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../../agent'
import BookPanelInCart from '../BookPanel/BookPanelInCart'
import BookPanelInManage from '../BookPanel/BookPanelInManage'
import { generateArray } from '../../../auxiliary'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class BooklistInCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: generateArray(1000, false),
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
                    No books.
                </h1>
            )

        return (
            <React.Fragment>
                <div className={classes.padding}></div>
                {isBuying ?
                    (this.props.books.map((book, index) =>
                        <BookPanelInCart
                            book={book}
                            isExpanded={this.state.isExpanded[index]}
                            handleExpanded={() => this.handleExpanded(index)}
                            isToBuy={isToBuy[index]}
                            handleBuyToggle={() => this.props.handleToggle(index)}
                            index={index}
                        />
                    )) :
                    (this.props.books.map((book, index) =>
                        <BookPanelInManage
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooklistInCart));