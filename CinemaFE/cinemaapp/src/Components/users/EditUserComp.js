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
    console.log('1111111111 aaaaa')
    //const [userId, setUserId] = useState('');
    const [user, setUser] = useState();
    //console.log('1111111111aaaaa ', users)
    const users = useSelector(state => state.users);
    console.log('1111111111bbbbb ', users)
    const msg = useSelector(state => state.msg);

    useEffect(() => {
        
        console.log('2222222222222 ' , formik.values)
        let userId = props.match.params.id;
        console.log('2222222222222aaaaa' , userId)
        let user = users.filter(u => u.id === userId)[0];
        console.log('2222222222222bbbbb' , user)
        formik.values.firstName = user.firstName;
        formik.values.lastName = user.lastName;
        formik.values.username = user.username;
        formik.values.sessionTimeOut = user.sessionTimeOut;
        formik.values.permissions = user.permissions;

        
       // console.log('2222222222222bbb ' , formik.values)
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
           // console.log('cvb', values)
            /*
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
            
            */
        },
    });

    const inputTextHandleChange = (e) =>{
        //console.log(e.target.name);
        //formik.handleChange(e);
        console.log(formik.values);
        let name = e.target.name;
        formik.values[name] = e.target.value;
        console.log('inside' + formik.values);
    }

    const handleChange = (e) =>{
        /*
        formik.handleChange(e);
        const {name, checked} = e.target;

        formik.values.permissions[name] = checked;

        if(name === 'createSubscriptions' || name === 'deleteSubscriptions' || name === 'updateSubscriptions'){
            if(checked || (!checked && !formik.values.permissions.createSubscriptions && !formik.values.permissions.deleteSubscriptions && !formik.values.permissions.updateSubscriptions )){
                formik.values.permissions.viewSubscriptions = checked;
            }
        }
        else if(name === 'createMovies' || name === 'deleteMovies' || name === 'updateMovies'){
            if(checked || (!checked && !formik.values.permissions.createMovies && !formik.values.permissions.deleteMovies && !formik.values.updateMovies )){
                formik.values.permissions.viewMovies = checked;
            }
        }
        else if(name === 'viewSubscriptions'){
            if(!checked){
                formik.values.permissions.createSubscriptions = false;
                formik.values.permissions.deleteSubscriptions = false;
                formik.values.permissions.updateSubscriptions = false;
            }
        }
        else if(name === 'viewMovies'){
            if(!checked){
                formik.values.permissions.createMovies = false;
                formik.values.permissions.deleteMovies = false;
                formik.values.permissions.updateMovies = false;
            }
        }
        */
    }

    return(
        <React.Fragment>
             <UserHeader/>
             {console.log('3333333333 ',user)}
             {console.log('3333333333bbbb ',formik.values)}
             {console.log('3333333333cccc ',formik.values)}
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
                    onChange={inputTextHandleChange}
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
                    onChange={inputTextHandleChange}
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
                    onChange={inputTextHandleChange}
                    value={formik.values.sessionTimeOut}
                />
                {formik.touched.sessionTimeOut && formik.errors.sessionTimeOut ? (
                    <div>{formik.errors.sessionTimeOut}</div>
                ) : null}
                <br/>


                Permission: <br/>
                    
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={user ? (user.permissions.includes('View Subscriptions') ? true : false) : (false)}  onChange={handleChange} id='viewSubscriptions' name='viewSubscriptions' size='small' style ={{
                            color: 'white', 
                            }}
                                />}
                        label='View Subscriptions'
                    />
                </FormGroup>


                <button type='submit'>Update</button>
                <button><Link to="/users">Cancel</Link></button>
            </form>
        </React.Fragment>
    )
}
export default EditUserComp;
