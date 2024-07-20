import { useCallback } from "react";
import { useState } from "react";
import supabase from "../supabase";

import { CATEGORIES } from "../constants/categories";

function Fact({ fact }) {
  let {
    text,
    source,
    category,
    votesInteresting: vInteresting,
    votesMindblowing: vMindblowing,
    votesFalse: vFalse,
  } = fact;

  const [votesInteresting, setvotesInteresting] = useState(vInteresting);
  const [votesMindblowing, setvotesMindblowing] = useState(vMindblowing);
  const [votesFalse, setVotesFalse] = useState(vFalse);

  let { color } = CATEGORIES.find((cat) => cat.name === category);

  let updateVoteCount = useCallback(
    async (factId, voteFieldToUpdate, amountToUpdateBy) => {
      if (vInteresting === amountToUpdateBy) {
        return;
      }

      await supabase
        .from("facts")
        .update({ [voteFieldToUpdate]: amountToUpdateBy })
        .eq("id", factId)
        .select();
    },
    []
  );

  let returnVoteFunction = useCallback(
    (type) => {
      let handleVotesCount = async () => {
        switch (type) {
          case "interesting":
            setvotesInteresting(votesInteresting + 1);
            await updateVoteCount(
              fact.id,
              "votesInteresting",
              votesInteresting + 1
            );
            break;

          case "mindblowing":
            setvotesMindblowing(votesMindblowing + 1);
            await updateVoteCount(
              fact.id,
              "votesMindblowing",
              votesMindblowing + 1
            );
            break;

          case "false":
            setVotesFalse(votesFalse + 1);
            await updateVoteCount(fact.id, "votesFalse", votesFalse + 1);
            break;

          default:
        }
      };
      return handleVotesCount;
    },
    [votesInteresting, votesMindblowing, votesFalse, updateVoteCount, fact.id]
  );

  return (
    <li className="fact">
      <p>
        {text}
        <a className="source" href={source}>
          (Source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: `${color}` }}>
        {category}
      </span>
      <div className="vote-buttons">
        <button onClick={returnVoteFunction("interesting")}>
          👍 {votesInteresting}{" "}
        </button>
        <button onClick={returnVoteFunction("mindblowing")}>
          🤯 {votesMindblowing}{" "}
        </button>
        <button onClick={returnVoteFunction("false")}>⛔️ {votesFalse} </button>
      </div>
    </li>
  );
}

export default Fact;
