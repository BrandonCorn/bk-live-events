import { useState } from 'react';
import Router from 'next/router';
import { useRequest } from '../../hooks/useRequest';
import constants from '../../constants/apiRoutes';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { USER_SIGN_IN } = constants;
    const signUpRequest = useRequest({
        ...USER_SIGN_IN,
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/'),
    })

    const submitSignIn = async (e) => {
        e.preventDefault();
        await signUpRequest.doRequest()
    }


    return (
        <form onSubmit={submitSignIn}>
            <h1> Sign In </h1>
            <div className = 'm-3'>
                <div className='form-group'>
                    <label htmlFor='signup-email-address'>
                        Email Address 
                    </label>
                    <input type = 'email' id='signup-email-address' className='form-control' onChange={ e => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='signup-password'>
                        Password 
                    </label>
                    <input type='password' id='signup-password' className='form-control' onChange={ e => setPassword(e.target.value)} />
                </div>
                {signUpRequest.errors}
                <button className = 'btn btn-primary'> 
                    Submit 
                </button>
            </div>
        </form>
    )
}

export default SignIn;