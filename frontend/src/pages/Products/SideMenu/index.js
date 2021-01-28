import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui';
import { Button, Grid, Input, ListItemSecondaryAction, ListItemText, ListSubheader, TextField } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { MuiThemeProvider } from 'material-ui/styles';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: "100%",
  },
  input: {
    width: "170px"
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export const SideMenu = (props) => {
    const classes = useStyles();
    const [filters, setFilters] = useState({
        daysLeft: 5,
        queryText: "",
        minPrice: 0,
        maxPrice:1000
    });

    const handleChange = (e, newValue) => {
        setFilters({...filters, [e.target.name]: newValue});
      };
      const handleDayChange = (e, newValue) => {
        setFilters({...filters, daysLeft: Math.floor(newValue)});
      };
      const handleInputChange = (event) => {
        setFilters({...filters, daysLeft: event.target.value === '' ? '' : Math.floor(Number(event.target.value))});
      };

      const handleBlur = () => {
        if (filters.daysLeft < 0) {
            setFilters({...filters, daysLeft: 0});
        } else if (filters.daysLeft > 30) {
          setFilters({...filters, daysLeft: 30});
        }
      };
    return (
        <div>
            <MuiThemeProvider>
                <CssBaseline />
                <Drawer
                    style={{width:"100%", border: "1px solid lightgrey"}} 
                    variant="permanent"
                    classes={ {
                    paper: clsx(classes.drawerPaper),
                    } }
                    open={ true }
                >
                <List subheader={<ListSubheader><FilterList />Filters</ListSubheader>}>
                    <Divider />
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary={`Days Left:`} />
                        <ListItemSecondaryAction style={{width:"170px"}}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        max={30}
                                        min={1}
                                        value={filters.daysLeft}
                                        onChange={handleDayChange}
                                        aria-labelledby="input-slider"
                                    />
                                </Grid>
                                <Grid item>
                                    <Input
                                        value={filters.daysLeft}
                                        margin="dense"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 1,
                                        max: 30,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary="Min Price" />
                        <ListItemSecondaryAction>
                            <Input
                            className={classes.input}
                            value={filters.minPrice}
                            margin="dense"
                            name="minPrice"
                            onChange={handleChange}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 30,
                                type: 'number',
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary="Max Price" />
                        <ListItemSecondaryAction>
                            <Input
                            className={classes.input}
                            value={filters.maxPrice}
                            margin="dense"
                            name="maxPrice"
                            onChange={handleChange}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 30,
                                type: 'number',
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary="Text Search" />
                        <ListItemSecondaryAction>
                            <TextField
                            className={classes.input}
                            name="queryText"
                            value={filters.queryText}
                            onChange={handleChange}
                            placeholder="Query Text"
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        
                        <Button onClick={(e)=>{
                        }} style={{width:"100%"}}>Search</Button>
                    </ListItem>
                    </List>
                </Drawer>
            </MuiThemeProvider>
        </div>
    )
}

SideMenu.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(null, null)(SideMenu)
