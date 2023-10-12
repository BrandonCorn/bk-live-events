import { useState } from 'react';
import buildClient from '../api/client';

export const useRequest = ({url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        setErrors(null);
        try{
            const client = buildClient();
            const response = await client[method](url, body);
            if (onSuccess){
                onSuccess(response.data);
            }
            return response.data;
        }
        catch(err) {
            console.log('error ', err);
            const errs = err.response.data.errors;
            setErrors(
                <div className='alert alert-danger'>
                    <h4> 
                        Uh oh
                    </h4>
                    <ul className='my-0'>
                        {errs.map((e, i) => {
                            return (<li key={i}> {e.message} </li>)
                        })}
                    </ul>
                </div>
            )
        }
    };

    return { doRequest, errors }
}