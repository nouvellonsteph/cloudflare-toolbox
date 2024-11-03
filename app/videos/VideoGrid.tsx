'use client';

import { useState, useEffect, useRef } from 'react';
import { useVideoStore } from '@/lib/store';
import Hls from 'hls.js';

interface Video {
  uid: string;
  thumbnail: string;
  duration: number;
  meta: {
    name: string;
  };
  playback: {
    hls: string; // assuming playback URL is available in API response
  }
}


export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); // Track clicked video
  const { apiToken } = useVideoStore();
  const { accountId } = useVideoStore();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apicorsproxy.justalittlebyte.ovh/client/v4/accounts/${accountId}/stream`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiToken) {
      fetchVideos();
    }
  }, [apiToken]);

  const handleClickVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <div
            key={video.uid}
            className="bg-white rounded-lg shadow-cf hover:shadow-cf-hover transition-shadow cursor-pointer"
            onClick={() => handleClickVideo(video)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={video.thumbnail}
                alt={video.meta.name}
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-cf-dark truncate">
                {video.meta.name}
              </h3>
              <p className="text-cf-gray text-sm mt-1">
                Duration: {Math.round(video.duration)}s
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cf-orange border-t-transparent"></div>
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          {/* Close button positioned at the top right */}
          <button
            className="absolute top-4 right-4 text-white text-4xl z-60"
            onClick={handleClosePlayer}
          >
            &times;
          </button>

          <div className="relative w-full max-w-2xl">
            <HLSPlayer src={selectedVideo.playback.hls} />
          </div>
        </div>
      )}
    </div>
  );
}

function HLSPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return (
    <video ref={videoRef} controls autoPlay className="w-full rounded-lg" />
  );
}
