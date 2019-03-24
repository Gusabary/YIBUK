import React from 'react'
import { withStyles, Typography, Menu, MenuItem, Button } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent'
import Book from './Book'

const bookAttr = ['BookId', 'Book title', 'Author', 'ISBN', 'Storage', 'Price']

const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 5,
    }
});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget
        })
    }
    handleClose(attr) {
        this.setState({
            anchorEl: null,
        })
        //console.log(attr)
        this.props.handleChange(attr)
    }
    render() {
        const { classes, attr } = this.props;
        const { anchorEl } = this.state;
        return (
            <React.Fragment>
                <Typography variant='h5' className={classes.padding}>
                    Sorted by
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {bookAttr[attr]}
                    </Button>
                </Typography>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => this.handleClose(-1)}
                >
                    <MenuItem onClick={() => this.handleClose(0)}>{bookAttr[0]}</MenuItem>
                    <MenuItem onClick={() => this.handleClose(1)}>{bookAttr[1]}</MenuItem>
                    <MenuItem onClick={() => this.handleClose(2)}>{bookAttr[2]}</MenuItem>
                    <MenuItem onClick={() => this.handleClose(3)}>{bookAttr[3]}</MenuItem>
                    <MenuItem onClick={() => this.handleClose(4)}>{bookAttr[4]}</MenuItem>
                    <MenuItem onClick={() => this.handleClose(5)}>{bookAttr[5]}</MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sort));