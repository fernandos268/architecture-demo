import React, { useState } from 'react'
import Visit from '../../containers/Visit'
import PhotosTab from '../tabs/PhotosTab'
import TabContainer from '../TabsWrapper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  paper: {
   padding: theme.spacing(2),
   // textAlign: 'center',
   color: theme.palette.text.secondary,
   width: '98%',
   marginTop: 10,
   margin: 'auto'
  },
  grid: {
   margin: 3,
   pading: 10
  }
}));

function VisitFormDetails(props){
      const classes = useStyles();
      const { fieldValues: data } = props
      const [fieldValues, setFieldValues] = useState(data)

   function handleInputChange(evt) {
      const { id, value }  = evt.target     
      setFieldValues({
         ...fieldValues,
         [id]: value
      })
   }

   function handleSave() {
      console.log('Do something')
   }

   return (
      <div>
         <Grid container spacing={2}>
            <Grid item xs={12} className={classes.grid}>
               <Button variant="contained" onClick={handleSave}>Save</Button>
            </Grid>
            <Grid item xs={12} className={classes.grid}>
               <Paper className={classes.paper}>
                  <Grid container spacing={2} className={classes.grid}>
                     <Grid item xs={12} sm={1}>
                        <Avatar alt={fieldValues.type} src="/static/images/avatar/1.jpg" className={classes.large} />
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField id="type" value={fieldValues.type} label="Type" style ={{ width: '400px'}} onChange={handleInputChange}/>
                     </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.grid}>
                     <Grid item xs={6} sm={3}>
                        <TextField id="category" value={fieldValues.category} label="Category" onChange={handleInputChange}/>
                     </Grid>
                  </Grid>
              </Paper>
            </Grid>
         </Grid>
         <div style={{ marginTop: '20px'}}>
            <TabContainer
               tabs={tabs()}
            />
         </div>
      </div>
   )
   function tabs(){
      const passedProps = { parent_node: 'project', parent_node_id: data.id }
      return([
         {
            component: <PhotosTab label={'Photos'} {...passedProps}/>,
            label: 'Photos',
         }
      ])
   }
}

export default VisitFormDetails