import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Profile = () => {

  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('Profile')}</Text>
    </View>
  )
}

export default Profile