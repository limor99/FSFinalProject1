import React from 'react';
import { Formik, Field, Form } from 'formik';
import { computeHeadingLevel } from '@testing-library/react';


function PermossionComp(props) {

    const handleChange = (checked) =>{
        console.log(checked)
    }
   
    return (
        <Formik
            initialValues={{
                checked: [],
            }}
            onSubmit={(values) => {
                alert(values.checked);
            }}
            
        >
            
        {({ values, onChange }) => (
            
            <Form>
               
                <div id="checkbox-group">Checked</div>
                <div role="group" aria-labelledby="checkbox-group"  >
                    <label>
                    <Field type="checkbox" name="checked" value="One" handleChange={handleChange} />
                    One
                    </label>
                    <label>
                    <Field type="checkbox" name="checked" value="Two" />
                    Two
                    </label>
                    <label>
                    <Field type="checkbox" name="checked" value="Three" />
                    Three
                    </label>
                </div>

                <button type="submit">Submit</button>

            </Form>
        )}
            
        </Formik>
    )
}

export default PermossionComp
