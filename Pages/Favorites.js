import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { Card, IconButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const Favorites = () => {
    const isFocused = useIsFocused();
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const loadFavorites = useCallback(async () => {
        try {
            const storedMovies = await AsyncStorage.getItem('favoriteMovies');
            if (storedMovies) setFavoriteMovies(JSON.parse(storedMovies));
        } catch (error) {
            console.error('Error loading favorite movies', error);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            loadFavorites();
        }
    }, [isFocused, loadFavorites]);

    const handleRemoveFromFavorites = async (movie) => {
        try {
            const updatedMovies = favoriteMovies.filter(favMovie => favMovie.id !== movie.id);
            setFavoriteMovies(updatedMovies);
            await AsyncStorage.setItem('favoriteMovies', JSON.stringify(updatedMovies));
            console.log(`Removed ${movie.title} from favorites`);
        } catch (error) {
            console.error('Error removing favorite movie', error);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.image} />
            <Card.Title
                title={item.title}
                right={(props) => (
                    <IconButton
                        {...props}
                        icon="delete"
                        onPress={() => handleRemoveFromFavorites(item)}
                    />
                )}
            />
        </Card>
    );

    return (
        <View style={styles.container}>
            {favoriteMovies.length > 0 ? (
                <FlatList
                    data={favoriteMovies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text>No favorite movies found.</Text>
            )}
        </View>
    );
};

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
        height: 300,
    },
});

export default Favorites;
