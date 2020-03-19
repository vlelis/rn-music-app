import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { Audio } from 'expo-av';



interface AudioInfoProps {
    id: string;
    filename: string;
    uri: string;
    duration: number
}

const AudioInfo: React.FC<AudioInfoProps> = ({id, filename, uri, duration}) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [sound, setSound] = React.useState<Audio.Sound>(null);

    const formatTime = (time): String => {
        const timing = { hours: 0, minutes: 0, seconds: 0 };
        const dates = { oneHour: 3600, oneMinute: 60, oneSecond: 1 }

        while (time > 0) {
            if ((time - dates.oneHour) >= 0) {
                timing.hours += 1;
                time -= dates.oneHour;
            } else if ((time - dates.oneMinute) >= 0) {
                timing.minutes += 1;
                time -= dates.oneMinute;
            } else {
                if (time > 0){
                    timing.seconds += 1;
                    time -= dates.oneSecond;
                }
            }
        }

        return `${timing.hours}h:${timing.minutes}m:${timing.seconds}s`;
    }

    const playShit = async () => {
        if (isPlaying) {
            setIsPlaying(false);
            sound.pauseAsync();
            // console.log(await sound.getStatusAsync());
            return;
        }
        if (sound) {
            setIsPlaying(true);
            sound.playAsync();
            return;
        }
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({
                uri: uri
            });
            setSound(soundObject);
            setIsPlaying(true);
            
            await soundObject.playAsync(); 
        } catch (error) {
            // 
        }
    }

    return (
        <View style={styles.blockView}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.item}>Title: {filename}</Text>
                <Text style={styles.item}>Duration: {formatTime(duration)}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Button title="Play" onPress={playShit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        fontSize: 15,
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    blockView: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    iconContainer: {
        flex: 1,
        alignItems: "flex-end"
    }
})


export default AudioInfo;