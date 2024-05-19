import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const About = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>At Film Fluent, we're passionate about all things movies.
                Whether you're a die-hard cinephile, a casual viewer,
                or someone just looking for your next cinematic adventure, we've got you covered.
                Our mission is simple: to be your go-to hub for everything related to the world of film.
                From the latest blockbusters to timeless classics, from in-depth reviews to exclusive interviews,
                we aim to provide a comprehensive and immersive experience for movie lovers of all kinds.
            </Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    text:{
        fontSize:18
    }
})

export default About;
