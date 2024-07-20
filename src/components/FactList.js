import Fact from "./Fact";

function FactList({ facts, choosenCategory }) {
  let filteredFacts = [];

  if (choosenCategory === "all") {
    filteredFacts = [...facts];
  } else {
    let filteredFactsByCategory = facts.filter((fact) => {
      return fact.category === choosenCategory;
    });
    filteredFacts = [...filteredFactsByCategory];
  }

  filteredFacts.sort((a, b) => {
    let dateOfFirstElement = new Date(b.created_at);
    let dateOfSecondElement = new Date(a.created_at);

    return dateOfFirstElement - dateOfSecondElement;
  });

  return (
    <section>
      <ul className="facts-list">
        {filteredFacts.map((fact) => {
          return <Fact key={crypto.randomUUID()} fact={fact} />;
        })}
      </ul>
      <p>
        There are {filteredFacts.length} facts in the database. Add yours now!
      </p>
    </section>
  );
}

export default FactList;
