export default function History({gratitudes}) {
    return (
      <span className="font-bold">

        {gratitudes.map(g=> ' '+g.entry).toString()} 
       </span>
    )
}