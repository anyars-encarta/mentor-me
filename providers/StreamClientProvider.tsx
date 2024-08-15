import { getUser } from '@/lib/actions/mentee.actions';
import {
    StreamVideo,
    StreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
  const StreamVideoProvider = async ({ children, userId }: { children : ReactNode, userId: string}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const [isLoaded, setIsLoaded] = useState(false);
    const user = await getUser(userId);

    useEffect(() => {
        if (!isLoaded || !user) return;
        if(!apiKey) throw new Error('Stream API Key missing');

        const client = new StreamVideoClient({
           apiKey,
           user: {
            id: user?.$id,
            name: user?.name,
            image: '',
           },
           tokenProvider 
        })
    }, [user, isLoaded]);

    return (
      <StreamVideo client={videoClient}>
        
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;