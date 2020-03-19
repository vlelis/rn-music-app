import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface AudioPlayerProps {

};


const AudioPlayer: React.FC<AudioPlayerProps> = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="md-play-circle" size={48} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})


export default AudioPlayer;
