import { CATEGORIES } from "../constants/categories";

function CategoryFilter({ setChoosenCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={(e) => setChoosenCategory("all")}
            className="btn btn-all-categories"
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => {
          let { name, color } = cat;
          return (
            <li key={crypto.randomUUID()} className="category">
              <button
                className="btn btn-category"
                style={{ backgroundColor: `${color}` }}
                onClick={(e) =>
                  setChoosenCategory(e.target.innerText.toLowerCase())
                }
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
