import { App } from 'konsta/react';
import '../../styles/globals.css'

function MyApp({Component, pageProps}) {
    return <App theme="ios">
        <Component {...pageProps} />
    </App>
}

export default MyApp
