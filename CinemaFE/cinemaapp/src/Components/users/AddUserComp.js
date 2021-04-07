import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import UserMenu from './menu/UserMenu';
import usersUtil from '../../Utils/usersUtil';

function AddUserComp() {
    //const [msg, setMsg] = useState('');
    const msg = useSelector(state => state.msg);

    const history = useHistory();

    const dispatch = useDispatch();

    const formik = useFormik({
        /*enableReinitialize : true,*/
        
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            sessionTimeOut: 0,
            permissions: [],
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            lastName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            username: Yup.string()
              .min(3, 'Too Short!')
              .max(10, 'Too Long!')
              .required('Required'),
            sessionTimeOut: Yup.number()
              .min(1, 'Must be more than 0 sec')
              .max(60, 'Must be less than 60 sec')
              .integer()
              .positive()
              .required('Required'),
            permissions: Yup.array().min(1, 'Choose at list one permission')
            
            
            }),
        onSubmit: async (values) => {
            let resp = await usersUtil.addUser(values);

            if(resp.success){
                values.id = resp.id;
                
                dispatch({
                    type: "AddUser",
                    payload: values
                })

                dispatch({
                    type: "UpdateMsg",
                    payload: resp.msg
                })

                history.push('/users');
            }
            else{
                dispatch({
                    type: "UpdateMsg",
                    payload: resp.msg
                })
            }
            
            // setMsg(resp.msg);
        },
    });

    const handleChange = (e) =>{
        formik.handleChange(e);
        const {name, checked, value} = e.target;
        let userPermissions = formik.values.permissions;

       // console.log('name, checked' , name, checked, value);
      //  console.log('values' , formik.values);

        if(name === 'createSubscriptions' || name === 'deleteSubscriptions' || name === 'updateSubscriptions'){
            if(checked){
                userPermissions = [...userPermissions, value];

                if(!userPermissions.includes('View Subscriptions')){
                    userPermissions = [...userPermissions, 'View Subscriptions'];
                }
            }
            else{
                userPermissions = userPermissions.filter(p => p !== value);
                if(!userPermissions.includes('Create Subscriptions') && !userPermissions.includes('Delete Subscriptions') && !userPermissions.includes('Update Subscriptions')){
                    userPermissions = userPermissions.filter(p => p !== 'View Subscriptions');
                }
            }
        }
        else if(name === 'createMovies' || name === 'deleteMovies' || name === 'updateMovies'){
            if(checked){
                userPermissions = [...userPermissions, value];

                if(!userPermissions.includes('View Movies')){
                    userPermissions = [...userPermissions, 'View Movies'];
                }
            }
            else{
                userPermissions = userPermissions.filter(p => p !== value);
                if(!userPermissions.includes('Create Movies') && !userPermissions.includes('Delete Movies') && !userPermissions.includes('Update Movies')){
                    userPermissions = userPermissions.filter(p => p !== 'View Movies');
                }
            }
        }
        else if(name === 'viewSubscriptions'){
            if(checked){
                userPermissions = [...userPermissions, value];
            }
            else{
                userPermissions = userPermissions.filter(p => p.indexOf('S') === -1);
            }
        }
        else if(name === 'viewMovies'){
            if(checked){
                userPermissions = [...userPermissions, value];

            }
            else{
                userPermissions = userPermissions.filter(p => p.indexOf('M') === -1);
            }
        }

        formik.setFieldValue('permissions', userPermissions);
       // console.log('values' , formik.values);
    }

    return(
        <React.Fragment>
             <UserMenu/>
            {msg}
            <form onSubmit={formik.handleSubmit}>
                
                <label htmlFor='firstName'>First Name</label>
                <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <br/>

                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
                <br/>

                <label htmlFor='userName'>UserName</label>
                <input
                    id='username'
                    name='username'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}
                <br/>

                <label htmlFor='sessionTimeOut'>Session Time Out</label>
                <input
                    id='sessionTimeOut'
                    name='sessionTimeOut'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.sessionTimeOut}
                />
                {formik.touched.sessionTimeOut && formik.errors.sessionTimeOut ? (
                    <div>{formik.errors.sessionTimeOut}</div>
                ) : null}
                <br/>


                Permission: <br/>
                    
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('View Subscriptions')}  onChange={handleChange} id='viewSubscriptions' name='viewSubscriptions' value='View Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Subscriptions'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('Create Subscriptions')} onChange={handleChange} id='createSubscriptions' name='createSubscriptions' value='Create Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Create Subscriptions'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('Delete Subscriptions')} onChange={handleChange} id='deleteSubscriptions' name='deleteSubscriptions' value='Delete Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Delete Subscriptions'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('Update Subscriptions')} onChange={handleChange} id='updateSubscriptions' name='updateSubscriptions' value='Update Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Update Subscriptions'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('View Movies')} onChange={handleChange} id='viewMovies' name='viewMovies' value='View Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Movies'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('Create Movies')} onChange={handleChange} id='createMovies' name='createMovies' value='Create Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Create Movies'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('Delete Movies')} onChange={handleChange} id='deleteMovies' name='deleteMovies' value='Delete Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Delete Movies'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={formik.values.permissions.includes('Update Movies')} onChange={handleChange} id='updateMovies' name='updateMovies' value='Update Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Update Movies'
                    />
                </FormGroup>
                
                {formik.touched.permissions && formik.errors.permissions ? (
                    <div>{formik.errors.permissions}</div>
                ) : null}

                <button type='submit'>Submit</button>
                <button><Link to="/users">Cancel</Link></button>
            </form>
        </React.Fragment>
    )
}
export default AddUserComp;
