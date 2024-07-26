import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ImagePlaceholder} from '../../Home/components/ImagePlaceholder/ImagePlaceholder';
import {COMMON_STYLES} from '../../../styles';

interface UserImageProps {
    avatar: string | undefined;
    size?: number;
}

const UserImage = ({avatar, size = 100}: UserImageProps) => {
    return (
        <View style={{...styles.imageContainer, width: size, height: size}}>
            {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
});

export default UserImage;
