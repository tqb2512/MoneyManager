import React from 'react';
import { View, Text } from 'react-native';
import { AccountDetailProp } from '../../navigation/types';

function AccountDetail (props: AccountDetailProp) {
    return (
        <View>
            <Text>Account Detail</Text>
        </View>
    )
}

export default React.memo(AccountDetail);