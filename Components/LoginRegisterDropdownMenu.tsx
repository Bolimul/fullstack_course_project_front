import React, { FC, useEffect, useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import { SelectList } from 'react-native-dropdown-select-list'

  const data = [
    { label: 'Register', value: '1' },
    { label: 'Login', value: '2' },
  ];

  const DropdownComponent: FC <{onOptionSelected: (option: string, refreshToken:string) => void, refreshToken: string }> = ({onOptionSelected, refreshToken}) => {
  
    const data = [
        {key:'1', value:'Post List'},
        {key:'2', value:'Add New Post'},
        {key:'3', value:'Personal Data'},
        {key:'4', value:'User Posts'},
        {key:'5', value:'Logout'},
    ]

    const onElementSeleted = (option: string) => {
        console.log('The option: ' + option)
        onOptionSelected(option, refreshToken)
    }

    
  
    return(
      <SelectList 
          setSelected={(key: string) => onElementSeleted(key)} 
          data={data} 
          save="key"
      />
    )
  };

  export default DropdownComponent;