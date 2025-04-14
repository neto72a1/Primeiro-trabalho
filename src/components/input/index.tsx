import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

interface Props {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: string;
}

const InputField : React.FC<Props> = ({ 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry= false, 
    keyboardType= "default", 
}) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType="default"
            />
      </View>
    );
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
  });
  
  export default InputField;