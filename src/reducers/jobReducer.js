import {
  FETCH_JOB_LOGS_BEGIN,
  FETCH_JOB_LOGS_FAILURE,
  FETCH_JOB_LOGS_SUCCESS,
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_SUCCESS,
  REMOVE_JOB_LOGS,
  SET_LOADING,
  SET_NEW_JOB_ENVIRONMENT_VARIABLES,
  SET_NEW_JOB_INPUTS,
  SET_NEW_JOB_VOLUMES,
  SET_NEW_JOB_VOLUME_MOUNTS,
  SET_NEW_JOB_PARAMETERS,
  SET_NEW_JOB_HYPER_PARAMETERS,
  SET_NEW_JOB_SCHEDULE,
  SET_NEW_JOB_SECRET_SOURCES,
  REMOVE_NEW_JOB,
  SET_NEW_JOB
} from '../constants'

const initialState = {
  jobs: [],
  logs: '',
  loading: false,
  error: null,
  newJob: {
    schedule: '',
    task: {
      spec: {
        parameters: {},
        inputs: {},
        hyperparams: {},
        secret_sources: []
      }
    },
    function: {
      spec: {
        volumes: [],
        volumeMounts: [],
        env: {}
      }
    }
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_JOBS_BEGIN:
      return {
        ...state,
        loading: true
      }
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: payload,
        loading: false
      }
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        jobs: [],
        loading: false,
        error: payload
      }
    case FETCH_JOB_LOGS_BEGIN:
      return {
        ...state,
        loading: true
      }
    case FETCH_JOB_LOGS_SUCCESS:
      return {
        ...state,
        logs: payload,
        loading: false
      }
    case FETCH_JOB_LOGS_FAILURE:
      return {
        ...state,
        logs: [],
        loading: false,
        error: payload
      }
    case REMOVE_JOB_LOGS:
      return {
        ...state,
        logs: ''
      }
    case SET_NEW_JOB_ENVIRONMENT_VARIABLES:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          function: {
            ...state.newJob.function,
            spec: {
              ...state.newJob.function.spec,
              env: payload
            }
          }
        }
      }
    case SET_NEW_JOB_INPUTS:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          task: {
            ...state.newJob.task,
            spec: {
              ...state.newJob.task.spec,
              inputs: payload
            }
          }
        }
      }

    case SET_NEW_JOB_SECRET_SOURCES:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          task: {
            ...state.newJob.task,
            spec: {
              ...state.newJob.task.spec,
              secret_sources: payload
            }
          }
        }
      }
    case SET_NEW_JOB_VOLUMES:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          function: {
            ...state.newJob.function,
            spec: {
              ...state.newJob.function.spec,
              volumes: payload
            }
          }
        }
      }
    case SET_NEW_JOB_VOLUME_MOUNTS:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          function: {
            ...state.newJob.function,
            spec: {
              ...state.newJob.function.spec,
              volumeMounts: payload
            }
          }
        }
      }
    case REMOVE_NEW_JOB:
      return {
        ...state,
        newJob: {
          schedule: '',
          task: {
            spec: {
              parameters: {},
              inputs: {},
              hyperparams: {},
              secret_sources: []
            }
          },
          function: {
            spec: {
              volumes: [],
              volumeMounts: [],
              env: {}
            }
          }
        }
      }
    case SET_NEW_JOB_PARAMETERS:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          task: {
            ...state.newJob.task,
            spec: {
              ...state.newJob.task.spec,
              parameters: payload
            }
          }
        }
      }
    case SET_NEW_JOB_SCHEDULE:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          schedule: payload
        }
      }
    case SET_NEW_JOB_HYPER_PARAMETERS:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          task: {
            ...state.newJob.task,
            spec: {
              ...state.newJob.task.spec,
              hyperparams: payload
            }
          }
        }
      }
    case SET_NEW_JOB:
      return {
        ...state,
        newJob: {
          ...state.newJob,
          task: {
            ...state.newJob.task,
            spec: {
              ...state.newJob.task.spec,
              parameters: payload.parameters,
              inputs: payload.inputs,
              secret_sources: payload.secret_sources
            }
          },
          function: {
            ...state.newJob.function,
            spec: {
              ...state.newJob.function.spec,
              volumeMounts: payload.volumeMounts,
              volumes: payload.volumes,
              env: payload.environmentVariables
            }
          }
        }
      }
    case SET_LOADING: {
      return {
        ...state,
        loading: payload
      }
    }
    default:
      return state
  }
}
