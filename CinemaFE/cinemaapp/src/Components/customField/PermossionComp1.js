import React from 'react';
import { useFormik } from 'formik';



function PermossionComp() {
    const formik = useFormik({
        initialValues: {
            checked: [],
        },
    
    onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    onChange: () => {
        console.log("Xcvxcv")
      },
    });

   
    return (
        <form onSubmit={formik.handleSubmit}>
             <div id="checkbox-group">Checked</div>
                <div role="group" aria-labelledby="checkbox-group"  >
                    <label>
                    <input type="checkbox" name="checked" value="One" onChange={formik.handleChange}/>
                    One
                    </label>
                    <label>
                    <input type="checkbox" name="checked" value="Two" onChange={formik.handleChange}/>
                    Two
                    </label>
                    <label>
                    <input type="checkbox" name="checked" value="Three" onChange={formik.handleChange}/>
                    Three
                    </label>
                </div>

                <button type="submit">Submit</button>
        </form>

    ) 
}

export default PermossionComp
