import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'

class Filter extends React.Component {
    render() {
        const { filterKey } = this.props;
        let filterBar = [];
        for (let i = 0; i <= 3; i++) {
            const filterInput =
                (<TableCell>
                    <TextField
                        value={filterKey[i]}
                        onChange={this.props.onChange(i)}
                    />
                </TableCell>)
            filterBar.push(filterInput)
        }
        return (
            <React.Fragment>
                {filterBar}
                <TableCell>
                    from
                    <TextField
                        type='datetime-local'
                        value={filterKey[4].startTime}
                        onChange={this.props.onChange('startTime')}
                    />
                    to
                    <TextField
                        type='datetime-local'
                        value={filterKey[4].endTime}
                        onChange={this.props.onChange('endTime')}
                    />
                </TableCell>
            </React.Fragment>
        )
    }
}

export default Filter;