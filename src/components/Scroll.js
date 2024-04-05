import React, { useEffect, useState } from "react";
import Card from "./Card";

const Scroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const api = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`;
      const response = await fetch(api);
      const result = await response.json();
      setData((prevData) => [...prevData, ...result?.data]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log(data);
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div className="container my-4 flex flex-col gap-4">
      {data &&
        data?.length > 0 &&
        data.map((item) => (
          <React.Fragment id={item?.id}>
            <Card key={item.id} data={item} />
          </React.Fragment>
        ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Scroll;
