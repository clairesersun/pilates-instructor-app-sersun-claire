/*
To do:
-- back btn to return to the addToClass component
-- type field
--confirmation btn which will add the class name and the first exercise to the class database
*/
import { useRouter } from "next/router";

export default function NameOfClass() {
  const router = useRouter();
  const [{ className }, setForm] = useState({
    className: "",
  });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ className, ...{ [e.target.name]: e.target.value } });
  }
  async function handleAdd(e, exercises) {
    e.preventDefault();
    if (!className.trim()) return setError("class name is missing");
    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ className, exercises }),
      });
      if (res.status === 200) return router.back();
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form
        className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onSubmit={handleAdd}
      >
        <label htmlFor="className">Name of class: </label>
        <input
          type="text"
          name="className"
          id="className"
          onChange={handleChange}
          value={className}
        />
        <button>√</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
