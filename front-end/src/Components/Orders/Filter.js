import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'

const styles = theme => ({
    text: {
        position: 'relative',
        top: 8,
    }
});

class Filter extends React.Component {
    render() {
        const { classes } = this.props;
        const { filterKey } = this.props;
        let filterBar = [];
        for (let i = 0; i <= 3; i++) {
            const filterInput =
                (<TableCell>
                    <TextField
                        value={filterKey[i]}
                        onChange={e => this.props.onChange(i, e)}
                    />
                </TableCell>)
            filterBar.push(filterInput)
        }
        return (
            <React.Fragment>
                {filterBar}
                <TableCell>
                    <span className={classes.text}>
                        from &nbsp;
                    </span>
                    <TextField
                        type='datetime-local'
                        value={filterKey[4].startTime}
                        onChange={e => this.props.onChange('startTime', e)}
                    />
                    <br />
                    <span className={classes.text}>
                        &nbsp; to &nbsp; &nbsp;
                    </span>
                    <TextField
                        type='datetime-local'
                        value={filterKey[4].endTime}
                        onChange={e => this.props.onChange('endTime', e)}
                    />
                </TableCell>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Filter);