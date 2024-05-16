import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Home = ({navigation}) => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";
    //useEffect(callback func,array of dependency)
    //useState to render the component once the data is recieved from the API
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7")
        .then((res)=>res.json())
        .then((data)=>setMovies(data.results))
    },[]);
    return (
        //we can use useNavigation instead of the navigation prop
        // const {navigate} = useNavigation();
        //onPress={()=>{navigate("movies")}}
        <View>
            <Text>Movies Page</Text>
            {movies.map((movie)=>
            <Image
            source={{
                uri:`${imgPath}${movie.poster_path}`,
                width:100,
                height:100,
            }}
            key={movie.id}
            ></Image>)}
        </View>
    );
}

const styles = StyleSheet.create({})

export default Home;
