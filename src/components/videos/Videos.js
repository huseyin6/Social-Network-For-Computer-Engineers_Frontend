// components/Videos.js
import React, { useState, useEffect } from 'react';
import { YOUTUBE_API_KEY } from '../../urlconfig';
import styles from './Videos.module.css';
import { InView } from 'react-intersection-observer';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [videoType, setVideoType] = useState('computer language educations');
  const [loading, setLoading] = useState(true);
  const videoTypes = [
    'computer language educations',
    'computer science news',
    'designing cs project from scratch',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(
          videoType + ' ' + search,
        )}&key=${YOUTUBE_API_KEY}`,
      );
      const data = await response.json();
      console.log(data);
      setVideos(data.items);
      setLoading(false);
    };
    fetchData();
  }, [search, videoType]);

  return (
    <div className={styles.container}>
      <h1>Videos</h1>
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles['videos-grid']}>
          {videos &&
            videos.map((video) => (
              <div key={video.id.videoId} className={`${styles['video-wrapper']} ${styles['fade-in']}`}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <div ref={ref}>
                      {inView && (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id.videoId}`}
                          title={video.snippet.title}
                          frameBorder="0"
                          allowFullScreen
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
            ))}
        </div>
      )}
    </div>
  );
};

export default Videos;