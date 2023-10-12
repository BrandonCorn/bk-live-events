import  buildClient from '../api/client';
import constants from '../constants/apiRoutes';

const Landing = ({currentUser}) => {
    return currentUser ? <h1> You are signed in </h1> : <h1> You are not signed in </h1>;
}

Landing.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { url } = constants.GET_CURRENT_USER;
    const { data } = await client.get(url);
    console.log('currentUser ', data);
    return data;
}

export default Landing;