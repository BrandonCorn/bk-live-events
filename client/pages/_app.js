import 'bootstrap/dist/css/bootstrap.css';
import './global.css'
import  buildClient from '../api/client';
import constants from '../constants/apiRoutes';
import Header from '../components/header';

const MainComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
    )
}

MainComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { url } = constants.GET_CURRENT_USER;
    const { data } = await client.get(url);
    let pageProps = {};
    if (appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        pageProps,
        ...data
    }
}

export default MainComponent;