import Image from 'next/image'
import { Button } from './ui/button'
import { avatarImages } from '@/constants'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}
function MeetingCard({
    title,
    date,
    icon,
    isPreviousMeeting,
    buttonIcon1,
    buttonText,
    handleClick,
    link,
}: MeetingCardProps) {
    return (
        <section className='flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 '>
            <article className='flex flex-col gap-5'>
                <Image
                    src={icon}
                    width={28}
                    height={28}
                    alt='icon'
                />
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-bold'>{title}</h1>
                        <p className='text-base text-normal '>{date}</p>
                    </div>
                </div>
            </article>
            <article className='flex flex-col gap-2'>
                <div className='relative flex w-full max-sm:hidden'>
                    {avatarImages.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                src={image}
                                alt="Avatar"
                                width={40}
                                height={40}
                                className={cn('rounded-full top-0', { '-ml-4': index > 0 })}
                            />
                        )
                    })}
                    <div className="flex-center -ml-4 size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
                            {buttonIcon1 && (
                                <>
                                    <Image src={buttonIcon1} alt="feature" width={20} height={20} />
                                    &nbsp;
                                </>
                            )}
                            {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
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
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard