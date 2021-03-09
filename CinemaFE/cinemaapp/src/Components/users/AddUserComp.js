import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import UserHeader from './header/UserHeader';
import usersUtil from '../../Utils/usersUtil';

function AddUserComp() {
    //const [msg, setMsg] = useState('');
    const msg = useSelector(state => state.msg);

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
            let resp = await usersUtil.addUser(values);

            let checkedPermissions = Object.keys(values.permissions).filter(p => values.permissions[p])
            
            if(resp.success){
                values.id = resp.id;
                values.permissions = checkedPermissions;
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
        const {name, checked} = e.target;

        formik.values.permissions[name] = checked;

        //let permissionsToUpdate = {[name]: checked}
        
        if(name === 'createSubscriptions' || name === 'deleteSubscriptions' || name === 'updateSubscriptions'){
            if(checked || (!checked && !formik.values.permissions.createSubscriptions && !formik.values.permissions.deleteSubscriptions && !formik.values.permissions.updateSubscriptions )){
                formik.values.permissions.viewSubscriptions = checked;
                //permissionsToUpdate = { ...permissionsToUpdate, 'viewSubscriptions': checked}
            }
        }
        else if(name === 'createMovies' || name === 'deleteMovies' || name === 'updateMovies'){
            if(checked || (!checked && !formik.values.permissions.createMovies && !formik.values.permissions.deleteMovies && !formik.values.updateMovies )){
                formik.values.permissions.viewMovies = checked;
                //permissionsToUpdate = { ...permissionsToUpdate, 'viewMovies': checked}
            }

        }
        else if(name === 'viewSubscriptions'){
            if(!checked){
                formik.values.permissions.createSubscriptions = false;
                formik.values.permissions.deleteSubscriptions = false;
                formik.values.permissions.updateSubscriptions = false;

                /*let cancelCheckedPermissions = {createSubscriptions : false,
                                                deleteSubscriptions : false,
                                                updateSubscriptions : false}

                permissionsToUpdate = { ...permissionsToUpdate, ...cancelCheckedPermissions }*/
            }
        }
        else if(name === 'viewMovies'){
            if(!checked){
                formik.values.permissions.createMovies = false;
                formik.values.permissions.deleteMovies = false;
                formik.values.permissions.updateMovies = false;

               /* let cancelCheckedPermissions = {createMovies : false,
                                                deleteMovies : false,
                                                updateMovies : false}

                permissionsToUpdate = { ...permissionsToUpdate, ...cancelCheckedPermissions }*/
            }
        }
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
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.viewSubscriptions}  onChange={handleChange} id='viewSubscriptions' name='viewSubscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Subscriptions'
                    />
                    <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.createSubscriptions} onChange={handleChange} id='createSubscriptions' name='createSubscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Create Subscriptions'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.deleteSubscriptions} onChange={handleChange} id='deleteSubscriptions' name='deleteSubscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Delete Subscriptions'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.updateSubscriptions} onChange={handleChange} id='updateSubscriptions' name='updateSubscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Update Subscriptions'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.viewMovies} onChange={handleChange} id='viewMovies' name='viewMovies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Movies'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.createMovies} onChange={handleChange} id='createMovies' name='createMovies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Create Movies'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.deleteMovies} onChange={handleChange} id='deleteMovies' name='deleteMovies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Delete Movies'
                    />
                                        <FormControlLabel
                        control={<Checkbox value={formik.values.permissions} checked={formik.values.permissions.updateMovies} onChange={handleChange} id='updateMovies' name='updateMovies' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='Update Movies'
                    />
                    {formik.touched.permissions && formik.errors.permissions ? (
                        <div>{formik.errors.permissions}</div>
                    ) : null}
                
                </FormGroup>


                <button type='submit'>Submit</button>
            </form>
        </React.Fragment>
    )
}
export default AddUserComp;
