import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import UserHeader from './header/UserHeader';
import usersUtil from '../../Utils/usersUtil';

function EditUserComp(props) {
    const [user, setUser] = useState();
    const users = useSelector(state => state.users);
    const msg = useSelector(state => state.msg);

    useEffect(() => {
        let userId = props.match.params.id;
        let user = users.filter(u => u.id === userId)[0];
        formik.values.firstName = user.firstName;
        formik.values.lastName = user.lastName;
        formik.values.username = user.username;
        formik.values.sessionTimeOut = user.sessionTimeOut;
        formik.values.permissions = user.permissions;

        setUser(user);
        
    }, [])

    const history = useHistory();

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            sessionTimeOut: 0,
            permissions: {
                viewSubscriptions: false,
                createSubscriptions: false,
                deleteSubscriptions: false,
                updateSubscriptions: false,
                viewMovies: false,
                createMovies: false,
                deleteMovies: false,
                updateMovies: false
            },
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
            permissions: Yup.object({
                viewSubscriptions: Yup.boolean(),
                createSubscriptions: Yup.boolean(),
                deleteSubscriptions: Yup.boolean(),
                updateSubscriptions: Yup.boolean(),
                viewMovies: Yup.boolean(),
                createMovies: Yup.boolean(),
                deleteMovies: Yup.boolean(),
                updateMovies: Yup.boolean()
              }).test('permission-validation', 'Choose at list 1 permission', values => values.viewSubscriptions || values.createSubscriptions || 
                values.deleteSubscriptions || values.updateSubscriptions || values.viewMovies || values.createMovies || values.deleteMovies ||
                values.updateMovies)
            }),
        onSubmit: async (values) => {
            
        },
    });

    const handleChange = (e) =>{
        formik.handleChange(e);
        const {name, checked} = e.target;

        let userPermissions = user.permissions;

        if(user.permissions.includes(name) && !checked){
            userPermissions = user.permissions.filter(p => p !== name)
        }
        else if(!user.permissions.includes(name) && checked){
            userPermissions.push(name);
        }
        
        if(name === 'Create Subscriptions' || name === 'Delete Subscriptions' || name === 'Update Subscriptions'){
            if(checked){
                userPermissions.push('View Subscriptions');
            }
            else if(!checked && !user.permissions.includes('Create Subscriptions') && !user.permissions.includes('Delete Subscriptions') && !user.permissions.includes('Update Subscriptions')){
                userPermissions = user.permissions.filter(p => p !== 'View Subscriptions');
            }
        }
        else if(name === 'Create Movies' || name === 'Delete Movies' || name === 'Update Movies'){
            if(checked){
                userPermissions.push('View Movies');
            }
            else if(!checked && !user.permissions.includes('Create Movies') && !user.permissions.includes('Delete Movies') && !user.permissions.includes('Update Movies')){
                userPermissions = user.permissions.filter(p => p !== 'View Movies');
            }
        }
        else if(name === 'View Subscriptions'){
            if(!checked){
                userPermissions = userPermissions.filter(p => (p !== 'Create Subscriptions' && p !== 'Delete Subscriptions' && p !== 'Update Subscriptions' ));
            }
        }
        else if(name === 'View Movies'){
            if(!checked){
                userPermissions = userPermissions.filter(p => (p !== 'Create Movies' && p !== 'Delete Movies' && p !== 'Update Movies' ));
            }
        }

        user.permissions = userPermissions;
        
    }

    return(
        <React.Fragment>
             <UserHeader/>
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

                <label htmlFor='username'>UserName</label>
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
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('View Subscriptions') ? true : false) : (false)}  onChange={handleChange} id='viewSubscriptions' name='View Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Subscriptions'
                    />

<FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('Create Subscriptions') ? true : false) : false} onChange={handleChange} id='createSubscriptions' name='Create Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Create Subscriptions'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('Delete Subscriptions') ? true : false) : false} onChange={handleChange} id='deleteSubscriptions' name='Delete Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Delete Subscriptions'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('Update Subscriptions') ? true : false) : false} onChange={handleChange} id='updateSubscriptions' name='Update Subscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Update Subscriptions'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('View Movies') ? true : false) : false} onChange={handleChange} id='viewMovies' name='View Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Movies'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('Crewate Movies') ? true : false) : false} onChange={handleChange} id='createMovies' name='Create Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Create Movies'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('Delete Movies') ? true : false) : false} onChange={handleChange} id='deleteMovies' name='Delete Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Delete Movies'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={user ? (user.permissions.includes('Update Movies') ? true : false) : false} onChange={handleChange} id='updateMovies' name='Update Movies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Update Movies'
                    />
                    {formik.touched.permissions && formik.errors.permissions ? (
                        <div>{formik.errors.permissions}</div>
                    ) : null}
                
                </FormGroup>


                <button type='submit'>Update</button>
                <button><Link to="/users">Cancel</Link></button>
            </form>
        </React.Fragment>
    )
}
export default EditUserComp;
