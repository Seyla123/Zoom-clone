import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

function useGetCalls() {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;
            setIsLoading(true);
            try {
                // Query calls from the client, filtering and sorting them
                const { calls } = await client.queryCalls({
                    sort: [{
                        field: "starts_at",
                        direction: -1
                    }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } }
                        ]
                    },
                });
                setCalls(calls);
            } catch (error) {
                console.log('this is an error : ', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadCalls();
    }, [client, user?.id]);

    const now = new Date();
    // Filter out calls that have ended
    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now) || !!endedAt;
    });
    // Filter out upcoming calls
    const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
    });

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading
    };
}

export default useGetCalls;
