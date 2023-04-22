import { useMoralis } from "react-moralis"
import { ConnectButton, Avatar } from 'web3uikit'

import metamasksvg from './metamasksvg'




const Login = () => {

    const { authenticate, authError, isAuthenticated, logout, user } = useMoralis();

    return (
        <div>
            {isAuthenticated ? (
                <div className='px-10 py-3 bg-white rounded-lg flex-col'>
                    <h2>Welcome 😃{user.get("username")} </h2>
                    <div class="flex flex-row">
                        <Avatar isRounded theme="image" />
                        <ConnectButton />
                    </div>
                </div>
            ) : (
                <ConnectButton />
            )
            }
        </div >
    )
}
export default Login