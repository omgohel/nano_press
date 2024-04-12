import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function News() {
  const [news, setNews] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Initial page size

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&from=2024-03-12&sortBy=publishedAt&apiKey=8a53d6aa15464a049f41c77e2fff713a&pageSize=${pageSize}`
        );
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here, such as displaying a message to the user
      }
    };

    fetchData();
  }, [pageSize]);

  const handleLoadMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10);
  };

  const MAX_LINES = 6; // Maximum number of lines to display

  // Function to preprocess content and remove "[+7598 chars]" part
  const preprocessContent = (content) => {
    // Remove the trailing "[+7598 chars]" part
    const processedContent = content.replace(/\[.*chars\]/, "");
    return processedContent;
  };
  return (
    <>
      {news
        .filter(
          (articles) =>
            articles &&
            articles.title &&
            articles.author &&
            articles.publishedAt &&
            articles.content &&
            articles.urlToImage &&
            articles.url
        ) // Filter out articles with null values
        .map((articles) => (
          <div
            className="d-flex justify-content-center align-items-center w-100 mt-4"
            key={articles.id}
          >
            <Card
              style={{
                width: "60rem",
                border: "none",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.11)",
              }}
            >
              <div className="row no-gutters d-flex justify-content-between">
                <div className="col-md-4 d-flex align-items-center">
                  <Card.Img
                    variant="top"
                    src={articles.urlToImage}
                    className="m-2"
                    style={{
                      width: "300px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-end">
                  <Card.Body>
                    <h1 style={{ fontSize: "20px" }}>{articles.title}</h1>
                    <h6 style={{ fontSize: "12px" }}>
                      <strong>Short by </strong> {articles.author} /{" "}
                      {new Date(articles.publishedAt).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </h6>
                    <h5
                      style={{
                        fontSize: "18px",
                        display: "-webkit-box",
                        WebkitLineClamp: MAX_LINES,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: "1 0 auto",
                      }}
                      className="mt-4"
                    >
                      {preprocessContent(articles.content)}
                    </h5>
                  </Card.Body>
                  <h6 style={{ fontSize: "12px" }} className="mx-3">
                    read more at{" "}
                    <a
                      href={articles.source.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      {new URL(articles.url).hostname}
                    </a>
                  </h6>
                </div>
              </div>
            </Card>
          </div>
        ))}

      {/* Load More button */}
      <div className="d-flex justify-content-center mt-4 mb-4">
        <Button
          variant="outline-danger"
          className="rounded"
          onClick={handleLoadMore}
        >
          Load more...
        </Button>
      </div>
    </>
  );
}

export default News;
