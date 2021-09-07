import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button } from '@chakra-ui/react';
import InputField from './InputField';
import { useToast } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import firebase from "firebase";
import * as Yup from 'yup';

export default function LoginForm() {
    const [isAuthSuccess, setIsAuthSuccess] = useState(false);
    const toast = useToast();

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Username is required'),
        password: Yup.string().required("Password is required")
    });

    const handleSubmit = async (values, actions) => {
        const { email, password } = values;

        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
            setIsAuthSuccess(true);

            actions.setSubmitting(false);
            actions.resetForm({
                values: {...formInitialValues}
            });

            //update state
            console.log(user);

        }).catch(err => {
            let err_message;
            actions.setSubmitting(false);

            if(err.code === 'auth/user-not-found'){
                err_message = "The credential does not match any record. Check it and try again"
            }else if(err.code === 'auth/network-request-failed'){
                err_message = "Please check your network connection and try again"
            }else{
                err_message = "Something went wrong. Please refresh the page and try again"
            }


            console.log(err)

            toast({
                position: "top-left",
                title: 'Something went wrong',
                description: err_message,
                duration: 4000,
                isClosable: true,
                status: 'error'
            });
        });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
               handleSubmit(values, actions);
            }}
        >
            {(props) => {
                return (
                    <Form>
                        <InputField 
                            fieldName="email"
                            labelName="Username"
                            placeHolder="youremail@gmail.com"
                            fieldType="email"
                        />
                        <InputField 
                            fieldName="password"
                            labelName="Password"
                            placeHolder="**********"
                            fieldType="password"
                        />
                        <Button
                            width="full"
                            bg={isAuthSuccess ? "green.800" : "black"}
                            color="white" 
                            rounded="full" 
                            marginY="5" 
                            paddingY="7"
                            isDisabled={!props.isValid}
                            isLoading={props.isSubmitting}
                            type="submit"
                            _hover={isAuthSuccess ? {bgColor: "green.800"} : { bgColor: "black"}}
                            _focus={{ outline: "none"}}
                        >
                            {isAuthSuccess ? <FaCheck /> : "Login"}
                        </Button> 
                    </Form>
                )
            }}
        </Formik>
    )
}