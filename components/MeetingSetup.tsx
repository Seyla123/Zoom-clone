"use client";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function MeetingSetup({ setIsSetupCompleted }: {
    setIsSetupCompleted: (values: boolean) => void
}) {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState<boolean>(false);
    const call = useCall();

    if (!call) {
        throw new Error('useCall must be use inside StreamCall')
    }
    useEffect(() => {
        if (!isMicCamToggleOn) {
            call?.camera.enable();
            call?.microphone.enable();
        } else {
            call?.camera.disable();
            call?.microphone.disable();
        }
    }, [isMicCamToggleOn, call?.camera, call?.microphone]);
    return (
        <div
            className="flex h-screen w-full flex-col
      items-center justify-center gap-3 text-white"
        >
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label htmlFor="toggle" className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamToggleOn}
                        onChange={(e) => setIsMicCamToggleOn(e.target.checked)} />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call?.join()
                    setIsSetupCompleted(true)
                }}
            >
                Join Meeting
            </Button>
        </div>
    );
}

export default MeetingSetup;
