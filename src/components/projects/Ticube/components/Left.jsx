import LeftItem from "./LeftItem";

function Left({scores, deleteItem, className}) {

  const elements = scores.length ? scores.map((item, i) => <LeftItem time={item} index={i} key={i} deleteItem={deleteItem} />) : <p className="nothing">Still empty</p>

  return (
    <div className={`left ${className}`}>
      <h3 className="left-title">List</h3>
      <ul className="left-list">
        {elements}
      </ul>
    </div>
  );
}

export default Left