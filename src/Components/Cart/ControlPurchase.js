import React from 'react'
import { withStyles, Button } from '@material-ui/core'

const styles = theme => ({

});

class ControlPurchase extends React.Component {
    render() {
        const { classes, isBuying } = this.props;
        return (
            <React.Fragment>
                {!isBuying ?
                    (<Button
                        variant="contained"
                        color="primary"
                        onClick={this.props.handleClick}
                    >
                        Buy
                    </Button>) :
                    (<div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleBuyOK}
                        >
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleClick}
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