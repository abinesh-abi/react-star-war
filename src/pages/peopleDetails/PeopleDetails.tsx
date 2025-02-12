import { Box, Card, Center, Flex, Tabs, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { peopleCrud } from '../../api/apis';
import { useParams } from 'react-router-dom';
import { People } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import ProfileFilms from '../../components/people/ProfileFilms';
import ProfileVehicles from '../../components/people/ProfileVehicles';
import { FaFilm } from 'react-icons/fa';
import { GiFarmTractor } from "react-icons/gi";

export default function PeopleDetails() {
    const params = useParams<{ id: string | undefined }>()
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<People>({
        queryKey: ['people-details'],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     // setPeople(data);
        // }
    })
    async function fetchData() {
        if (params.id) {

            try {
                startLoading()
                return await peopleCrud.retrieve(params.id)
            } catch (error) {
                // return Promise.resolve()
            } finally { stopLoading() }
        }
    }
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} sx={{ overflowY: 'auto' }}>
            <Box bg={'#2962c4'} sx={{ borderRadius: '10px', color: 'white' }}>
                <Flex justify={'center'} py={'xl'} ><Title>{data?.name}</Title></Flex>
            </Box>
            <Card bg={'#eaebed'} my={'xl'} >
                <Flex justify={'space-around'}>
                    <Box>

                        <Flex>
                            <Text pr={'10px'}>Name: </Text>
                            <Text>{data?.name}</Text>
                        </Flex>
                        <Flex>
                            <Text pr={'10px'}>Hight: </Text>
                            <Text>{data?.height}</Text>
                        </Flex>
                        <Flex>
                            <Text pr={'10px'}>Mass: </Text>
                            <Text>{data?.mass}</Text>
                        </Flex>
                        <Flex>
                            <Text pr={'10px'}>Hair Color: </Text>
                            <Text>{data?.hair_color}</Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex>
                            <Text pr={'10px'}>Skin Color: </Text>
                            <Text>{data?.skin_color}</Text>
                        </Flex>
                        <Flex>
                            <Text pr={'10px'}>Eye Color: </Text>
                            <Text>{data?.eye_color}</Text>
                        </Flex>
                        <Flex>
                            <Text pr={'10px'}>Birth Year: </Text>
                            <Text>{data?.birth_year}</Text>
                        </Flex>
                        <Flex>
                            <Text pr={'10px'}>Gender: </Text>
                            <Text>{data?.gender}</Text>
                        </Flex>
                    </Box>
                </Flex>

            </Card>
            <Card bg={'#eaebed'} my={'xl'} >
                <Tabs defaultValue="films">
                    <Tabs.List>
                        <Tabs.Tab value="films" icon={<FaFilm size="0.8rem" />}>Films</Tabs.Tab>
                        <Tabs.Tab value="vehicles" icon={<GiFarmTractor size="0.8rem" />}>Vehicles</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="films" pt="xs">
                        <ProfileFilms films={data?.films || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="vehicles" pt="xs">
                        <ProfileVehicles vehicles={data?.vehicles || []} />
                    </Tabs.Panel>

                </Tabs>
            </Card>
        </Card>
    )
}
