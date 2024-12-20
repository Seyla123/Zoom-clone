"use client"

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface TableProps {
  title: string,
  description: string
}
const Table = ({ title, description }: TableProps) => {
  return (
    <div className='flex flex-col items-start gap-2 xl:flex-row '>
      <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}:</h1>
      <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
    </div>
  )
}
function PeronalRoom() {
  const { user } = useUser();
  const router = useRouter();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`
  const client = useStreamVideoClient();
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!)

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  }
  return (
    <section className='flex size-full flex-col gap-10 text-white '>
      <h1 className='text-3xl font-bold'>
        Peronal Room
      </h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px] py-6 px-4 rounded-lg bg-dark-1">
        <Table
          title='Topic'
          description={`${user?.username}'s meeting room`}
        />
        <Table
          title='Meeting ID'
          description={meetingId!}
        />
        <Table
          title='Invite Link'
          description={meetingLink!}
        />
        <div className="flex gap-5">
          <Button className='bg-blue-1' onClick={startRoom}>
            Start the meeting
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(meetingLink!);
              toast({
                title: "Link Copied",
              });
            }}
            className="bg-dark-4 px-6"
          >
            <Image
              src="/icons/copy.svg"
              alt="feature"
              width={20}
              height={20}
            />
            &nbsp; Copy Invitation
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PeronalRoom