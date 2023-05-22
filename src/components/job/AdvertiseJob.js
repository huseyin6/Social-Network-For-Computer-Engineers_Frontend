import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {advertiseJob} from '../../actions/job';
import Alert from '../layout/Alert';

const AdvertiseJob = ({advertiseJob}) => {
    const [formData, setFormData] = useState({title: '', status: '', description: '', endDate: ''});
    const {title, status, description, endDate} = formData;
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
        <p>* Required field</p>
        <small className='form-text smaller'>
         * Title
        </small>
        <div className='form-group'>
        <input type="text" 
          name='title' 
          value={title} 
          onChange={(e) => onChange(e)} 
          required/>
        </div>
        <small className='form-text smaller'>
          * Job Position
        </small>
        <div className='form-group'>
        <select name='status' value={status} required onChange={(e) => onChange(e)}>
            <option>Select</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <small className='form-text smaller'>
          * Description
        </small>
        <div className='form-group'>
        <textarea  name='description' value={description} cols='30' rows='5' onChange={(e) => onChange(e)} required></textarea>
        </div>
        <small className='form-text smaller'>
          * Closing Date
        </small>
        <div className='form-group'>
          <input
            type='date'
            name='endDate'
            value={endDate}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        <Link to='/my-ads' className='btn btn-light my-1'>
        Go Back
        </Link>
        </form>
        </section>
    );
};

AdvertiseJob.propTypes= {
    advertiseJob: PropTypes.func.isRequired
};
export default connect(null, { advertiseJob })(AdvertiseJob);