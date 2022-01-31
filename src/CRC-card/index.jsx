import './main.css'
const CRCCard = ({resp, collab}) => {


  return (
    <div className="CRCCard">
      <h5>CRC-card</h5>
      <div className="sections">
        <div className="responsabilita">
          {resp}
        </div>
        <div className="collaboratori">
          {collab}
        </div>
      </div>
    </div>
  )

}

export default CRCCard;
