import { SimpleGrid } from '@mantine/core';

export const ImageGalleryTable = ({ data }:any) => {
  return (
    <>
      {data.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <div className='px-40 py-20'>
          <SimpleGrid cols={4}>
            {data.map((item:any) => (
              <div key={item.id}>
                <img src={item.url} alt={item.alt} />
              </div>
            ))}
          </SimpleGrid>
        </div>
      )
      }
    </>
  )
}