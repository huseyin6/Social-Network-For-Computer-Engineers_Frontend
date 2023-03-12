import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { CopyBlock } from 'react-code-blocks';
import { attendEvent } from '../../actions/event';

const EventItem = ({
  attendEvent,
  event: {
    _id,
    description,
    date,
  },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <p className='my-1'></p>
      {(
        <CopyBlock
          text={description}
          showLineNumbers={true}
          wrapLines
          theme={'dracula'}
        />
      )}
      <p className='post-date'>Date {formatDate(date)}</p> {/*Event post olarak atılabilen bişey değil direk backendden hazır olarak çekilmesi lazım */}
      <button
        onClick={() => attendEvent(_id)}
        type='button'
        className='btn btn-light'
      >
      </button>
    </div>
  </div>
);

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  attendEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { attendEvent })(
  EventItem
);
