// localStorageHelpers.js
export const addAppliedJob = (jobId) => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
  };
  
  export const addDeclinedJob = (jobId) => {
    const declinedJobs = JSON.parse(localStorage.getItem('declinedJobs')) || [];
    if (!declinedJobs.includes(jobId)) {
      declinedJobs.push(jobId);
      localStorage.setItem('declinedJobs', JSON.stringify(declinedJobs));
    }
  };
  
  export const isJobAppliedOrDeclined = (jobId) => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    const declinedJobs = JSON.parse(localStorage.getItem('declinedJobs')) || [];
    return appliedJobs.includes(jobId) || declinedJobs.includes(jobId);
  };
  