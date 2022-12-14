import { StyleSheet } from "react-native";
export const styles=StyleSheet.create({
    flexContainer: {
        flex: 1,
        padding: 10,
        alignItems:'center',
        marginBottom:80
   
      },
      headigStyle: {
        textAlign: 'center',
        fontSize: 18
      },
      box: {
        // backgroundColor: "#38b000",
        
        width: 340,
        height: 140,
        borderRadius: 20,
        marginTop: 15,
        padding:5,
   
        backgroundColor:'#cfe1b9'
    
      },
      textBox: {
        padding: 8,
        width:200
    
      },
      shadowProp: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        // shadowRadius: 3,
    
      },
      scrollView:{
        width:400,
        // marginVertical:50,
        // borderWidth:1,
        paddingVertical:10,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 10,
            height: 10,
        }


      }
})