import Avatar from '@components/Avatar';
import { IStory } from '@navigation/RootStack/StoriesStack/types';
import React, { FC } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

interface StoryProps {
  story: IStory;
}

const Story: FC<StoryProps> = ({ story: { user, avatar, source } }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} {...{ source }} />
        <Avatar {...{ user, avatar }} />
      </View>
      <View style={styles.footer}>
        <TextInput style={styles.input} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    height: 28,
    width: 250,
    borderRadius: Platform.OS === 'android' ? 0 : 10,
  },
});

export default Story;
