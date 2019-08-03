import React, { useEffect } from 'react'

export default function Admin(props) {
    useEffect(() => {
        props.drizzle.contracts.DonatETH.methods.getAllAppointments.call().then(total => {
            const data = {}
            for(let i in total) {
                props.drizzle.contracts.DonatETH.methods.getAppointment.call(i).then(apt => console.log(apt))
            }
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
