import React, { useEffect, useState } from "react";
import Card from "./Card";

const Scroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const fetchData = async () => {
    if (data.length >= totalData && totalData !== 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const api = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`;
      const response = await fetch(api);
      const result = await response.json();
      const fetchedData = result?.data || [];
      setTotalData(result?.total);
      setData((prevData) => [...prevData, ...fetchedData]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          <React.Fragment key={item?.id}>
            <Card key={item.id} data={item} />
          </React.Fragment>
        ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Scroll;
