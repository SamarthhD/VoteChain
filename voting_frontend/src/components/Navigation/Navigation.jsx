import { Link } from "react-router-dom";
const Navigation=()=>{
return(
    <>
    <ul>
         <li><Link to="/"> home</Link></li>
         <li><Link to="/registerCandidate"> registerCandidate</Link></li>
         <li><Link to="/registerVoter">RegisterVoter</Link></li>
         <li><Link to="/getCandidatelist">getCandidatelist</Link></li>
         <li><Link to="/getVoterlist">getVoterlist</Link></li>
         <li><Link to="/electionCommission">electionCommission</Link></li>
         
    </ul>
           
    </>
)
}
export default Navigation;