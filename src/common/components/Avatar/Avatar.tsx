import * as React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type AvatarProps = {
  user: string;
  avatar: ImageSourcePropType;
};

const Avatar: React.FC<AvatarProps> = ({ user, avatar: source }) => {
  return (
    <View style={styles.container}>
      <Image {...{ source }} style={styles.avatar} />
      <Text style={styles.username}>{user}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 16,
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
});

export default Avatar;
