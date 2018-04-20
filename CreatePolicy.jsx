import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Input, Dropdown } from 'semantic-ui-react';

const CreatePolicy = ({ configState }) => {
  let configFields;
  if (configState.config.length !== 0) {
    configFields = configState.config.map(config => config.policyConfiguration.fields);
  }

  const renderField = (field) => {
    switch (field.type) {
      case 'string':
        return (
          <div>
            <Input fluid label={field.title}/>
          </div>
        );
      case 'select': {
        const fieldOpts = field.values.map(value =>
          Object.assign({ key: value }, { value }, { text: value }),
        );
        return (
          <div>
            <Dropdown placeholder={field.title} options={fieldOpts} fluid selection />
          </div>
        );
      }
      default:
        return (
          <div />
        );
    }
  };

  const renderFields = () => {
    if (configFields && configFields.length !== 0) {
      return configFields[0].map((field) => {
        console.log(field);
        return (
          <Grid.Column>
            {renderField(field)}
          </Grid.Column>
        );
      });
    }

    return (
      <Grid.Column>
        <p>Loading...</p>
      </Grid.Column>
    );
  };

  return (
    <Grid columns={2}>
      {renderFields()}
    </Grid>
  );
};

CreatePolicy.defaultProps = {
  configState: {},
};

CreatePolicy.propTypes = {
  configState: PropTypes.object,
};

export default CreatePolicy;

