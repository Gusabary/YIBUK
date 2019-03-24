import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import agent from '../../agent'

const styles = theme => ({

});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class ControlManage extends React.Component {
    render() {
        const { classes, isDeleting } = this.props;
        return (
            <React.Fragment>
                {!isDeleting ?
                    (<div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleClick}
                        > 
                            Delete
                        </Button>
                        <Link to="AddBook">
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>
                        </Link>
                    </div>) :
                    (<div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleDeleteOK}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ControlManage));