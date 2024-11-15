import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

function Home() {
  const dateNow = new Date();
  // get current time only 2 digit 
  const time = dateNow.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  // get current date and format 
  const date = (new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full' 
  })).format(dateNow);

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px]
        bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between px-5 py-8 lg:p-11'>
          {/* upcoming meeting title */}
          <h2 className='max-w-[270px] glassmorphism rounded py-2 text-center text-base font-normal'>
            Upcoming Meeting at 12:30 PM
          </h2>
          {/* current date and time */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>
        <MeetingTypeList/>
    </section>
  )
}

export default Home