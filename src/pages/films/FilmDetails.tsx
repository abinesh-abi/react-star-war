import { Box, Card, Center, Flex, Tabs, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { filmsCrud, peopleCrud } from '../../api/apis';
import { useParams } from 'react-router-dom';
import { Film, People } from '../../types/global';
import { useAppStore } from '../../store/app.store';
import ProfileFilms from '../../components/tables/FilmsTable';
import ProfileVehicles from '../../components/tables/VehiclesTable';
import { FaFilm } from 'react-icons/fa';
import { GiFarmTractor } from "react-icons/gi";
import DetailsItem from '../../components/comon/detailsItem/DetailsItem';
import PeopleTable from '../../components/tables/PeopleTable';
import PlanetTable from '../../components/tables/PlanetTable';
import StarShipsTable from '../../components/tables/StarShipsTable';
import SpeciesTable from '../../components/tables/SpeciesTable';

export default function FilmDetails() {
    const params = useParams<{ id: string | undefined }>()
    const { startLoading, stopLoading } = useAppStore()
    const { data, error, isLoading, refetch } = useQuery<Film>({
        queryKey: ['films-details'],
        queryFn: () => fetchData(),
        // onSuccess: (data) => {
        //     // setPeople(data);
        // }
    })
    async function fetchData() {
        if (params.id) {

            try {
                startLoading()
                return await filmsCrud.retrieve(params.id)
            } catch (error) {
                // return Promise.resolve()
            } finally { stopLoading() }
        }
    }
    return (
        <Card h={'100%'} px={'50px'} pt={'20px'} sx={{ overflowY: 'auto' }}>
            <Box bg={'#2962c4'} sx={{ borderRadius: '10px', color: 'white' }}>
                <Flex justify={'center'} py={'xl'} ><Title>{data?.title}</Title></Flex>
            </Box>
            <Card bg={'#eaebed'} my={'xl'} >
                <Flex justify={'space-around'}>
                    <Box>
                        <DetailsItem name='Name' value={data?.title} />
                        <DetailsItem name='Director' value={data?.director} />
                    </Box>
                    <Box>
                        <DetailsItem name='Release Date' value={data?.release_date} />
                        <DetailsItem name='Producer' value={data?.producer} />
                    </Box>
                </Flex>

            </Card>
            <Card bg={'#eaebed'} p={'xl'}>
                <Text underline >Plot</Text>
                <Text>{data?.opening_crawl}</Text>
            </Card>
            <Card bg={'#eaebed'} my={'xl'} >
                <Tabs defaultValue="characters">
                    <Tabs.List>
                        <Tabs.Tab value="characters" icon={<FaFilm size="0.8rem" />}>Characters</Tabs.Tab>
                        <Tabs.Tab value="vehicles" icon={<GiFarmTractor size="0.8rem" />}>Vehicles</Tabs.Tab>
                        <Tabs.Tab value="planets" icon={<GiFarmTractor size="0.8rem" />}>Planets</Tabs.Tab>
                        <Tabs.Tab value="starShips" icon={<GiFarmTractor size="0.8rem" />}>Star Ships</Tabs.Tab>
                        <Tabs.Tab value="species" icon={<GiFarmTractor size="0.8rem" />}>Species</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="characters" pt="xs">
                        <PeopleTable urls={data?.characters || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="vehicles" pt="xs">
                        <ProfileVehicles urls={data?.vehicles || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="planets" pt="xs">
                        <PlanetTable urls={data?.planets || []} />
                    </Tabs.Panel>

                    <Tabs.Panel value="starShips" pt="xs">
                        <StarShipsTable urls={data?.starships || []} />
                    </Tabs.Panel>
                    <Tabs.Panel value="species" pt="xs">
                        <SpeciesTable urls={data?.species || []} />
                    </Tabs.Panel>

                </Tabs>
            </Card>
        </Card>
    )
}
