import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../../constants/env.constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CourseService } from "../../../../service/courseService";

interface Props {
  courseId: string;
  moduleId: string;
  chapterId: string;
  lectureId: string;
  videoUrl: string;
  initialWatchedTime?: number; // seconds
}

const VideoPlayer: React.FC<Props> = ({
  courseId,
  moduleId,
  chapterId,
  lectureId,
  videoUrl,
  initialWatchedTime = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialWatchedTime);
  const [duration, setDuration] = useState(0);
  const [progressSaved, setProgressSaved] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user); // assuming you store user in redux

  // Auto-resume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = initialWatchedTime;
    }
  }, [initialWatchedTime]);

  // Save progress every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying && duration > 0) {
        const current = videoRef.current.currentTime;
        const isCompleted = current >= duration - 5; // Allow 5s leeway
        saveProgress(current, isCompleted);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const saveProgress = async (time: number, completed: boolean) => {
    try {
      if (!user?._id) return;

      await CourseService.updateLectureProgress(
        courseId,
        moduleId,
        chapterId,
        lectureId,
        time,
        completed
      );

      setProgressSaved(true);

      setTimeout(() => setProgressSaved(false), 3000); // Reset UI message
    } catch (err) {
      console.error("Progress save error:", err);
      setProgressSaved(false);
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-border">
      <video
        ref={videoRef}
        src={`${BACKEND_URL}${videoUrl}`}
        className="w-full h-full"
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          const current = (e.target as HTMLVideoElement).currentTime;
          setCurrentTime(current);
        }}
        onLoadedMetadata={(e) => {
          const duration = (e.target as HTMLVideoElement).duration;
          setDuration(duration);
        }}
      />

      {/* Optional UI overlay */}
      <div className="absolute bottom-2 right-4 text-xs text-gray-300 bg-black/60 px-2 py-1 rounded-md">
        {progressSaved ? "Progress saved ✅" : "Watching..."}
      </div>
    </div>
  );
};

export default VideoPlayer;
