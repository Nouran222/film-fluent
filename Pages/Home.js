import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../Utilies/routes';
import { getMovies } from './getMovies';
import { Button, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('popular');

    const { data: movies = [], isLoading, error } = getMovies(selectedFilter);

    const { navigate } = useNavigation();

    const handleImagePress = (movie) => {
        navigate(routes.details, movie)
    }

    const handleAddToFavorites = async (movie) => {
        try {
            const storedMovies = await AsyncStorage.getItem('favoriteMovies');
            let favoriteMovies = storedMovies ? JSON.parse(storedMovies) : [];
            const isExisted = favoriteMovies.some((favMovie) => favMovie.id === movie.id);
            if (!isExisted) {
                favoriteMovies = [...favoriteMovies, movie];
                await AsyncStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
                console.log(`Added ${movie.title} to favorites`);
            } else {
                console.log(`${movie.title} is already in favorites`);
            }
        } catch (error) {
            console.error('Error saving favorite movie', error);
        }
    };
    
    const renderItem =  ({item})=>(
        <Card style={styles.card}>
            <TouchableOpacity onPress={()=>handleImagePress(item)}>
                <Card.Cover source={{uri: `${imgPath}${item.poster_path}`}}
                    style={styles.image}
                >
                </Card.Cover>
            </TouchableOpacity>
            <Card.Title
                title={item.title}
                titleStyle={{fontWeight:'bold'}}
                right={(props)=>(
                    <IconButton
                        {...props}
                        icon="heart"
                        iconColor='red'
                        onPress={()=>handleAddToFavorites(item)}
                    ></IconButton>
                )}
            ></Card.Title>
        </Card>
    );

    const searchedMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

    //the data didn't come yet
    if (isLoading) return <Text>Loading Data...</Text>

    //error occurs while getting data
    if (error) return <Text>Error...</Text>

    return (
        <View style={styles.container}>
            <View style={styles.searchRow}>

                <TextInput
                    style={styles.searchBar}
                    placeholder='search for a movie ...'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                >
                </TextInput>
                <IconButton
                    icon="filter"
                    size={26}
                    onPress={() => setFilterVisible(true)}
                />
            </View>

            <FlatList
                data={searchedMovies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            ></FlatList>

            <Modal
                visible={filterVisible}
                transparent={true}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose a filter</Text>
                        <Button textColor='black' title="Popular" onPress={() => { setSelectedFilter('popular'); setFilterVisible(false); }}>Popular</Button>
                        <Button textColor='black' title="Top Rated" onPress={() => { setSelectedFilter('top_rated'); setFilterVisible(false); }}>Top Rated</Button>
                        <Button textColor='black' title="Upcoming" onPress={() => { setSelectedFilter('upcoming'); setFilterVisible(false); }}>Upcoming</Button>
                        <Button textColor='black' title="Now Playing" onPress={() => { setSelectedFilter('now_playing'); setFilterVisible(false); }}>Now Playing</Button>
                        <Button textColor='black' title="Cancel" onPress={() => setFilterVisible(false)}>Cancel</Button>
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
        width: '85%'
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
    },
    image: {
        height: 300,
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
    },
})

export default Home;
