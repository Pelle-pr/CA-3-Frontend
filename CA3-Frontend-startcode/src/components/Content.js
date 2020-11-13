import { useParams } from "react-router-dom";

export default function Content({ Poems }) {
  let { title } = useParams();
  let poem = Poems.find((poem) => poem.title === title);

  return (
    <div className="col-lg-6">
      {typeof poem !== "undefined" ? <h2>{poem.content}</h2> : ""}
    </div>
  );
}
