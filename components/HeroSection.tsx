import { TwitchStreamEmbed } from "./TwitchStreamEmbed"

export const HeroSection = ({ layout }:any) => {
  return (
    <div className='bg-slate-800 max-h-screen flex justify-around p-8 opacity-90 rounded-xl shadow-2xl'>
      <TwitchStreamEmbed />
      <Bio layout={layout} />
    </div>
  )
}

const Bio = ({ layout }:any) => {
  return (
    <div className='bg-slate-200 flex flex-col justify-center p-8 opacity-90 rounded-tr-xl rounded-br-xl shadow-2xl'>
      <div className="bg-slate-400 flex items-center p-4">
        <h1 className='text-4xl text-slate-800'>{layout.bioHeader}</h1>
      </div>
      <div className="m-6">
        {layout?.bioText ? (
          <div dangerouslySetInnerHTML={{ __html: layout.bioText }} />
        ) : (
          <p>No bio text available.</p>
        )}
      </div>
    </div>
  )
}