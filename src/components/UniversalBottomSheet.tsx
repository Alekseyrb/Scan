import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const UniversalBottomSheet = ({
  isVisible,
  onClose,
  children,
  snapPoints = ['50%', '75%'],
}:any) => {
  if (!isVisible) return null;

  return (
    <>
      <TouchableOpacity
        onPress={onClose}
        style={styles.overlay}
      />
      <BottomSheet
        backgroundStyle={styles.background}
        containerStyle={styles.container}
        snapPoints={snapPoints}
        handleComponent={() => <View style={styles.customHandle} />}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  customHandle: {
    borderRadius: 2.5,
    marginTop: -16,
    height: 5,
    width: 80,
    backgroundColor: 'rgba(138, 133, 204, 0.5)',
    borderTopWidth: 5,
    borderTopColor: '#FFFFFF',
    alignSelf: 'center',
  },
  contentContainer: {
    paddingTop: 14,
    marginBottom: -20,
    borderWidth: 1,
    width: '101%',
    marginLeft: -2,
    // borderTopLeftWidth: 1,
    // borderTopRightWidth: 1,
    borderColor: 'rergba(138, 133, 204, 0.5)d',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingBottom: 24,
    zIndex: 333,
    flex: 1,
    backgroundColor: '#151422',
    paddingHorizontal: 16,
  },
  background: {
    backgroundColor: '#151422',
  },
  container: {
    backgroundColor: 'rgba(21, 20, 34, 0.8)',
  },
});

export default UniversalBottomSheet;
