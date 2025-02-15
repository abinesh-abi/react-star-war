import { Flex, Text } from '@mantine/core'
import React from 'react'
type Props = { name: string, value?: string }
export default function DetailsItem({ name, value }: Props) {
    return (
        <Flex>
            <Text pr={'10px'}>{name}: </Text>
            <Text>{value}</Text>
        </Flex>
    )
}
