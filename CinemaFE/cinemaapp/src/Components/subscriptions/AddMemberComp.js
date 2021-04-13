import React, {useState} from 'react';
import {Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import MemberMenu from '../subscriptions/menu/MemberMenu';

import membersUtil from '../../Utils/membersUtil';

function AddMemberComp() {
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            city: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
              .min(5, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            email: Yup.string()
                .required("Please enter valid email")
                .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is not valid"),
            city: Yup.string()
              .min(3, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
        }),
        onSubmit: async (values) => {
            let addedMember = values;
            let resp = await membersUtil.addMember(addedMember);
            
            
          if(resp.success){
                addedMember._id = resp.memberId;
              
                dispatch({
                    type: "AddMember",
                    payload: addedMember
                })
                formik.resetForm();
                setMsg(resp.msg);
            }
            else{
                setMsg(resp.msg);
                
            }
        },
    });
    return (
        <React.Fragment>
            <MemberMenu/>
            {msg}
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                
                {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                ) : null}
                <br/>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <br/>

                 <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    {...formik.getFieldProps('city')}
                />
                
                {formik.touched.city && formik.errors.city ? (
                    <div>{formik.errors.city}</div>
                ) : null}
                <br/>

                <button type='submit'>Submit</button>
                <button><Link to="/subscriptions">Cancel</Link></button>


            </form>
        </React.Fragment>
        
    )
}

export default AddMemberComp
