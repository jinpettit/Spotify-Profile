import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks
} from '../spotify';
import {
  SectionWrapper,
  ArtistsGrid,
  TrackList,
  PlaylistsGrid, Loader
} from '../components';
import { StyledHeader } from '../styles';
import styled from 'styled-components/macro';

const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: 50px;
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px;
  img {
    border-radius: 100%;
  }
`;

const IconUser = () => (
  <svg id="u-sericon" viewBox="0 0 1024 1024" width="100%" height="100%">
    <path fill="#FFFFFF" d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z" />
  </svg>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
            <Avatar>
            {profile.images.length > 0 ? (
                <img src={profile.images[0].url} alt="avatar" />
              ) : (
                <NoAvatar>
                  <IconUser />
                </NoAvatar>
              )}
              </Avatar>
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          {topArtists && topTracks && playlists ?(
            <main>
              <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
              </SectionWrapper>

              <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                <TrackList tracks={topTracks.items.slice(0, 10)} />
              </SectionWrapper>

              <SectionWrapper title="Playlists" seeAllLink="/playlists">
                <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
              </SectionWrapper>
            </main>
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  )
};

export default Profile;