/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { updateSettings as updateSettingsAction } from 'Redux/timeline/timeline.actions';
import ButtonProperty from 'Components/ButtonProperty/ButtonProperty.component';
import Property from 'Components/Property/Property.component';
import TextBox from 'Components/TextBox/TextBox.component';
import TextButton from 'Components/TextButton/TextButton.component';
import Button from 'Components/Button/Button.component';

import './SettingsForm.styles.scss';

const SettingsForm = ({ savedSettings, submitHandler, updateSettings }) => {
  const [lengthMode, setLengthMode] = useState('time');
  const [length, setLength] = useState(config.PRESET_LENGTHS[0]);
  const [customLength, setCustomLength] = useState('');
  const [movieQuantity, setMovieQuantity] = useState(0);
  const [padding, setPadding] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setLengthMode(savedSettings.lengthMode);

    if (savedSettings.lengthMode === 'time') {
      if (config.PRESET_LENGTHS.includes(savedSettings.length / 60)) {
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

    if (submitHandler) {
      submitHandler();
    }
  };

  const handleRadioChange = (event) => {
    setLength(event.target.value);
    setCustomLength('');
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <h1>Marathon Settings</h1>

      {lengthMode === 'time' ? (
        <div>
          {config.PRESET_LENGTHS.map((presetLength) => (
            <ButtonProperty
              key={presetLength}
              id={`length-${presetLength}`}
              name="length"
              type="radio"
              value={presetLength * 60}
              checked={presetLength * 60 === +length}
              changeHandler={handleRadioChange}
              label={`${presetLength} hours`}
            />
          ))}

          <ButtonProperty
            id="length-custom"
            name="length"
            type="radio"
            value="custom"
            checked={length === 'custom'}
            changeHandler={handleRadioChange}
            label="Custom"
          />

          {length === 'custom' ? (
            <Property id="custom-length" label="Custom Length (in hours)">
              <TextBox
                id="custom-length"
                type="number"
                value={customLength / 60}
                name="custom-length"
                changeHandler={(event) =>
                  setCustomLength(+event.target.value * 60)
                }
                modifier="text-box--small"
              />
            </Property>
          ) : (
            ''
          )}

          <p>
            Prefer to create a marathon based on number of movies?{' '}
            <TextButton clickHandler={() => setLengthMode('movie')}>
              Switch
            </TextButton>
          </p>
        </div>
      ) : (
        <div>
          <Property
            id="quantity-length"
            label="How many movies do you want in the marathon?"
          >
            <TextBox
              id="quantity-length"
              type="number"
              value={movieQuantity}
              name="quantity-length"
              changeHandler={(event) => setMovieQuantity(event.target.value)}
              modifier="text-box--small"
            />
          </Property>

          <Property
            id="padding"
            label="How many minutes do you want between each movie?"
          >
            <TextBox
              id="padding"
              type="number"
              value={padding}
              name="padding"
              changeHandler={(event) => setPadding(event.target.value)}
              modifier="text-box--small"
            />
          </Property>

          <p>
            Prefer to create a marathon based on a set length?{' '}
            <TextButton clickHandler={() => setLengthMode('time')}>
              Switch
            </TextButton>
          </p>
        </div>
      )}

      <p>
        <Button type="submit" modifier="button--full">
          Save
        </Button>
      </p>
    </form>
  );
};

SettingsForm.defaultProps = {
  submitHandler: null,
};

SettingsForm.propTypes = {
  savedSettings: PropTypes.shape(propShapes.settings).isRequired,
  submitHandler: PropTypes.func,
  updateSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { savedSettings: state.timeline.settings };
};

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (settings) => dispatch(updateSettingsAction(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
