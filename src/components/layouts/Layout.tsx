import { Box, Flex, Grid, Group, Header, Text } from '@mantine/core'
import React, { ReactNode } from 'react'
import { GiLightSabers } from 'react-icons/gi'
type Props = { children: ReactNode }
export default function Layout({ children }: Props) {
  return (
      <Flex direction={'column'} h={'100%'} >
        <Box h={'60px'}  >
          <Header height={'60px'} px="md" bg={'#1469b2'} sx={{ borderRadius: '10px', }}>
            <Flex h={'100%'} align={'center'} gap={20}>

              <GiLightSabers color='white' size={40} />
              <Text size={30} color='white'>Star War</Text>
            </Flex>
          </Header>

        </Box>
        <Box h={'100%'} pt={10} sx={{ overflowY: 'scroll' }}>
          {children}
        </Box>
      </Flex>
  )
}
