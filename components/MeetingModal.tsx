import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
}
function MeetingModal({
    isOpen,
    onClose,
    title,
    className,
    children,
    handleClick,
    buttonText,
    image,
    buttonIcon,
}: MeetingModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent
                className="bg-dark-2 flex w-full max-w-[520px]
            flex-col gap-6 border-none px-6 py-9 text-white"
            >
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} alt="Image" width={72} height={72} />
                        </div>
                    )}
                    <DialogTitle className={cn("text-3xl font-bold leading-[42px]", className)}>
                        {title}
                    </DialogTitle>
                    {/* render chirldren */}
                    <DialogDescription>
                        {children}
                    </DialogDescription>

                    {/* button */}
                    <Button
                        className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-1/90"
                        onClick={handleClick}
                    >
                        {/* render button icon */}
                        {buttonIcon && (
                            <Image
                                src={buttonIcon}
                                alt="button icon"
                                width={13}
                                height={13}
                            />
                        )}{" "}
                        &nbsp;
                        {/* render button text */}
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MeetingModal;
