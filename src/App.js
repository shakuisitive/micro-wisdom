import { useEffect, useState } from "react";
import supabase from "./supabase";

// IMPORTING THE REQUIRED COMPONENTS
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import CategoryFilter from "./components/CategoryFilter";
import Loader from "./components/Loader";
import FactList from "./components/FactList";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [choosenCategory, setChoosenCategory] = useState("all");
  const [factAdded, setFactAdded] = useState(false);

  useEffect(() => {
    (async () => {
      let { data: facts, error } = await supabase.from("facts").select("*");

      if (error) {
        return alert("Error loading data");
      }

      setFacts(facts);

      setLoading(false);
    })();
  }, [factAdded]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm && (
        <NewFactForm
          setLoading={setLoading}
          setShowForm={setShowForm}
          facts={facts}
          setFacts={setFacts}
          factAdded={factAdded}
          setFactAdded={setFactAdded}
        />
      )}
      <main className="main">
        <CategoryFilter setChoosenCategory={setChoosenCategory} />
        {loading ? (
          <Loader />
        ) : (
          <FactList choosenCategory={choosenCategory} facts={facts} />
        )}
      </main>
    </>
  );
}

export default App;
