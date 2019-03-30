import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';

const styles = theme => ({

});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

const getRank = (orders, startTime, endTime) => {
    let booksInRank = [];
    const start = Date.parse(startTime)
    const end = Date.parse(endTime)
    orders.forEach(order => {
        const time = Date.parse(order.time)
        if (start > time || end < time)
            return;
        let hasExisted = false;
        booksInRank.forEach(book => {
            if (book.bookId === order.bookId) {
                book.sales += order.quantity
                hasExisted = true;
            }
        })
        if (!hasExisted) {
            const tmp = {
                bookId: order.bookId,
                sales: order.quantity,
            }
            booksInRank.push(tmp);
        }
    });

    for (let i = 0; i < booksInRank.length - 1; i++)
        for (let j = i + 1; j < booksInRank.length; j++)
            if (booksInRank[i].sales < booksInRank[j].sales) {
                const tmp = booksInRank[j]
                booksInRank[j] = booksInRank[i]
                booksInRank[i] = tmp;
            }
    if (booksInRank.length > 0)
        booksInRank[0].rank = 1;
    for (let i = 1; i < booksInRank.length; i++)
        if (booksInRank[i].sales === booksInRank[i - 1].sales)
            booksInRank[i].rank = booksInRank[i - 1].rank
        else
            booksInRank[i].rank = i + 1
    return booksInRank
}

class Book extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booksInRank: getRank(this.props.orders, null, null),
            startTime: null,
            endTime: null,
        }
        this.handleTimeChange=this.handleTimeChange.bind(this)
    }
    handleTimeChange = (field) => async event => {
        await this.setState({
            [field]: event.target.value
        })
        this.setState({
            booksInRank: getRank(this.props.orders, this.state.startTime, this.state.endTime)
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            booksInRank: getRank(nextProps.orders, this.state.startTime, this.state.endTime)
        })
    }
    render() {
        return (
            <React.Fragment>
                from
                <TextField
                    type='datetime-local'
                    value={this.state.startTime}
                    onChange={this.handleTimeChange('startTime')}
                />
                to
                <TextField
                    type='datetime-local'
                    value={this.state.endTime}
                    onChange={this.handleTimeChange('endTime')}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>BookId</TableCell>
                            <TableCell>Sales</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.booksInRank.map((book) => (
                            <TableRow>
                                <TableCell>{book.rank}</TableCell>
                                <TableCell>{book.bookId}</TableCell>
                                <TableCell>{book.sales}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Book));