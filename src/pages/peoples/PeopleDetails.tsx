import { Box, Card, Center, Flex, Tabs, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { peopleCrud } from '../../api/apis';
import { useParams } from 'react-router-dom';
import { People } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import ProfileFilms from '../../components/tables/FilmsTable';
import ProfileVehicles from '../../components/tables/VehiclesTable';
import { FaFilm } from 'react-icons/fa';
import { GiFarmTractor } from "react-icons/gi";
import DetailsItem from '../../components/comon/detailsItem/DetailsItem';

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
                        <DetailsItem name='Name' value={data?.name} />
                        <DetailsItem name='Hight' value={data?.height} />
                        <DetailsItem name='Mass' value={data?.mass} />
                        <DetailsItem name='Hair Color' value={data?.hair_color} />
                    </Box>
                    <Box>
                        <DetailsItem name='Skin Color' value={data?.skin_color} />
                        <DetailsItem name='Eye Color' value={data?.eye_color} />
                        <DetailsItem name='Birth Year' value={data?.birth_year} />
                        <DetailsItem name='Gender' value={data?.gender} />
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
                        <ProfileFilms urls={data?.films || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="vehicles" pt="xs">
                        <ProfileVehicles urls={data?.vehicles || []} />
                    </Tabs.Panel>

                </Tabs>
            </Card>
        </Card>
    )
}
