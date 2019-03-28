import React from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import AddToCart from './AddToCart';
import Purchase from './Purchase'
import Edit from './Edit'

const styles = theme => ({
    twoButtons: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 5,
        float: 'left',
    },
    oneButton: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 10,
        float: 'left',
    },
});

const mapStateToProps = state => ({
    mode: state.common.mode,
})

class BookContent extends React.Component {
    render() {
        const { classes, mode, book, index } = this.props;
        return (
            <React.Fragment>
                {mode === 1 &&
                    <div className={classes.twoButtons}>
                        <AddToCart book={book} />
                        <Purchase book={book} />
                    </div>
                }
                {mode === 2 &&
                    <div className={classes.oneButton}>
                        <Edit index={index} history={this.props.history} />
                    </div>
                }
                {mode === 3 &&
                    <div className={classes.oneButton}>
                        <Purchase book={book} />
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BookContent));