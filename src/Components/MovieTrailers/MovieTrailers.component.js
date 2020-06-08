import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from 'Components/Modal/Modal.component';

import './MovieTrailers.styles.scss';

const MovieTrailers = ({ trailers }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState();

  useEffect(() => {
    setCurrentTrailer(trailers[0]);
  }, [trailers]);

  const renderTrailerButton = (trailer) => {
    return (
      <li key={trailer.id} className="trailers__item">
        <button
          type="button"
          className="text-button"
          onClick={() => setCurrentTrailer(trailer)}
        >
          {trailer.name}
        </button>
      </li>
    );
  };

  if (!trailers || trailers.length === 0) {
    return '';
  }

  return (
    <>
      <div className="movie-detail-page__trailer">
        <button type="button" onClick={() => setShowModal(true)}>
          Trailers
        </button>
      </div>

      {showModal ? (
        <Modal closeHandler={() => setShowModal(false)}>
          <div className="trailers">
            <div className="trailers__current">
              <div className="responsive-frame">
                <iframe
                  title={currentTrailer.name}
                  src={`https://www.youtube.com/embed/${currentTrailer.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="trailers__list">
              <ul className="trailers__items list-reset">
                {trailers.map(renderTrailerButton)}
              </ul>
            </div>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

MovieTrailers.defaultProps = {
  trailers: [],
};

MovieTrailers.propTypes = {
  trailers: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MovieTrailers;
