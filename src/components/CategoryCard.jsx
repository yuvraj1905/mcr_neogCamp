import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryCard = ({ data }) => {
  const { _id, thumbnail, category } = data;
  const navigate = useNavigate();
  return (
    <div
      className="categoryCard"
      onClick={() => navigate(`/videos/${category}`)}
    >
      <span className="cursorPointer">
        <img src={thumbnail} alt={category} />
      </span>
      <p className="cursorPointer">{category}</p>
    </div>
  );
};

export default CategoryCard;
