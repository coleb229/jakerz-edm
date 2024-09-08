'use client'
import { Table, TableData } from '@mantine/core';
import styles from './ShowsTable.module.css';

export const ShowsTable = ({ data }:any) => {

  const rows = data.map((show) => (
    <Table.Tr key={show.name}>
      <Table.Td>{show.date}</Table.Td>
      <Table.Td>{show.time}</Table.Td>
      <Table.Td>{show.name}</Table.Td>
      <Table.Td>{show.location}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className='w-1/2'>
      <Table stickyHeader stickyHeaderOffset={60} verticalSpacing="lg">
        <Table.Thead className={styles.tableHead}>
          <Table.Tr>
            <Table.Th>Show Date</Table.Th>
            <Table.Th>Show Time</Table.Th>
            <Table.Th>Show Name</Table.Th>
            <Table.Th>Show Location</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={styles.tableBody}>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}