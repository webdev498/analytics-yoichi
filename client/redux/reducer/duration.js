import { TIME_INTERVAL_UPDATE } from 'Constants';

const duration = window.localStorage.rankDuration || '1h';

export default function APIDataReducer(state = duration, action) {
  switch (action.type) {
    case TIME_INTERVAL_UPDATE: {
      const {data: duration} = action;
      window.localStorage.rankDuration = duration;
      return duration;
    }
    default: {
      return state;
    }
  }
}
