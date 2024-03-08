// CustomBottomSheet.js
import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import RadioGroup from 'react-native-radio-buttons-group';
import ArrowDown from '../../assets/ArrowDown';
import Dropdown from '../../components/Dropdown';
import axios from 'axios';
import { useAuth } from '../../store/AuthContext';

const CustomBottomSheet = ({
  bottomSheetVisible,
  setSelectedId,
  selectedId,
  idForUpt,
  handleShowButtomSheet,
}: any) => {
    const options = [
        { id: 1, label: 'Hour', value: 'hour' },
        { id: 2, label: 'Day', value: 'day' },
        { id: 3, label: 'week', value: 'week' },
        { id: 4, label: 'One time', value: 'one time' },
        { id: 5, label: 'Unlimited', value: 'unlimited' }
      ];
  //@ts-ignore
  const {token} = useAuth();
  const [timePeriod,setTimePeriod] = useState<any>(options[1]);

  const updateAccess = async () => {
    await axios.put(
      `https://dashboard-s2v.vrpro.com.ua/api/app/documents/requests/${idForUpt}`,
      {
        access: 1,
        metadata_only: selectedId,
        period_type: timePeriod.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).finally(()=>{
        handleShowButtomSheet()
    });
  };
//   hour
//   day
//   week
//   one_time
//   unlimited
 
  const radioButtons = useMemo(
    () => [
      {
        id: 0,
        label: 'Metadata only',
        value: 'option1',
      },
      {
        id: 1,
        label: 'Metadata and document',
        value: 'option2',
      },
    ],
    [],
  );
  return (
    <>
      {bottomSheetVisible && (
        <>
          <TouchableOpacity
            onPress={handleShowButtomSheet}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.5)', // Полупрозрачный фон
            }}></TouchableOpacity>
          <BottomSheet
            backgroundStyle={{
                backgroundColor: '#151422',
            }}
            snapPoints={['60%', '80%']}
            handleComponent={() => <View style={styles.customHandle} />}>
            <BottomSheetView style={styles.contentContainer}>
              <Text style={styles.bottomSheetLabel}>Access for: </Text>
              <Text style={styles.bottomSheetName}>Kathryn Murphy</Text>
              <Text style={styles.bottomSheetEmail}>
                kathrinmurphyshy@gmail.com
              </Text>
              <RadioGroup
                //@ts-ignore
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={styles.radioGroupContainer}
                labelStyle={styles.radioLabel}
              />
              <Text style={styles.labelText}>Access time period</Text>

              <Dropdown options={options} onSelect={(option) => {
               setTimePeriod(option);
              }}>
                <View style={styles.drop}>
                  <Text style={styles.dropText}>{timePeriod.label}</Text>
                  <ArrowDown />
                </View>
              </Dropdown>

              <TouchableOpacity
                style={styles.btn}
                onPress={updateAccess}>
                <Text style={styles.btnText}>Confirm</Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheet>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  radioGroupContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 20,
    color: '#A64DF4',
  },
  radioLabel: {
    color: '#FFFFFF',
  },
  customHandle: {
    // backgroundColor: '#151422',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  contentContainer: {
    paddingBottom: 24,
    zIndex: 100,
    flex: 1,
    backgroundColor: '#151422',
    paddingHorizontal: 16,
  },
  bottomSheetLabel: {
    color: '#8A85CC',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
  },
  bottomSheetName: {
    paddingTop: 8,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32,
  },
  bottomSheetEmail: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  drop: {
    backgroundColor: '#2A2840',
    width: '100%',
    height: 56,
    marginRight: 16,
    borderRadius: 14,
    marginTop: 5,
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    paddingTop: 24,
  },
  dropText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  switchBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchBtn: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#76C0FA',
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#76C0FA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  switchText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#76C0FA',
  },
  btn: {
    backgroundColor: '#7920C8',
    width: '100%',
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#7920C8',
    marginTop: 24,
    zIndex: 2,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownContainer: {
    // backgroundColor: '#2A2840',
    borderRadius: 14,
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 16,
    maxHeight: 200, // Set a max-height to prevent the dropdown from taking too much space
    overflow: 'scroll', // Allows scrolling within the dropdown if there are many items
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
  },
});

export default CustomBottomSheet;
