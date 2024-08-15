import { getUser } from '@/lib/actions/mentee.actions';
import { tokenProvider } from '@/lib/actions/stream.actions';
import { useUser } from '@clerk/nextjs';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = async ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error('Stream API Key missing');

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.name || user.id,
        image: '',
      },
      tokenProvider: tokenProvider
    })

    setVideoClient(client)
  }, [user, isLoaded]);

  return (
    <StreamVideo client={videoClient}>

    </StreamVideo>
  );
};

export default StreamVideoProvider;