import { FC, useState } from 'react';
import { Box, Flex, Pagination, Table, Title } from "@mantine/core";
import { useAppStore } from '../../store/app.store';
import { useQuery } from '@tanstack/react-query';
import { peopleCrud } from '../../api/apis';
import urlUtils from '../../utils/urlUtils';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Landing: FC = () => {


	const { people, setPeople } = useAppStore((state) => state);
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['people'],
		queryFn: () => fetchData(),
		onSuccess: (data) => {
			setPeople(data);
		}
	})
	const [currentPage, setCurrentPage] = useState(1)


	async function fetchData() {
		return peopleCrud.get()
	}
	async function getPage(page: number) {
		try {
			const params = urlUtils.updateQueryParam('', 'page', page)
			const data = await peopleCrud.get(params)
			setPeople(data)
			setCurrentPage(page)
		} catch (error) {

		}
	}

	return <div>

		<Title order={4} ta={'center'} pt={20}> Peoples </Title>
		<Flex direction={'column'}
			align={'center'}
			// justify={ }
			gap={'md'}
		>
			<Table
				maw='1000px'
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
			<Box w={1000} >
				<Pagination total={Math.ceil(people.count / 10)} value={currentPage} onChange={(page) => getPage(page)} />
			</Box>
			{/* <Pagination total={totalPages} value={page} onChange={setPage} withPages={false} /> */}
		</Flex>
	</div>
};

export default Landing

