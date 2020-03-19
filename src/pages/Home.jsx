import React from 'react';
import * as MediaLibrary from 'expo-media-library';
import {View, StyleSheet, Text, FlatList} from 'react-native';

import AudioInfo from '../components/AudioInfo';
import AudioPlayer from '../components/AudioPlayer';


export default function Home() {
    const permission = MediaLibrary.getPermissionsAsync();
    const [audioAssets, setAudioAssets] = React.useState([]);

    React.useEffect(() => {
        const getAssets = async () => {
            const globalAssets = await MediaLibrary.getAssetsAsync({
                mediaType: ['audio']
            });
            setAudioAssets(globalAssets.assets);
        }
        getAssets();
    }, [])


    const renderAudio = (item) => (
        <AudioInfo id={item.id} filename={item.filename} uri={item.uri} duration={item.duration} />
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={audioAssets}
                renderItem={({ item }) => renderAudio(item)}
            />
            <AudioPlayer />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})