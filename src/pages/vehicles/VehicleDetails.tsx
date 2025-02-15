import { Box, Card, Center, Flex, Tabs, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Starship } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import DetailsItem from '../../components/comon/detailsItem/DetailsItem';
import PeopleTable from '../../components/tables/PeopleTable';
import { PiUsersDuotone } from 'react-icons/pi';
import FilmsTable from '../../components/tables/FilmsTable';
import { FaFilm } from 'react-icons/fa';
import { vehicleCrud } from '../../api/apis';

export default function VehicleDetails() {
    const params = useParams<{ id: string | undefined }>()
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Starship>({
        queryKey: ['vehicle-details'],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     // setPeople(data);
        // }
    })
    async function fetchData() {
        if (params.id) {

            try {
                startLoading()
                return await vehicleCrud.retrieve(params.id)
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
                        <DetailsItem name='Model' value={data?.model} />
                        <DetailsItem name='Manufacturer' value={data?.manufacturer} />
                    </Box>
                    <Box>
                        <DetailsItem name='Speed' value={data?.max_atmosphering_speed} />
                        <DetailsItem name='Crew' value={data?.crew} />
                        <DetailsItem name='Cargo Capacity' value={data?.cargo_capacity} />
                    </Box>
                </Flex>

            </Card>
            <Card bg={'#eaebed'} my={'xl'} >
                <Tabs defaultValue="pilots">
                    <Tabs.List>
                        <Tabs.Tab value="pilots" icon={<PiUsersDuotone size="0.8rem" />}>Pilots</Tabs.Tab>
                        <Tabs.Tab value="films" icon={<FaFilm size="0.8rem" />}>Films</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="pilots" pt="xs">
                        <PeopleTable urls={data?.pilots || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="films" pt="xs">
                        <FilmsTable urls={data?.films || []} />
                    </Tabs.Panel>


                </Tabs>
            </Card>
        </Card>
    )
}
