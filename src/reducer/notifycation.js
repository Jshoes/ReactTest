const NOTIFY_TOP = 'NOTIFY_TOP'
export default function notification(state = { message: '' }, action) {
  switch (action.type) {
    case NOTIFY_TOP:
      return {
        ...state,
        message: action.caller.status,
        level: (action.caller.status === 200 ? 'success' : 'error'),
      };
    default:
      return state;
  }
}
