import { GET_ADS, ADVERTISE_JOB, JOB_ERROR, DELETE_JOB } from "../actions/types";
const initialState = { jobs: [], job: null, loading: true, error: {} };
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
        default:
            return state;
    }
}