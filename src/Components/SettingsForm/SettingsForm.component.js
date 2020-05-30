import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateSettings } from 'Redux/timeline/timeline.actions';

const PRESET_LENGTHS = [8, 10, 12, 24];

const SettingsForm = ({ updateSettings, savedSettings }) => {
  const [lengthMode, setLengthMode] = useState('time');
  const [length, setLength] = useState(PRESET_LENGTHS[0]);
  const [customLength, setCustomLength] = useState('');
  const [movieQuantity, setMovieQuantity] = useState('');
  const [padding, setPadding] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setLengthMode(savedSettings.lengthMode);

    if (savedSettings.lengthMode === 'time') {
      if (PRESET_LENGTHS.includes(savedSettings.length / 60)) {
        setLength(savedSettings.length);
      } else {
        setLength('custom');
        setCustomLength(savedSettings.length);
      }
    } else {
      setMovieQuantity(savedSettings.length);
      setPadding(savedSettings.padding);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let marathonLength = length;
    let marathonPadding = padding;

    if (lengthMode === 'time') {
      if (customLength > 0) {
        marathonLength = customLength;
      }
      marathonPadding = 0;
    } else {
      marathonLength = movieQuantity;
    }

    updateSettings({
      lengthMode,
      length: +marathonLength,
      padding: +marathonPadding,
    });

    history.push('/timeline');
  };

  const handleRadioChange = (event) => {
    setLength(event.target.value);
    setCustomLength('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Marathon Settings</p>

      {lengthMode === 'time' ? (
        <div>
          {PRESET_LENGTHS.map((presetLength) => (
            <p key={presetLength}>
              <label>
                <input
                  name="length"
                  type="radio"
                  value={presetLength * 60}
                  onChange={handleRadioChange}
                  checked={presetLength * 60 === +length}
                />
                <span>{presetLength} Hours</span>
              </label>
            </p>
          ))}
          <p>
            <label>
              <input
                name="length"
                type="radio"
                value="custom"
                onChange={handleRadioChange}
              />
              <span>Custom</span>
            </label>
          </p>

          {length === 'custom' ? (
            <div className="input-field">
              <input
                id="custom-length"
                type="number"
                value={customLength}
                onChange={(event) => setCustomLength(+event.target.value * 60)}
              />
              <label htmlFor="custom-length">Custom Length (in hours)</label>
            </div>
          ) : (
            ''
          )}

          <p>
            Prefer to create a marathon based on number of movies?{' '}
            <button type="button" onClick={() => setLengthMode('movie')}>
              Switch
            </button>
          </p>
        </div>
      ) : (
        <div>
          <div className="input-field">
            <input
              id="quantity-length"
              type="number"
              value={movieQuantity}
              onChange={(event) => setMovieQuantity(event.target.value)}
            />
            <label htmlFor="quantity-length">Enter a number of movies</label>
          </div>
          <div className="input-field">
            <input
              id="padding"
              type="number"
              value={padding}
              onChange={(event) => setPadding(event.target.value)}
            />
            <label htmlFor="padding">
              How many minutes do you want between each movie
            </label>
          </div>
          <p>
            Prefer to create a marathon based on a set length?{' '}
            <button type="button" onClick={() => setLengthMode('time')}>
              Switch
            </button>
          </p>
        </div>
      )}

      <p>
        <button type="submit" className="btn">
          Save
        </button>
      </p>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { savedSettings: state.timeline.settings };
};

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (settings) => dispatch(updateSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
