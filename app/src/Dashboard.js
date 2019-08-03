import React, { useEffect, useState } from 'react'
import { drizzleConnect } from 'drizzle-react'



const Dashboard = props => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    console.log(props)
    useEffect(() => {
        const user = props.drizzle.contracts.DonatETH.methods.getUserByAddress(props.accounts[0]).call().then(res => {
            setUser(res)
            setLoading(true)
        })
        // return () => {
        //     cleanup
        // };
    }, [])
    
    return (
        <div>
            {user['0']}
            {user['1']}
            {user['2']}
        </div>
        )
}

export default drizzleConnect(Dashboard, state => {
    return {
        accounts: state.accounts
    }
})
