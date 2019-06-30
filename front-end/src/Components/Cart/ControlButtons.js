import React from 'react'
import { withStyles, Button } from '@material-ui/core'
import ButtonsOfBuy from './ButtonsOfBuy';
import ButtonsOfDelete from './ButtonsOfDelete'
import ButtonsOfEmpty from './ButtonsOfEmpty'

const styles = theme => ({
    
});

class ControlButtons extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ButtonsOfDelete
                    status={this.props.status}
                    handleStatusChange={this.props.handleStatusChange}
                    books={this.props.books}
                    bookIndexesSelected={this.props.bookIndexesSelected}
                />
                <ButtonsOfBuy
                    status={this.props.status}
                    handleStatusChange={this.props.handleStatusChange}
                    books={this.props.books}
                    bookIndexesSelected={this.props.bookIndexesSelected}
                />
                <ButtonsOfEmpty
                    status={this.props.status}
                    books={this.props.books}
                />
            </React.Fragment>
        );
    }
}

export default (withStyles(styles)(ControlButtons));