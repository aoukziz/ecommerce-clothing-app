import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle, auth} from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

const SignIn = () => {
    const [signInState, setSignInState] = useState({email: '', password: ''});
    const {email, password} = signInState;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setSignInState({email: '', password: ''});
        } catch (error) {
           console.log(error);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSignInState({...signInState, [name]: value});
    }
    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" handleChange={handleChange} type="email" name='email'  value={email} required  />
                <FormInput label="Password" handleChange={handleChange} type="password" name='password' value={password} required  />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;
