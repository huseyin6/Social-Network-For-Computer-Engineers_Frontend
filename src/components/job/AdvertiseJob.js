import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {advertiseJob} from '../../actions/job';
import Alert from '../layout/Alert';

const AdvertiseJob = ({advertiseJob}) => {
    const [formData, setFormData] = useState({title: '', status: '', description: ''});
    const {title, status, description} = formData;
    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return(
        <section className='container'>
        <Alert />
        <form className='form'
        onSubmit={(e) => {
        e.preventDefault();
        advertiseJob(formData);
        }}>
        <h1 className='large text-primary'>Advertise Job</h1>
        <small>* Required field</small>
        <div className='form-group'>
        <input type="text" placeholder='* Title' name='title' value={title} onChange={(e) => onChange(e)} required/>
        </div>
        <div className='form-group'>
        <input type="text" placeholder='* Status' name='status' value={status} onChange={(e) => onChange(e)} required/>
        </div>
        <div className='form-group'>
        <textarea placeholder='* Description' name='description' value={description} cols='30' rows='5' onChange={(e) => onChange(e)} required></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        </form>
        </section>
    );
};

AdvertiseJob.propTypes= {
    advertiseJob: PropTypes.func.isRequired
};
export default connect(null, { advertiseJob })(AdvertiseJob);