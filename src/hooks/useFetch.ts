import { useEffect, useState } from "react";

type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

const useFetch = <T,>(url: string): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    status: "loading",
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ status: "loading" });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data: T = await response.json();

        setState({
          status: "success",
          data,
        });
      } catch (error: unknown) {
        setState({
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default useFetch;