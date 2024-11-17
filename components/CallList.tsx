/**
 *  * This component renders a list of meetings based on the provided type. 
 * - "ended": Displays meetings that have already occurred.
 * - "upcoming": Displays meetings that are scheduled to occur in the future.
 * - "recordings": Displays recorded meetings with playback options.
 * 
 * Usage:
 * <CallList type="ended" />
 */
"use client";

import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import useGetCalls from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";

interface CallListProps {
    type: "ended" | "upcoming" | "recordings";
}
function CallList({ type }: CallListProps) {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
        useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const [isRecordLoading, setIsRecordLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls;
            case "upcoming":
                return upcomingCalls;
            case "recordings":
                return recordings;
            default:
                return [];
        }
    };
    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "No Previous calls.";
            case "upcoming":
                return "No upcoming calls yet.";
            case "recordings":
                return "No recordings.";
            default:
                return "";
        }
    };
    const getIcon = () => {
        switch (type) {
            case "ended":
                return "/icons/previous.svg";
            case "upcoming":
                return "/icons/upcoming.svg";
            case "recordings":
                return "/icons/recordings.svg";
            default:
                return "/icons/recordings.svg";
        }
    };

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    const icon = getIcon();

    useEffect(() => {
        const fetchRecordings = async () => {
            setIsRecordLoading(true);
            try {
                const callData = await Promise.all(
                    callRecordings.map((meeting) => {
                        return meeting.queryRecordings();
                    })
                );

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);

                setRecordings(recordings);
            } catch (error) {
                toast({
                    title: "Error, Try again later ",
                })
            } finally {
                setIsRecordLoading(false);
            }
        };
        fetchRecordings();
    }, [type, callRecordings]);


    if (isLoading || isRecordLoading) return <Loader />;

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording, index) => {
                    const meetingItem = meeting as Call;
                    return (
                        <MeetingCard
                            key={`${meetingItem.id}+${index}`}
                            title={
                                meetingItem.state?.custom?.description?.substring(0, 26) || meetingItem?.filename?.substring(0, 26) ||
                                "Personal Meeting"
                            }
                            date={
                                meetingItem.state?.startsAt?.toLocaleDateString() || new Date(meetingItem?.start_time).toLocaleDateString()|| "No date"
                            }
                            isPreviousMeeting={type === "ended"}
                            icon={icon}
                            buttonIcon1={
                                type === "recordings" ? "/icons/play.svg" : undefined
                            }
                            buttonText={type === "recordings" ? "Play" : "Start"}
                            handleClick={
                                type === "recordings"
                                    ? () => router.push(`${meetingItem.url}`)
                                    : () => router.push(`/meeting/${meetingItem.id}`)
                            }
                            link={
                                type === "recordings"
                                    ? `${meetingItem.url}`
                                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingItem.id}`
                            }
                        />
                    );
                })
            ) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
}

export default CallList;



