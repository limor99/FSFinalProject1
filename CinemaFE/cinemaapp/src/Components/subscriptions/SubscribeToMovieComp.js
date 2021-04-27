import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import subscriptionsUtil from '../../Utils/subscriptionsUtil';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: 'white',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    date: {
        color: "red",
        backgroundColor: 'white'
    }
  }));

function SubscribeToMovieComp(props) {
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [msg, setMsg] = useState('');

    const unwatchedMovies = useSelector(state => state.membersSubscriptions.filter(sms => sms.id === props.memberId))[0].unwatched;

    const classes = useStyles();
   
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: {
            selectedMovie: '',
            watchedDate:'',
            
        },
        validationSchema: Yup.object({
            selectedMovie: Yup.string().required("Required"),
            watchedDate: Yup.date()
              .min(new Date('01/01/1930'))
              .max(new Date('01/01/2930'))                   
              .required('Required'),
        }),
        onSubmit: async (values) => {
            let memberId = props.memberId;
                                    
            let subscribedMovie = {
                memberId, 
                selectedMovieId,
                'watchedDate' : values.watchedDate
            }
            
            let resp = await subscriptionsUtil.subscribeToMovie(subscribedMovie);

            if(resp.success){
                dispatch({
                    type: "SubscribeToMovie",
                    payload: subscribedMovie
                })

             formik.resetForm();
             
            }
            
            setMsg(resp.msg);
          
        },
    });

    const handleSelectChange = (e) => {
        let selectedMovieId = e.target.value;
        setSelectedMovieId(selectedMovieId);
        formik.handleChange(e);
    };

    return (
        <div>
            {msg}
            <form onSubmit={formik.handleSubmit}>

            { unwatchedMovies.length === 0  ?<div>This user watch all movies</div> : 
                <FormControl className={classes.formControl}>
                    <InputLabel id="choose-movie">Choose movie</InputLabel>
                    <Select
                        labelId="selected-movie-label"
                        id="selectedMovie"
                        {...formik.getFieldProps('selectedMovie')}
                        onChange={handleSelectChange}
                        value={unwatchedMovies.filter(uw => uw._id === selectedMovieId)[0] ? selectedMovieId : ''}
                        defaultValue={""}
                    >

                    {
                        unwatchedMovies.map(uw =>{
                            return <MenuItem key={uw._id} value={uw._id}>{uw.name}</MenuItem>
                        })
                    }
                                        
                    </Select>
                </FormControl>
            }
                <br/>
                {formik.touched.selectedMovie && formik.errors.selectedMovie ? (
                    <div>{formik.errors.selectedMovie}</div>
                ) : null}   

                { unwatchedMovies.length === 0  ? '' : 
                <TextField 
                    id="watchedDate"
                    label="watchedDate"
                    type="date"
                    format={'dd/mm/yyyy'}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('watchedDate')}
                    className={classes.date}
                    
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                }
                {formik.touched.watchedDate && formik.errors.watchedDate ? (
                    <div>{formik.errors.watchedDate}</div>
                ) : null}   
                <br/>
                
                { unwatchedMovies.length === 0  ? '' : 
                    <button type='submit'>Subscribe</button>   
                }          
            </form>
        </div>
    )
}

export default SubscribeToMovieComp
