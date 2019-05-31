import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import AddToCart from './AddToCart';
import Purchase from './Purchase'
import Edit from './Edit'

const styles = theme => ({
    twoButtons: {
        marginTop: theme.spacing.unit * 5,
        marginLeft: theme.spacing.unit * 5,
        float: 'left',
    },
    oneButton: {
        marginTop: theme.spacing.unit * 5,
        marginLeft: theme.spacing.unit * 15,
        float: 'left',
    },
    hint: {
        marginTop: theme.spacing.unit * 5,
        marginLeft:theme.spacing.unit * 10,
    }
});

const mapStateToProps = state => ({
    mode: state.common.mode,
    identity: state.user.identity
})

class BookContent extends React.Component {
    render() {
        const { classes, mode, book, index, identity } = this.props;
        return (
            <React.Fragment>
                {mode === 1 && identity === 0 &&
                    <div className={classes.twoButtons}>
                        <AddToCart book={book} />
                        <Purchase book={book} />
                    </div>
                }
                {mode === 1 && identity === 2 &&
                    <div className={classes.hint}>
                        <Typography variant='h6'>
                            <Link to="Signin">Sign in</Link> to Add to cart or Purchase.
                        </Typography>
                        <br />
                        <Typography variant='h6'>
                            No account? <Link to="Signup">Sign up</Link> here.
                        </Typography>
                    </div>
                }
                {(mode === 2 || (mode === 1 && identity === 1)) &&
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