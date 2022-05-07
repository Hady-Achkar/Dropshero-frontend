import React from 'react';
import * as Sentry from '@sentry/browser';
import {Integrations} from '@sentry/tracing';

const useAppInit = () => {
    Sentry.init({
        dsn: "https://8ad01f95bdbb4d719c2e76a14a742a26@o912904.ingest.sentry.io/6200766",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 0.25,
    });
};
export default useAppInit
