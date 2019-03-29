import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Button, TextField, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

const styles = theme => ({
    main: {
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing.unit * 15,
        marginLeft: -theme.spacing.unit,
        width: '101%',
        position: 'relative',
        top: 8,
    },
    sub: {
        backgroundColor: theme.palette.primary.light,
        height: theme.spacing.unit * 6
    },
    text: {
        fontFamily: 'STXingkai'
    }
})

class Footer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="static" className={classes.main}>
                    <Toolbar>
                        <Typography variant='h6' className={classes.text}>
                            Youthful Imagination Brings U Knowledge.
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer));
