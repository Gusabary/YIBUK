import React from 'react'
import { Typography, withStyles, Button, TextField, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from '@material-ui/core'
import { connect } from 'react-redux';

const styles = theme => ({
    list: {
        marginTop: 24,
        width: '100%',
    },
    tH: {
        padding: 0,
        textAlign: 'center',
        fontSize: 14,
    },
    tC: {
        padding: 0,
        textAlign: "center",
    },
    a1: {
        position: 'relative',
        right: 32,
    },
    a2: {
        position: 'relative',
        right: 72,
    },
    a3: {
        position: 'relative',
        right: 44,
    },
    a4: {
        position: 'relative',
        right: 16,
    },
    total: {
        float: 'left',
        marginTop: 24,
        marginLeft: 16
    }
})

const mapStateToProps = state => ({
    toBuy: state.cart.toBuy,
})

const mapDispatchToProps = dispatch => ({
})

class InfoOfOrder extends React.Component {
    render() {
        const { classes, books, toBuy } = this.props;
        let total = 0;
        this.props.indexesToBuy.forEach(bookIndex => {
            total += books[bookIndex].price * toBuy[bookIndex];
        })
        return (
            <React.Fragment>
                <Table className={classes.list}>
                    <TableHead>
                        <TableCell className={classes.tH}><span className={classes.a1}>Title</span></TableCell>
                        <TableCell className={classes.tH}><span className={classes.a2}>Author</span></TableCell>
                        <TableCell className={classes.tH}><span className={classes.a3}>Quantity</span></TableCell>
                        <TableCell className={classes.tH}><span className={classes.a4}>Price</span></TableCell>
                    </TableHead>

                    {this.props.indexesToBuy.map((bookIndex) => (
                        <TableRow>
                            <TableCell className={classes.tC}>
                                <span className={classes.a1}>《{books[bookIndex].bookName}》</span>
                            </TableCell>
                            <TableCell className={classes.tC}>
                                <span className={classes.a2}>{books[bookIndex].author} </span>
                            </TableCell>
                            <TableCell className={classes.tC}>
                                <span className={classes.a3}>{toBuy[bookIndex]} </span>
                            </TableCell>
                            <TableCell className={classes.tC}>
                                <span className={classes.a4}>{books[bookIndex].price * toBuy[bookIndex]}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
                <span className={classes.total}>
                    Total prices: {total}
                </span>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoOfOrder));