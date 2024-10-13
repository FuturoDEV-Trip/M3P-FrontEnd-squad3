import "./Card.css";
import PropTypes from 'prop-types';

export function Card({ title, count }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-count">{count}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};