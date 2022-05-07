import * as Sentry from '@sentry/browser'

//@ts-ignore
const handleError = (err) => {
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(err)
        if (err.response) {
            Sentry.captureMessage(err.response.data.message)
        } else {
            Sentry.captureMessage(err)
        }
    } else {
        if (err.response) console.log(err.response.data.message)
        else console.log(err)
    }
}
export default handleError
