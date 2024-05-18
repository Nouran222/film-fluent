import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../Utilies/routes';
import { getMovies } from './getMovies';
const Home = () => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";
    //useEffect(callback func,array of dependency)
    //useState to render the component once the data is recieved from the API
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('popular');
    //update this component to use the created custom hook
    const {data:movies=[],isLoading,error}= getMovies(selectedFilter);

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
                    <Text>{item.title}</Text>
                </TouchableOpacity>
    );

    const searchedMovies = movies.filter((movie)=>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

    //the data didn't come yet
    if(isLoading)return <Text>Loading Data...</Text>

    //error occurs while getting data
    if(error) return <Text>Error...</Text>

    return (
        //we can use useNavigation instead of the navigation prop
        // const {navigate} = useNavigation();
        //onPress={()=>{navigate("movies")}}

        //we can send the movie id as a parameter in the navigate
        //then we will recieve the parameter in the details page
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder='search for a movie ...'
                value={searchQuery}
                onChangeText={setSearchQuery}
            >
            </TextInput>
            <TouchableOpacity 
                style={styles.filterButton}
                onPress={()=>setFilterVisible(true)}
            >
                <Text 
                    style={styles.filterButtonText}
                >Filter</Text>
            </TouchableOpacity>


            <FlatList
                data={searchedMovies}
                renderItem={renderItem}
                keyExtractor={(item)=>item.id.toString()}
            ></FlatList>

            <Modal
                visible={filterVisible}
                transparent = {true}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose a filter</Text>
                        <Button title="Popular" onPress={() => { setSelectedFilter('popular'); setFilterVisible(false); }} />
                        <Button title="Top Rated" onPress={() => { setSelectedFilter('top_rated'); setFilterVisible(false); }} />
                        <Button title="Upcoming" onPress={() => { setSelectedFilter('upcoming'); setFilterVisible(false); }} />
                        <Button title="Now Playing" onPress={() => { setSelectedFilter('now_playing'); setFilterVisible(false); }} />
                        <Button title="Cancel" onPress={() => setFilterVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    movieTitle: {
        textAlign: 'center',
        marginTop: 5,
    },
    filterButton: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterButtonText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    }
})

export default Home;
