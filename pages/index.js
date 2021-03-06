import React, { useRef, useState } from 'react'
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  useAuthUser
} from 'next-firebase-auth'
import Header from '../components/Header'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa'
import FullPageLoader from '../components/FullPageLoader'
import firebase from "firebase"
import { useToast } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const AuthUser = useAuthUser();

  console.log(AuthUser.email);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <Header title="Home Page" />
        <div className="w-full h-full">
              <div className="w-full h-full flex flex-row-reverse">
                  <div className="lg:block hidden w-1/2 h-full bg-purple-900 px-20 text-white">
                    <div className="h-full w-full flex flex-col justify-center text-left">
                        <h1 className="text-3xl font-extrabold py-5 mb-4">Welcome, Bowenite</h1>
                        <p className="text-lg xl:text-base pt-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna aliqua?. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_LOGIN,
})()

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: FullPageLoader,
})(Login)
