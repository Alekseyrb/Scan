import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// OptionProps interface for TypeScript
// If you're not using TypeScript, you can remove this
interface OptionProps {
  id: string | number;
  label: string;
  [key: string]: any;
}

interface DropdownProps {
    children: React.ReactNode; 
  options: OptionProps[];
  onSelect: (option: OptionProps) => void;
  OptionComponent?: React.FC<{option: OptionProps, onSelect: (option: OptionProps) => void}>;
}

const DefaultOptionComponent: React.FC<{option: OptionProps, handleVisible: any, onSelect: (option: OptionProps) => void}> = ({ option, onSelect, handleVisible }) => (
  <TouchableOpacity onPress={() => {onSelect(option); handleVisible();}} style={styles.option}>
    <Text style={styles.optionText}>{option.label}</Text>
  </TouchableOpacity>
);

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, OptionComponent = DefaultOptionComponent, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => setIsVisible(!isVisible)

  return (
    <View>
      <TouchableOpacity onPress={handleVisible} style={styles.button}>
      {children}
      </TouchableOpacity>
      {isVisible && (
        <TouchableOpacity  onPress={handleVisible} style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <OptionComponent option={item} onSelect={onSelect} handleVisible={handleVisible} />}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        backgroundColor: '#2A2840',
        borderRadius: 12,
        borderWidth: 1,
        top: '100%',
        maxHeight: 200,
        overflow: 'hidden',
        borderColor: '#cccccc',
        width: '100%',
        zIndex: 1000, 
      },
      container: {
        position: 'relative', 
        width: '100%', // Set a width for the container
      },
  button: {
    position: 'relative',
    // backgroundColor: '#007BFF',
    // padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  
  option: {

    border: '2px solid red',
    padding: 10,
    borderBottomWidth: 0.19,
    borderBottomColor: '#cccccc',
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Dropdown;
