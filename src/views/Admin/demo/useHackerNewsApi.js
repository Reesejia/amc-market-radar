const useHackerNewsApi = () => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    'http://localhost/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = () => {
    setUrl(`http://localhost/api/v1/search?query=${query}`);
  };

  return { data, isLoading, isError, doFetch };
}


function App() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doFetch } = useHackerNewsApi();

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(
            `http://localhost/api/v1/search?query=${query}`,
          );

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}

    </Fragment>
  );
}
