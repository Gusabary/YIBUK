import React from 'react'
import { withStyles, Button } from '@material-ui/core'

const styles = theme => ({

});

class ControlPurchase extends React.Component {
    render() {
        const { classes, isBuying, isDeleting } = this.props;
        return (
            <React.Fragment>
                {!isBuying && !isDeleting ?
                    (<div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.handleClick('Delete')}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.handleClick('Buy')}
                        >
                            Buy
                        </Button>
                    </div>) :
                    (<div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.handleOK(isBuying ? 'Buy' : 'Delete')}
                        >
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.handleClick(isBuying ? 'Buy' : 'Delete')}
                        >
                            Cancel
                        </Button>
                    </div>)
                }
            </React.Fragment>
        );
    }
}

export default (withStyles(styles)(ControlPurchase));