import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../../constants/env.constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CourseService } from "../../../../service/courseService";
import { FaRedo, FaStepForward, FaCheckCircle } from "react-icons/fa";

interface Props {
  courseId: string;
  moduleId: string;
  chapterId: string;
  lectureId: string;
  videoUrl: string;
  hasVideo: boolean;
  content: string;
  isCompleted: boolean;
  initialWatchedTime?: number;
  onComplete?: (chapterId: string) => void;
}

const VideoPlayer: React.FC<Props> = ({
  courseId,
  moduleId,
  chapterId,
  lectureId,
  videoUrl,
  isCompleted,
  content,
  hasVideo,
  initialWatchedTime = 0,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialWatchedTime);
  const [duration, setDuration] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasSeeked = useRef(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying && duration > 0) {
        const current = videoRef.current.currentTime;
        const isVideoCompleted = current >= duration - 5;
        saveProgress(current, isVideoCompleted);
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

      if (completed) {
        setVideoEnded(true);
      }
    } catch (err) {
      console.error("Progress save error:", err);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  const handleNext = () => {
    setVideoEnded(false);
    onComplete?.(chapterId);
  };

  const handleMarkAsCompleted = async () => {
    try {
      // setLoading(true);
      // await saveProgress(0, true);
      onComplete?.(chapterId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-border">
      {hasVideo ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={`${BACKEND_URL}${videoUrl}`}
            className="w-full h-full"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) =>
              setCurrentTime((e.target as HTMLVideoElement).currentTime)
            }
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              setDuration(video.duration);

              if (!hasSeeked.current && initialWatchedTime > 0) {
                video.currentTime = initialWatchedTime;
                hasSeeked.current = true;
              }
            }}
            onEnded={() => {
              setVideoEnded(true);
              saveProgress(duration, true); // Ensure final save
            }}
          />

          {videoEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
              <div className="flex space-x-4">
                <button
                  onClick={handleReplay}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaRedo /> Replay
                </button>
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                  <FaStepForward /> Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full p-4 text-white overflow-auto flex flex-col justify-between">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="mt-6 text-center">
            <button
              onClick={handleMarkAsCompleted}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 mx-auto"
            >
              <FaCheckCircle /> {loading ? "Marking..." : "Mark as Completed"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
