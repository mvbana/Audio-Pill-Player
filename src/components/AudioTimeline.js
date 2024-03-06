import React, { useState } from "react";
import AudioTrack from "./AudioTrack";

const AudioTimeline = ({ tracks, setTracks }) => {
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const handleDeleteTrack = (trackId) => {
    const updatedTracks = tracks.filter((track) => track.id !== trackId);
    setTracks(updatedTracks);
  };

  const handleMoveTrack = (trackId, direction) => {
    const currentIndex = tracks.findIndex((track) => track.id === trackId);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < tracks.length) {
      const updatedTracks = [...tracks];
      [updatedTracks[currentIndex], updatedTracks[newIndex]] = [
        updatedTracks[newIndex],
        updatedTracks[currentIndex],
      ];
      setTracks(updatedTracks);
    }
  };
  const handlePlayToggle = (trackId) => {
    setPlayingTrackId(trackId === playingTrackId ? null : trackId);
  };

  return (
    <div className="audio-timeline">
      {tracks.map((track, index) => (
        <AudioTrack
          key={track.id}
          track={track}
          onDelete={handleDeleteTrack}
          onMoveUp={() => handleMoveTrack(track.id, -1)}
          onMoveDown={() => handleMoveTrack(track.id, 1)}
          isPlaying={playingTrackId === track.id}
          onPlayToggle={handlePlayToggle}
        />
      ))}
    </div>
  );
};

export default AudioTimeline;
