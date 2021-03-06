import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabIndicator: {
    
  }
}));

export default function TabsWrapper(props) {
  const classes = useStyles();
  const theme = useTheme()
  const [value, setValue] = React.useState(0);

  const { 
     tabs,
     parent_id, 
     fieldValues,
     parent_node,
     ...restProps
  } = props
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color='inherit'>
        <Tabs 
          indicatorColor="primary"
          aria-label="simple tabs example"
          value={value} onChange={handleChange} 
        >
           {
              tabs.map((e, i) => (<Tab label={e.label} key={e.label + i} {...a11yProps(i)}/>))
           }
        </Tabs>
      </AppBar>
      
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          tabs.map((e, i) => (
          <TabPanel value={value} key={e.label + i} index={i} dir={theme.direction}>
            {
              e.component
            }
          </TabPanel>))
        }
      </SwipeableViews>
    </div>
  );
}
TabsWrapper.defaultProps = {
  tabs: []
}