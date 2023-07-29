import React from "react";
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";
import "../styles/Home.css";

const Home = () => {
  const categoriesData = categories;
  return (
    <div>
      <h1>Categories</h1>
      <section className="categoriesSection">
        {categoriesData?.map((category) => (
          <CategoryCard data={category} key={category._id} />
        ))}
      </section>
    </div>
  );
};

export default Home;
