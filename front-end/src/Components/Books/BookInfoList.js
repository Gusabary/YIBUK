import React from 'react'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Title from '@material-ui/icons/Title'
import Person from '@material-ui/icons/Person'
import Storage from '@material-ui/icons/Storage'
import AttachMoney from '@material-ui/icons/AttachMoney'

class BookInfoList extends React.Component {
    render() {
        const { book } = this.props;
        return (
            <React.Fragment>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Title />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant='h5'>
                                {"Title: " + book.bookName}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant='h5'>
                                {"Author: " + book.author}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant='h5'>
                                {"ISBN: " + book.isbn}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Storage />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant='h5'>
                                {"Storage: " + book.storage}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AttachMoney />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant='h5'>
                                {"Price: " + book.price + '$'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </React.Fragment>
        )
    }
}

export default BookInfoList;