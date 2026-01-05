
import {Ionicons } from "@expo/vector-icons";
import { View , Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

 const BottomTabsNav = ()=> {
  return (
   <SafeAreaView > 
   <View style={style.container}>  
    <Ionicons name="home" size={24} style={style.icons}  />
     <Ionicons name="settings" size={24} color="black" />
   </View>
   </SafeAreaView>
  );


} 

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    position:"fixed",
    bottom:0,
    width:"100%"
  },
  icons:{
    color:"#4682BF"
  }
});
export default BottomTabsNav;