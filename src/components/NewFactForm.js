import { useState, useCallback } from "react";
import supabase from "../supabase";

import { CATEGORIES } from "../constants/categories";

function NewFactForm({
  setLoading,
  factAdded,
  setFactAdded,
  facts,
  setFacts,
  setShowForm,
}) {
  let validURLChecker = useCallback((URL) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    console.log("ran");
    return !!urlPattern.test(URL);
  }, []);
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(facts);
    if (text && validURLChecker(source) && category) {
      const { data } = await supabase
        .from("facts")
        .insert([{ text, source, category }]);

      setLoading(true);
      setFactAdded(!factAdded);

      console.log(data);
    }

    setText("");
    setSource("");
    setCategory("");
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="fact-form">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        value={text}
        placeholder="Share a fact with the world..."
      />
      <span>{200 - text.length}</span>
      <input
        onChange={(e) => setSource(e.target.value)}
        type="text"
        value={source}
        placeholder="Trustworthy source..."
      />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option onChange={(e) => console.log(e.target.value)}>
          Choose category:
        </option>
        {CATEGORIES.map((category) => {
          let { name } = category;

          return (
            <option key={crypto.randomUUID()} value={name}>
              {name.toUpperCase()}
            </option>
          );
        })}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

export default NewFactForm;
