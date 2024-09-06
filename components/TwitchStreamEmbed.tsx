export const TwitchStreamEmbed = () => {
  return (
    <iframe /* This will not center */
      src={`https://player.twitch.tv/?channel=jakerz7z&parent=${process.env.NEXT_PUBLIC_DOMAIN}`}
      height="720"
      width="1280"
      style={{
        display: 'block',
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
      }}
      allowFullScreen={true}
    />
  )
}