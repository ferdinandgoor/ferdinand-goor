export default function Home() {
  const list = [
    {
      artist: "Dissolve",
      song: "Efficiency Defiled",
      date: "Sep 10, 2023",
      youtubeId: "00odCw8P6SI",
    },
    {
      artist: "HIPSKÖR",
      song: "DANSU",
      date: "Feb 13, 2022",
      youtubeId: "jRqnSQSIcnA",
    },
    {
      artist: "Kolen.",
      song: "Flagless",
      date: "Mar 11, 2023",
      youtubeId: "gR9IgYqV8Kg",
    },
    {
      artist: "Obsidian",
      song: "A Life to Fail",
      date: "Feb 24, 2022",
      youtubeId: "Hb8tgfJ73qA",
    },
    {
      artist: "Obsidian",
      song: "Rea(lies)",
      date: "Mar 16, 2020",
      youtubeId: "hLjNzYgETSg",
    },
    {
      artist: "Causality",
      song: "Introspection",
      date: "Jun 9, 2023",
      youtubeId: "iZaNqV6_6O0",
    },
    {
      artist: "Causality",
      song: "Overflooded",
      date: "Mar 31, 2023",
      youtubeId: "-C2ydlfEn5w",
    },
    {
      artist: "Causality",
      song: "Chemicals",
      date: "Mar 4, 2022",
      youtubeId: "r5IdKc5aU7E",
    },
    {
      artist: "Causality",
      song: "Disbelief",
      date: "Feb 2, 2020",
      youtubeId: "pcZaO_aWH3I",
    },
    {
      artist: "Causality",
      song: "Icarus",
      date: "Dec 8, 2019",
      youtubeId: "7Hcxkg9KzGs",
    }
  ]

  return (
    <ul>
      <li>
        {
          list.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return  dateB.getTime() - dateA.getTime() ;
          }).map(item => (
            <>
              <h2>{item.artist} - {item.song}</h2>
              <h3>{item.date}</h3>
              <a href={`https://www.youtube.com/watch?v=${item.youtubeId}`} >Lien</a>
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item.youtubeId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </>
          ))
        }
      </li>
    </ul>
  )
}
