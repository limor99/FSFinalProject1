import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';

import MemberMenu from './menu/MemberMenu';
import membersUtil from '../../Utils/membersUtil';

function EditMemberComp(props) {
    const [msg, setMsg] = useState();
    const members = useSelector(state => state.members);
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
            let updateddMember = values;
            updateddMember.id = props.match.params.id;
            
            let resp = await membersUtil.updateMember(updateddMember);

            if(resp.success){
                dispatch({
                    type: "UpdateMember",
                    payload: updateddMember
                })
                //formik.resetForm();
                setMsg(resp.msg);
            }
            else{
                setMsg(resp.msg);
                
            }
        },
    });

    useEffect(() => {
        let memberId = props.match.params.id;
        let member = members.filter(m => m._id === memberId)[0];
        
        let fields = ['name', 'email', 'city'];

        fields.forEach(field => {
            formik.setFieldValue(field, member[field]);
        });
    }, [])

    return (
        <div>
            <React.Fragment>
                <MemberMenu/>
                {msg}
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                        value={formik.values.name}
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
                        value={formik.values.email}
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
                        value={formik.values.city}                        
                    />
                    
                    {formik.touched.city && formik.errors.city ? (
                        <div>{formik.errors.city}</div>
                    ) : null}
                    <br/>

                    <button type='submit'>Submit</button>
                    <button><Link to="/subscriptions">Cancel</Link></button>


                </form>
            </React.Fragment>
        </div>
    )
}

export default EditMemberComp
