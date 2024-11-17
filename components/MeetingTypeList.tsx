"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
function MeetingTypeList() {
  const router = useRouter();
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState({
    dataTime: new Date(),
    description: "",
    link: "",
  });

  const createMeeting = async () => {
    if (!user || !client) return;
    if (!values.dataTime) {
      toast({
        title: "Fail to create a meeting",
        description: `Please select a date`,
        variant: "destructive",
      });
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dataTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      toast({
        title: "Meeting created successfully",
      });

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log("this is an error : ", error);
      toast({
        title: "Fail to create a meeting",
      });
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
   
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  
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
      {/* schedule modal */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a scheduled meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="title schedule"
              className="text-base text-normal leading-[22px] text-sky-2"
            >
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3
                            focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <label
              htmlFor="title schedule"
              className="text-base text-normal leading-[22px] text-sky-2"
            >
              Select a date
            </label>
           <ReactDatePicker
              selected={values.dataTime}
              onChange={(date) => setValues({ ...values, dataTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
           />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting created"
          buttonText="Copy Meeting Link"
          image='/icons/checked.svg'
          buttonIcon="/icons/copy.svg"
          className="text-center"
          handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({
                title: "Meeting link copied",
              });
          }}
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        buttonText="Start Meeting"
        className="text-center"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        buttonText="Join Meeting"
        className="text-center"
        handleClick={()=> router.push(values.link)}
      >
        
      </MeetingModal>
    </section>
  );
}

export default MeetingTypeList;
