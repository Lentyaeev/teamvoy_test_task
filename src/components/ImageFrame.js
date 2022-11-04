import { useState } from "react";
import { StyleSheet, ActivityIndicator, Image} from "react-native";

export default function ImageFrame({ url, style}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Image
        source={{uri: url}} 
        style={{...style, display: !isLoaded ? 'none' : 'flex'}}
        resizeMode='cover'
        onLoadStart={() => setIsLoaded(false)}
        onLoadEnd={() => setIsLoaded(true)}
      />
      {!isLoaded && <ActivityIndicator size={100} animating={!isLoaded} style={styles.spinner}/>}
    </>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  }
});