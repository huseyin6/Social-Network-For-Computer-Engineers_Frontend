import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecommendedJobs } from '../../actions/job';
import JobItem from '../job/JobItem';

const Recommendations = ({ getRecommendedJobs, recommendations }) => {
  useEffect(() => {
    getRecommendedJobs();
  }, [getRecommendedJobs]);

  return (
    <div className="container">
      <h1 className="large text-primary">Recommended Jobs</h1>
      <div className="jobs">
        {recommendations.map((job) => (
          <JobItem key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

Recommendations.propTypes = {
  getRecommendedJobs: PropTypes.func.isRequired,
  recommendations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recommendations: state.recommendation.recommendations,
});

export default connect(mapStateToProps, { getRecommendedJobs })(Recommendations);