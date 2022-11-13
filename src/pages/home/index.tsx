import Rankings from "../../components/rankings";
import Recommend from "../../components/recommend";
import SearchBar from "../../components/searchBar";



function Home() {
  return (<>
    <SearchBar />
    <Recommend />
    <Rankings />
  </>)
}
export default Home;