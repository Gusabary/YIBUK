import React from 'react'
import { withStyles, CircularProgress, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginLeft: '45%',
        marginTop: theme.spacing.unit * 12,
    },
    text: {
        marginLeft: -theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 4,
    }
});

class Loading extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <CircularProgress
                        size='100px'
                        thickness='5'
                    />
                    <Typography variant='h4' className={classes.text}>
                        Loading...
                    </Typography>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Loading);