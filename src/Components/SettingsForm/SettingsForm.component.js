/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-datetime-picker';

import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { updateSettings } from 'Redux/timeline/timeline.actions';
import { addMessage } from 'Redux/flash/flash.actions';
import ButtonProperty from 'Components/ButtonProperty/ButtonProperty.component';
import Property from 'Components/Property/Property.component';
import TextBox from 'Components/TextBox/TextBox.component';
import TextButton from 'Components/TextButton/TextButton.component';
import Button from 'Components/Button/Button.component';

import './SettingsForm.styles.scss';
import './DateTimePicker.styles.scss';

const SettingsForm = ({ dispatch, savedSettings, submitHandler }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [lengthMode, setLengthMode] = useState('time');
  const [length, setLength] = useState(config.PRESET_LENGTHS[0]);
  const [customLength, setCustomLength] = useState(60);
  const [movieQuantity, setMovieQuantity] = useState(0);
  const [padding, setPadding] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setLengthMode(savedSettings.lengthMode);
    setDateTime(new Date(savedSettings.startDateTime));

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
      if (length === 'custom') {
        marathonLength = customLength;
      }
      marathonPadding = 0;
    } else {
      marathonLength = movieQuantity;
    }

    dispatch(
      updateSettings({
        lengthMode,
        length: +marathonLength,
        padding: +marathonPadding,
        startDateTime: dateTime,
      })
    );

    dispatch(addMessage('Your marathon settings have been updated', 'success'));

    history.push('/timeline');

    if (submitHandler) {
      submitHandler();
    }
  };

  const handleRadioChange = (event) => {
    setLength(event.target.value);
    setCustomLength(60);
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <h1>Marathon Settings</h1>

      <div className="property">
        <label className="property__label">Select a start date and time</label>
        <div className="property__input">
          <DateTimePicker
            onChange={setDateTime}
            value={dateTime}
            calendarIcon={null}
            clearIcon="Clear"
            disableClock
          />
        </div>
      </div>

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
              onChange={handleRadioChange}
              label={`${presetLength} hours`}
            />
          ))}

          <ButtonProperty
            id="length-custom"
            name="length"
            type="radio"
            value="custom"
            checked={length === 'custom'}
            onChange={handleRadioChange}
            label="Custom"
          />

          {length === 'custom' ? (
            <Property id="custom-length" label="Custom Length (in hours)">
              <TextBox
                id="custom-length"
                type="number"
                value={customLength / 60}
                name="custom-length"
                onChange={(event) => setCustomLength(+event.target.value * 60)}
                className="text-box text-box--small"
                min="1"
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
              onChange={(event) => setMovieQuantity(event.target.value)}
              className="text-box text-box--small"
              min="0"
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
              onChange={(event) => setPadding(event.target.value)}
              className="text-box text-box--small"
              min="0"
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
        <Button type="submit" className="button button--full">
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
  dispatch: PropTypes.func.isRequired,
  savedSettings: PropTypes.shape(propShapes.settings).isRequired,
  submitHandler: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { savedSettings: state.timeline.settings };
};

export default connect(mapStateToProps)(SettingsForm);
