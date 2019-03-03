import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles, Button, Toolbar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Create from '@material-ui/icons/Create'
import Delete from '@material-ui/icons/Delete'
import PermIdentiy from '@material-ui/icons/PermIdentity';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


const styles = theme => ({
    padding: {
        marginTop: theme.spacing.unit * 8,
    },
    post: {
        width: '70%',
        marginLeft: '15%',
    },
    title: {
        backgroundColor: theme.palette.primary.main,
    },
    buttons: {
        marginLeft: theme.spacing.unit * 5,
    },
    edit: {
        color: theme.palette.secondary.main,
        border: 'solid',
        textDecoration: 'underline',
    },
    delete: {
        marginLeft: theme.spacing.unit * 2,
        color: theme.palette.error.main,
        border: 'solid',
        textDecoration: 'underline',
    },
    buttonIcon: {
        marginLeft: -theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    image: {
        width: '85%',
        marginTop: theme.spacing.unit,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        borderLeft: 'solid',
        borderBottom: 'solid',
        borderRight: 'solid',
        borderColor: theme.palette.primary.main,
        borderBottomColor: theme.palette.primary.main,
    },
    text: {
        width: '100%',
        marginRight: theme.spacing.unit,
        wordWrap: 'break-word',
    },
    icon: {
        marginLeft: theme.spacing.unit * 5,
    },
});

const mapStateToProps = state => ({
    identity: state.user.identity,
})


class Books extends React.Component {
    constructor(props) {
        super(props);
        let modelArray = [];
        modelArray[0] = false;
        modelArray[10] = false;
        modelArray.fill(false, 0, 10);
        this.state = {
            isExpanded: modelArray,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(index) {
        const isExpanded = this.state.isExpanded
        this.setState({
            isExpanded: isExpanded.fill(!isExpanded[index], index, index + 1),
        })
    }
    render() {
        const { classes } = this.props;
        const index = 0;
        return (
            <React.Fragment>
                <div className={classes.padding}></div>

                <ExpansionPanel
                    className={classes.post}
                    onChange={() => this.handleChange(index)}
                    expanded={this.state.isExpanded[index]}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        className={this.state.isExpanded[index] && classes.title}
                    >
                        {this.state.isExpanded[index] ?
                            <Typography variant='h4'>
                                <Toolbar>
                                    《title1》&nbsp; Bob
                                        {this.props.identity !== 0 && (
                                        <div className={classes.buttons}>
                                            <Link to="#">
                                                <Button
                                                    className={classes.edit}
                                                    //onClick={() => this.props.onClickEdit(post._id, index)}
                                                    variant="outlined"
                                                >
                                                    <Create className={classes.buttonIcon} />
                                                    Add to Cart
                                                </Button>
                                            </Link>
                                            <Button
                                                className={classes.edit}
                                                //onClick={() => this.props.onClickDelete(post._id)}
                                                variant="outlined"
                                            >
                                                <Delete className={classes.buttonIcon} />
                                                Purchase
                                            </Button>
                                        </div>
                                    )}
                                </Toolbar>
                            </Typography> :
                            <Typography variant='h6'>
                                《title1》&nbsp; Bob &nbsp; ISBN-1 &nbsp;  3 Left 
                            </Typography>

                        }
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.content}>
                        <div className={classes.text}>
                              &nbsp; ISBN-1 &nbsp;  3 Left 
                            <br />
                          content
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <ExpansionPanel className={classes.post} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        《title1》&nbsp; Bob  &nbsp; ISBN-1 &nbsp;  3 Left
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        content1
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(withStyles(styles)(Books));