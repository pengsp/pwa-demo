import Rankings from "../../components/rankings";
import Recommend from "../../components/recommend";
import SearchBar from "../../components/searchBar";



function Home() {
  return (<div >
    <SearchBar />
    <Recommend />
    <Rankings />
  </div>)
}
export default Home;