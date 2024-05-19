import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const MovieDetails = () => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";

    //recieve the id from the parameters
    const { params: { poster_path, title, overview } } = useRoute();
    // console.warn(params);

    return (
        <GestureHandlerRootView>

        <ScrollView style={styles.container}>
            <Card style={styles.card}>

                <Card.Cover source={{ uri: `${imgPath}${poster_path}` }}
                    style={styles.image}
                >
                </Card.Cover>

                <Card.Title
                    title={title}
                    titleStyle={styles.title}
                ></Card.Title>

                <Card.Content >
                    <Text style={styles.content}>{overview}</Text>
                </Card.Content>
            </Card>
        </ScrollView>
        </GestureHandlerRootView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    card: {
        marginBottom: 10,
    },
    image: {
        height: 500,
    },
    title:{
        fontWeight:'bold',
        fontSize:18
    },
    content:{
        fontSize:18
    }
})

export default MovieDetails;
