import React, { useEffect, useState } from 'react'

export default function Admin(props) {
    const [apts, setApts] = useState({})
    useEffect(() => {
        const total = props.drizzle.contracts.DonatETH.methods.getAllAppointment().call().then(total => {
            const data = {}
            console.log({total})
            for(let i = 0; i < total; i++) {
                console.log(i)
                props.drizzle.contracts.DonatETH.methods.getAppointment(i).call().then(apt => {
                    data[i] = apt;
                    console.log(apt)
                    if(i === total - 1) {
                        setApts(data)
                        console.log(data)
                    }
                })
            }
        })

        total.then(res => console.log({ res }))
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
