import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../../agent'
import BookPanelInHome from '../BookPanel/BookPanelInHome'
import { generateArray, sort, getCopy, filter } from '../../../auxiliary'

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class BooklistInManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: generateArray(1000,false),
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

    render() {
        const { classes, isToDelete } = this.props;
        if (this.props.books.length === 0)
        return (
            <h1>
                No Books.
            </h1>
        )
        
        return (
            <React.Fragment>
                <div className={classes.padding}></div>
                {this.props.books.map((book, index) =>
                    <BookPanelInHome
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooklistInManage));