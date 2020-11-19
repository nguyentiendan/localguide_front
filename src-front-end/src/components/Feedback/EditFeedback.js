import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import * as API from '../../apis';

const EditFeedback = ({ data, dataEdit, setDataEdit }) => {
  return (
    <Input
      onChange={e => {
        const newDataFeedback = { ...dataEdit };
        setDataEdit(
          (newDataFeedback[data.ID] = {
            [data.ID]: { ...newDataFeedback[data.ID], value: e.target.value },
          })
        );
      }}
      onPressEnter={async e => {
        const newDataFeedback = { ...dataEdit };
        setDataEdit(
          (newDataFeedback[data.ID] = {
            [data.ID]: { ...newDataFeedback[data.ID], isOpen: false, value: e.target.value },
          })
        );
        await API.handleEditFeedback({ id: data.ID, content: e.target.value });
      }}
      value={dataEdit[data.ID]?.value || data.Content}
    />
  );
};

EditFeedback.propTypes = {
  data: PropTypes.shape({
    ID: PropTypes.number,
    Content: PropTypes.string,
  }).isRequired,
  dataEdit: PropTypes.shape({}),
  setDataEdit: PropTypes.func,
};

EditFeedback.defaultProps = {
  dataEdit: {},
  setDataEdit: () => {},
};

export default EditFeedback;
