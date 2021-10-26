import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

const SignUp = () => {
    const [signUpState, setSignUpState] = useState({displayName: '', email: '', password: '', confirmPassword: '' });
    const {displayName, email, password, confirmPassword} = signUpState;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            setSignUpState({displayName: '', email: '', password: '', confirmPassword: '' });

        } catch (error) {
            console.error(error);
        }
        
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSignUpState({...signUpState, [name]: value});
    }
    return (
        <div className='sign-pn'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput label="Display Name" handleChange={handleChange} type='text' name='displayName' value={displayName} required  />
                <FormInput label="Email" handleChange={handleChange} type="email" name='email'  value={email} required  />
                <FormInput label="Password" handleChange={handleChange} type="password" name='password' value={password} required  />
                <FormInput label="Confirm Password" handleChange={handleChange} type="password" name='confirmPassword' value={confirmPassword} required  />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    )
}

export default SignUp;
