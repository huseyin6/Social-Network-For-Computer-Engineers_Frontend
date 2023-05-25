import React, { useState, useEffect, useCallback } from 'react';
import { YOUTUBE_API_KEY } from '../../urlconfig';
import styles from './Videos.module.css';
import { InView } from 'react-intersection-observer';
import '../../App.css';
import Spinner from '../layout/Spinner';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [videoType, setVideoType] = useState('computer language educations');
  const [loading, setLoading] = useState(true);
  const videoTypes = [
    'computer language',
    'computer science news',
    'designing cs project from scratch',
  ];

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedFetchData = useCallback(
    debounce(async () => {
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(
          videoType + ' ' + search,
        )}&key=${YOUTUBE_API_KEY}`,
      );
      const data = await response.json();
      setVideos(data.items);
      setLoading(false);
    }, 1000),
    [search, videoType],
  );

  useEffect(() => {
    if (search) {
      debouncedFetchData();
    }
  }, [search, debouncedFetchData]);

  return (
    <div className='container'>
      <h1 className="large text-primary">Videos</h1>
      <div className={styles['controls-container']}>
        <input
          className={styles['search-bar']}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles['dropdown-menu']}
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
        >
          {videoTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
        <div className={styles['videos-grid']}>
        {videos &&
    videos.map((video) => (
        <div key={video.id.videoId} className='videos'>
            <div className={styles['videos-container']}>
                <InView triggerOnce>
                    {({ inView, ref }) => (
                        <div ref={ref}>
                            {inView && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                    title={video.snippet.title}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media" 
                                    allowFullScreen
                                    width="100%"  // Added this
                                    height="100%" // and this
                                ></iframe>
                            )}
                            {!inView && (
                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                    className={styles['video-thumbnail']}
                                />
                            )}
                        </div>
                    )}
                </InView>
            </div>
        </div>
    ))}
        </div>
    </div>
  );
};

export default Videos;
