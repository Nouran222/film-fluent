import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../Utilies/routes';
const Home = ({ navigation }) => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";
    //useEffect(callback func,array of dependency)
    //useState to render the component once the data is recieved from the API
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7")
            .then((res) => setMovies(res.data.results));
        // fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7")
        // .then((res)=>res.json())
        // .then((data)=>setMovies(data.results))
    }, []);

    const {navigate} = useNavigation();

    const handleImagePress = (movie)=>{
        navigate(routes.details,movie)
    }

    const renderItem =  ({item})=>(
        <TouchableOpacity onPress={()=>handleImagePress(item)}>
                    <Image
                        source={{
                            uri: `${imgPath}${item.poster_path}`,
                            width: 200,
                            height: 300,
                        }}
                    ></Image>
                </TouchableOpacity>
    );
    return (
        //we can use useNavigation instead of the navigation prop
        // const {navigate} = useNavigation();
        //onPress={()=>{navigate("movies")}}

        //we can send the movie id as a parameter in the navigate
        //then we will recieve the parameter in the details page
        <View>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item)=>item.id.toString()}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Home;
