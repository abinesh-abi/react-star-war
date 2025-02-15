import { FC } from 'react';
import { Card, Title } from "@mantine/core";
import { useAppStore } from '../../store/app.store';
import { peopleCrud } from '../../api/apis';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import _ from 'lodash';
import MantineDataTable from '../../components/comon/dataTable/MantineDataTable';
import { DataTableColumn } from 'mantine-datatable';
import { People } from '../../types/global';


const Peoples: FC = () => {


	const { setPeople } = useAppStore((state) => state);
	// const { data, error, isLoading, refetch } = useQuery({
	// 	queryKey: ['people'],
	// 	queryFn: () => fetchData(),
	// 	onSuccess: (data) => {
	// 		setPeople(data);
	// 	}
	// })
	// const [currentPage, setCurrentPage] = useState(1)
	// const [search, setSearch] = useState('')


	// async function fetchData() {
	// 	try {
	// 		startLoading()
	// 		return await peopleCrud.get()
	// 	} catch (error) {

	// 	} finally { stopLoading() }
	// }
	// async function getPage(page: number) {
	// 	try {
	// 		startLoading()
	// 		let params = urlUtils.updateQueryParam('', 'page', page)
	// 		if (search) {
	// 			params = urlUtils.updateQueryParam(params, 'search', search)
	// 		}
	// 		const data = await peopleCrud.get(params)
	// 		setPeople(data)
	// 		setCurrentPage(page)
	// 	} catch (error) {

	// 	} finally { stopLoading() }
	// }
	// async function searchPage(text: string) {
	// 	try {
	// 		startLoading()
	// 		let params = urlUtils.updateQueryParam('', 'search', text)
	// 		params = urlUtils.updateQueryParam(params, 'page', 1)
	// 		const data = await peopleCrud.get(params)
	// 		setPeople(data)
	// 		setCurrentPage(1)
	// 		searchPage(text)
	// 	} catch (error) {

	// 	} 
	// 	finally { stopLoading() }
	// }

	// const debouncedSearch = useCallback(
	// 	_.debounce(async (text) => {
	// 		try {
	// 			startLoading();
	// 			let params = urlUtils.updateQueryParam('', 'search', text);
	// 			params = urlUtils.updateQueryParam(params, 'page', 1);
	// 			const data = await peopleCrud.get(params);
	// 			setPeople(data);
	// 			setCurrentPage(1);
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error);
	// 		} finally {
	// 			stopLoading();
	// 		}
	// 	}, 300), // Adjust the debounce delay as needed
	// 	[]
	// );
	// useEffect(() => {
	// 	debouncedSearch(search);
	// 	return () => {
	// 		debouncedSearch.cancel();
	// 	};
	// }, [search, debouncedSearch]);


	const columns: DataTableColumn<People>[] = [
		{ accessor: 'name', sortable: true },
		{ accessor: 'height',  },
		{ accessor: 'birth_year' },
		{ accessor: 'mass' },
		{
			accessor: 'action',
			render(record, index) {
				const split = record.url.split('/')
				const id = split[split.length - 2]
				return <Link to={`/people/${id}`}><FaEye color='blue' /></Link>
			},
		},
	]

	return <Card h={'100%'} px={'50px'} pt={'20px'} sx={{ overflowY: 'auto' }}>


		<Title order={4} ta={'start'} pt={1}> Peoples </Title>
		<MantineDataTable
			columns={columns}
			stateKey='people'
			getApi={peopleCrud.get}
			setState={setPeople} />
		{/* <Flex direction={'column'}
			p={'xl'}
			rowGap={'xl'}
			bg={'#eaebed'}
			align={'center'}
			// justify={ }
			gap={'md'}
		>
			<Input
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder='Search'
				sx={{ alignSelf: 'end', borderRadius: '10px' }}
			/>
			<Table
			// maw='1000px'
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Hight</th>
						<th>Birth Year</th>
						<th>Mass</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{people.results.map((element, key) => {
						const split = element.url.split('/')
						const id = split[split.length - 2]
						return <tr key={key}>
							<td>{element.name}</td>
							<td>{element.height}</td>
							<td>{element.birth_year}</td>
							<td>{element.mass}</td>
							<td ><Link to={`/people/${id}`}><FaEye color='blue' /></Link> </td>
						</tr>
					})}
				</tbody>
			</Table>
			<Box sx={{ alignSelf: 'end' }} >
				<Pagination total={Math.ceil(people.count / 10)} value={currentPage} onChange={(page) => getPage(page)} />
			</Box>
		</Flex> */}
	</Card >
};

export default Peoples

