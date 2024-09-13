'use client'
import { Text, Table } from '@mantine/core';
import { useNetwork, useOs } from '@mantine/hooks';

export const NetworkStatus = () => {
  const networkStatus = useNetwork();
  const os = useOs();

  return (
    <div className='bg-white p-2 fixed top-5 right-5 opacity-90'>
      <Table maw={300} layout="fixed" mx="auto">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Property</Table.Th>
            <Table.Th>Value</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Your OS</Table.Td>
            <Table.Td>
              <Text size="sm">
                {os}
              </Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>Online</Table.Td>
            <Table.Td>
              <Text size="sm" c={networkStatus.online ? 'teal.6' : 'red.6'}>
                {networkStatus.online ? 'Online' : 'Offline'}
              </Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>rtt</Table.Td>
            <Table.Td>{networkStatus.rtt}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>downlink</Table.Td>
            <Table.Td>{networkStatus.downlink}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>effectiveType</Table.Td>
            <Table.Td>{networkStatus.effectiveType}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>saveData</Table.Td>
            <Table.Td>
              <Text size="sm" c={networkStatus.saveData ? 'teal.6' : 'red.6'}>
                {networkStatus.saveData ? 'true' : 'false'}
              </Text>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  );
}