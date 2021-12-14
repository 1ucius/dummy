export const getComponentsMap = (list, excludeNull) => {
  const array = [null, ...Object.keys(list)];

  if (excludeNull) return array.filter(x => x !== null);

  return array;
};

export const callEventWithoutPropagation = ({ e, callback }) => {
  e.preventDefault();
  e.stopPropagation();

  callback(e);
};

export const trimString = (str, max) => str.substring(0, max).trimEnd() + '...';

export const isNull = val => val === null;

export const isEmptyString = str => !str.length;

export const isEnterKey = e => e.which === 13;

// Allow NULL value for prop type
/* eslint react/destructuring-assignment: "off" */
export const allowNull = wrappedPropTypes => {
  return (props, propName, ...rest) => {
    if (!props[propName] === null) return null;

    return wrappedPropTypes(props, propName, ...rest);
  };
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};
