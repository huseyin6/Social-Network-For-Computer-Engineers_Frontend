import { GET_ADS, ADVERTISE_JOB, JOB_ERROR, DELETE_JOB, APPLY_JOB,ATTEND_JOB_ERROR,DECLINE_JOB,DECLINE_JOB_ERROR, GET_APPLICANTS } from "../actions/types";
const initialState = { jobs: [], job: null, loading: true, error: {}, applicants: [] };
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ADS:
            return {
                ...state,
                jobs: payload,
                loading: false,
            };
        case ADVERTISE_JOB:
        return {
            ...state,
            job: payload,
            loading: false,
        };
        case GET_APPLICANTS:
            console.log('Received GET_APPLICANTS action:', payload); 
            return {
              ...state,
              jobs: state.jobs.map((job) =>
                job._id === payload.id
                  ? { ...job, applicants: payload.applicants }
                  : job
              ),
              loading: false,
            };
        case APPLY_JOB:
        return {
            ...state,
            jobs: state.jobs.map((job) =>
            job._id === payload.id
              ? { ...job, applicants: payload.applicants }
              : job
          ),
            loading: false,
        };
        case DECLINE_JOB:
            return {
              ...state,
              jobs: state.jobs.filter((job) => job._id !== payload),
              loading: false,
            };
        case ATTEND_JOB_ERROR:
        return {
            ...state,
            job: payload,
            loading: false,
        };
        case DECLINE_JOB_ERROR:
        return {
            ...state,
            job: payload,
            loading: false,
        };
        case JOB_ERROR:
        return {
            ...state,
            error: payload,
            loading: false,
        };
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter((job) => job._id !== payload),
                loading: false,
            };
        case DECLINE_JOB_ERROR:
            return {
            ...state,
            applicants: payload,
            loading: false,
            };
        default:
            return state;
    }
}