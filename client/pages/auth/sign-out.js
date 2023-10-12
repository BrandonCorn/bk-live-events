import { useEffect } from 'react';
import Router from 'next/router';
import { useRequest } from '../../hooks/useRequest';
import constants from '../../constants/apiRoutes';

const SignOut = () => {
    const { url, method } = constants.USER_SIGN_OUT;
    const { doRequest } = useRequest({
        url,
        method,
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    },[]);

    return (
        <div>
            Signing you out...
        </div>
    )
}

export default SignOut;