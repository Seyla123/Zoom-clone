import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"


function useGetCallById(id : string | string[]){
    const [call, setCall] = useState<Call>()
    const [isCalling, setIsCallLoading] = useState<boolean>(true)

    const client = useStreamVideoClient();
    useEffect(()=>{
        if(!client) return;

        const loadCall = async()=>{
            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        id
                    }
                })
    
                if(calls.length > 0) setCall(calls[0])
            } catch (error) {
                console.log('this is an error : ', error);
                
            }finally{
                setIsCallLoading(false)
            }
        }
        loadCall();
    },[id, client])

    return { call, setIsCallLoading }
}

export default useGetCallById