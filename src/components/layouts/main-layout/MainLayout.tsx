import { ReactNode, useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Flex,
    UnstyledButton,
    Group,
} from '@mantine/core';
import { GiLightSabers, GiWolfHead } from 'react-icons/gi';
import { CiUser } from "react-icons/ci";
import { PiFilmReelLight } from "react-icons/pi";
import { RxRocket } from "react-icons/rx";
import { LiaTruckPickupSolid } from "react-icons/lia";
import SidebarItems from './SidebarItems';
import { IoPlanetOutline } from "react-icons/io5";

type Props = { children: ReactNode }

export default function MainLayout({ children }: Props) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar bg={'#1b2433'}
                    p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    {/* <Navbar.Section grow>First section</Navbar.Section> */}
                    <SidebarItems Icon={CiUser} text='People' path='/' />
                    <SidebarItems Icon={PiFilmReelLight} text='Films' path='/films'  />
                    <SidebarItems Icon={RxRocket} text='Star Ships' path='/star-ship' />
                    <SidebarItems Icon={LiaTruckPickupSolid} text='Vehicle' path='/vehicle' />
                    <SidebarItems Icon={GiWolfHead} text='Species' path='/species' />
                    <SidebarItems Icon={IoPlanetOutline} text='Planets'  path='/planets' />
                    
                </Navbar>
            }
            // aside={
            //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //         <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            //             <Text>Application sidebar</Text>
            //         </Aside>
            //     </MediaQuery>
            // }
            // footer={
            //     <Footer height={60} p="md">
            //         Application footer
            //     </Footer>
            // }
            header={
                <Header height={{ base: 50, md: 70 }} p="md" >
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Flex justify={'center'} gap={'xl'}>
                            <GiLightSabers size={40} />
                            <Text size={'30px'}>Star Wars</Text>
                        </Flex>
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}

// {/* <Flex direction={'column'} h={'100%'}  w={'100%'}>
//   <Box h={'60px'}  >
//     <Header height={'60px'} px="md" bg={'#1469b2'} sx={{ borderRadius: '10px', }}>
//       <Flex h={'100%'} align={'center'} gap={20}>

//         <GiLightSabers color='white' size={40} />
//         <Text size={30} color='white'>Star War</Text>
//       </Flex>
//     </Header>

//   </Box>
//   <Box h={'100%'} pt={10} sx={{ overflowY: 'scroll' }}>
//     {children}
//   </Box>
// </Flex> */}