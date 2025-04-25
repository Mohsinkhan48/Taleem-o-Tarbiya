interface Props {
  videoUrl: string;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-border bg-black">
      <iframe
        src={videoUrl}
        className="w-full h-full"
        title="Course Video"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
