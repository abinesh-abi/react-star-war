import { Box, Card, Center, Flex, Tabs, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { filmsCrud, peopleCrud, starShipCrud } from '../../api/apis';
import { useParams } from 'react-router-dom';
import { Film, People, Starship } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import ProfileVehicles from '../../components/tables/VehiclesTable';
import { GiFarmTractor, GiWolfHead } from "react-icons/gi";
import DetailsItem from '../../components/comon/detailsItem/DetailsItem';
import PeopleTable from '../../components/tables/PeopleTable';
import PlanetTable from '../../components/tables/PlanetTable';
import StarShipsTable from '../../components/tables/StarShipsTable';
import SpeciesTable from '../../components/tables/SpeciesTable';
import { PiUsersDuotone } from 'react-icons/pi';
import { IoPlanetOutline } from 'react-icons/io5';
import { RxRocket } from 'react-icons/rx';
import FilmsTable from '../../components/tables/FilmsTable';
import { FaFilm } from 'react-icons/fa';

export default function StarShipDetailsDetails() {
    const params = useParams<{ id: string | undefined }>()
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Starship>({
        queryKey: ['star-ships-details'],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     // setPeople(data);
        // }
    })
    async function fetchData() {
        if (params.id) {

            try {
                startLoading()
                return await starShipCrud.retrieve(params.id)
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
                        <Tabs.Tab value="pilots" icon={<PiUsersDuotone size="0.8rem" />}>Characters</Tabs.Tab>
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
