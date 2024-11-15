"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast"

function MeetingTypeList() {
    const router = useRouter();
    const { toast } = useToast()

    const [meetingState, setMeetingState] = useState<
        "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>();
    const { user } = useUser()
    const client = useStreamVideoClient();
    const [callDetails, setCallDetails] = useState<Call>()
    const [values, setValues] = useState({
        dataTime: new Date(),
        description: '',
        link: ''
    })

    const createMeeting = async () => {
        if (!user || !client) return;
        if(!values.dataTime){
            toast({
                title: 'Fail to create a meeting',
                description: `Please select a date`,
                variant: "destructive",
            })
            return
        }

        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create call');

            const startsAt = values.dataTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call);
            toast({
                title: 'Meeting created successfully',
            })

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
        } catch (error) {
            console.log('this is an error : ', error);
            toast({
                title: 'Fail to create a meeting',
            })

        }
    };

    const typeList = [
        {
            title: "New Meeting",
            description: "Start an instant meeting",
            img: "/icons/add-meeting.svg",
            handleClick: () => {
                setMeetingState("isInstantMeeting");
            },
            className: "bg-orange-1",
        },
        {
            title: "Scheduled Meeting",
            description: "Plan your meeting",
            img: "/icons/schedule.svg",
            handleClick: () => {
                setMeetingState("isScheduleMeeting");
            },
            className: " bg-blue-1",
        },
        {
            title: "View Records",
            description: "Check out your recordings",
            img: "/icons/recordings.svg",
            handleClick: () => router.push("/recordings"),
            className: "bg-purple-1",
        },
        {
            title: "Join Meeting",
            description: "vai invitation link",
            img: "/icons/join-meeting.svg",
            handleClick: () => {
                setMeetingState("isJoiningMeeting");
            },
            className: "bg-yellow-1",
        },
    ];

    console.log("this meeting state : ", meetingState);
    console.log("state : ", meetingState === "isInstantMeeting");


    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {typeList.map((item, index) => {
                return (
                    <HomeCard
                        key={index}
                        img={item.img}
                        title={item.title}
                        description={item.description}
                        handleClick={item.handleClick}
                        className={item.className}
                    />
                );
            })}
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an instant meeting"
                buttonText="Start Meeting"
                className="text-center"
                handleClick={createMeeting}
            />
        </section>
    );
}

export default MeetingTypeList;
