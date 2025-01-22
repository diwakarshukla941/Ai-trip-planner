import { Link } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
function App() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      {/* Hero  */}
      <h1 className="font-extrabold text-[50px] text-center mt-16 ">
        <span className="text-[#f85454]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized ltineraries At Your Fingertips{" "}
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button>Get Started Its Free</Button>
      </Link>
    </div>
  );
}

export default App;
