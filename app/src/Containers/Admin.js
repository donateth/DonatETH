import React, { useEffect, useState } from 'react'

export default function Admin(props) {
    const [apts, setApts] = useState({})
    useEffect(() => {
        const total = props.drizzle.contracts.DonatETH.methods.getAllAppointment().call().then(total => {
            const data = {}
            console.log(total)
            for(let i in total) {
                props.drizzle.contracts.DonatETH.methods.getAppointment(i).call().then(apt => {
                    data[i] = apt;
                    console.log(apt)
                })
            }
            setApts(data)
        })
        // return () => {
        //     cleanup
        // };
    }, [])

    return (
        <div>
            apt
        </div>
    )
}
