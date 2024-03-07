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
        position: 'absolute', // Set the dropdown to be positioned absolutely
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        bottom: '-100%',
        // marginTop: 100,
        maxHeight: 200, // Optional: change as needed
        overflow: 'hidden',
        width: '100%', // Ensure the dropdown matches the width of the toggle button
        zIndex: 1000, // Make sure the dropdown appears on top of other content
      },
      container: {
        position: 'relative', // Ensure the parent container is positioned
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  optionText: {
    textAlign: 'center',
  },
});

export default Dropdown;
