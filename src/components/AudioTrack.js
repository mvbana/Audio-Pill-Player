import React, { useEffect, useRef } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FaTrash, FaArrowUp } from "react-icons/fa";

const AudioTrack = ({
  track,
  onDelete,
  onMoveUp,
  onMoveDown,
  isPlaying,
  onPlayToggle,
}) => {
  const audioRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.pause();
    }
  };
  useEffect(() => {
    if (!isPlaying) {
      stopAudio();
    }
  }, [isPlaying]);

  return (
    <div className="audio-track">
      <H5AudioPlayer
        ref={audioRef}
        src={track.url}
        autoPlay={false}
        customControls={[]}
        onPlay={() => onPlayToggle(track.id)}
        onEnded={() => onPlayToggle(null)}
        style={{ width: "80%", overflow: "hidden" }}
      />
      <div className="track-controls">
        <FaArrowUp
          onClick={onMoveUp}
          title="Move Up"
          style={{ marginRight: "5px" }}
        />
        <FaTrash onClick={() => onDelete(track.id)} title="Delete" />
        <FaArrowUp
          onClick={onMoveDown}
          title="Move Down"
          style={{ transform: "rotate(180deg)" }}
        />
      </div>
    </div>
  );
};

export default AudioTrack;
