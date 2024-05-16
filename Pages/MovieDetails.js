import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const MovieDetails = () => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";

    //recieve the id from the parameters
    const {params:{poster_path,title,overview}} = useRoute();
    // console.warn(params);

    return (
        <View>
            <Image source={{
                uri:`${imgPath}${poster_path}`,
                width:200,
                height:300
            }}></Image>
            <Text>title: {title}</Text>
            <Text>overview: {overview}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MovieDetails;
