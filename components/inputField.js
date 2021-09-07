import { 
    Button,
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    Input, 
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function InputField({ fieldName, placeHolder, labelName, fieldType }){
    const [show, setShow] = React.useState(false);
    const togglePasswordVisibility = () => setShow(!show);

    if(fieldType === "password"){
        return (
            <Field className="my-3" name={fieldName}>
                {({ field, form }) => (
                    <FormControl paddingY="2" isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                        <FormLabel fontWeight="semibold" fontSize="sm" htmlFor={fieldName}>{labelName}</FormLabel>
                        <InputGroup size="md">
                            <Input
                                maxWidth="container.md"
                                borderWidth="thin"
                                borderColor="gray.400"
                                {...field}
                                id={fieldName}
                                paddingY="6"  
                                pr="4.5rem"
                                fontSize="sm"
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button mt="3" h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                                    {show ? <FiEyeOff  fontSize="16px" /> : <FiEye fontSize="16px" />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>
        )
    }else {
        return (
            <Field className="my-3" name={fieldName}>
                {({ field, form }) => (
                    <FormControl paddingY="2" isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                        <FormLabel fontWeight="semibold" fontSize="sm" htmlFor={fieldName}>{labelName}</FormLabel>
                        <Input
                            borderWidth="thin"
                            borderColor="gray.400"
                            type={fieldType} 
                            {...field} 
                            fontSize="sm"
                            id={fieldName} 
                            placeholder={placeHolder}
                            paddingY="6"  
                        />
                        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
                    </FormControl>
                )}
            </Field>
        )
    }
    
}

// Prop types Definition
InputField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    labelName: PropTypes.string.isRequired,
    fieldType: PropTypes.string.isRequired
}