import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userHistory, Link, useHistory } from 'react-router-dom';
import moment from 'moment';

import MovieMenu from './menu/MovieMenu';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';

import './MovieComp.css';
import moviesUtil from '../../Utils/movieUtil';
import movieUtil from '../../Utils/movieUtil';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      
    },
    input: {
        color: "red",
        backgroundColor: 'white'
    }
  }));

function EditMovieComp(props) {
    const [msg, setMsg] = useState('');
    const [movie, setMovie] = useState(null);
    const movies = useSelector(state => state.movies);

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: movie != null ? movie.name : '',
            generes: '',
            imageUrl: '',
            premiered: '',
            
        },
        validationSchema: Yup.object({
            name: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            generes: Yup.string()
              .min(3, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            imageUrl: Yup.string()
              .min(10, 'Too Short!')
              .max(100, 'Too Long!')
              .required('Required'),
            premiered: Yup.date()
              .min(new Date('01/01/1930'))
              .max(new Date('01/01/2930'))                   
              .required('Required'),
        }),
        onSubmit: async (values) => {
            let addedMovie = {
                name : values.name,
                generes : values.generes,
                image : {
                    medium : values.imageUrl,
                    original : ''
                },
                premiered : values.premiered
            }

            let resp = await moviesUtil.addMovie(values)
            //console.log(resp.data)

            if(resp.success){
                addedMovie._id = resp.movieId;
                
                dispatch({
                    type: "AddMovie",
                    payload: addedMovie
                })
                formik.resetForm();
                setMsg(resp.msg);

                //history.push('/movies');
            }
            else{
                setMsg(resp.msg);
                
            }
            
            // setMsg(resp.msg);
        },
    });

    useEffect(() => {
        let movieId = props.match.params.id;
        let movie = movies.filter(m => m._id === movieId)[0];

        //let fields = ['firstName', 'lastName', 'username', 'sessionTimeOut', 'permissions'];

        //fields.forEach(field => formik.setFieldValue(field, user[field]));

        setMovie(movie);
        
    }, [])

    return (
        
        <React.Fragment>
            <MovieMenu/>
            {msg}
            name: {props.match.params.name}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                    value={formik.values.name}
                />

                {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                ) : null}

                <br/>

                <label htmlFor="generes">Generes</label>
                <input
                    id="generes"
                    type="text"
                    {...formik.getFieldProps('generes')}
                />
                {formik.touched.generes && formik.errors.generes ? (
                    <div>{formik.errors.generes}</div>
                ) : null}

                <br/>

                <label htmlFor="imageUrl">Image Url</label>
                <input
                    id="imageUrl"
                    type="text"
                    {...formik.getFieldProps('imageUrl')}
                />
                {formik.touched.imageUrl && formik.errors.imageUrl ? (
                    <div>{formik.errors.imageUrl}</div>
                ) : null}
                
                <br/>
                <label htmlFor="premiered">Premiered</label>

                <TextField 
                    id="premiered"
                    label="Premiered"
                    type="date"
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('premiered')}
                    
                    
                    className={classes.input}
                    
                    InputLabelProps={{
                    shrink: true,
                    
                    
                    }}
                    
                    
                />
                {formik.touched.premiered && formik.errors.premiered ? (
                    <div>{formik.errors.premiered}</div>
                ) : null}
<br/>
                <button type='submit'>Submit</button>
                <button><Link to="/movies">Cancel</Link></button>
            </form>
            
        </React.Fragment>
    )
}

export default EditMovieComp
