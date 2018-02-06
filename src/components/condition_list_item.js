import React from 'react';

const ConditionListItem = ({condition}) => {
  return (
    <tr className="conditions__item">
      <td className="conditions__type">{condition.condition}</td>
      <td className="conditions__date">{condition.date}</td>
      <td className="conditions__link"><a href={condition.link}>More info</a></td>
    </tr>
  );
}

export default ConditionListItem;