import React, { forwardRef } from 'react';
import './ProgressCircular.css';

const ProgressCircular = forwardRef(function ProgressCircular(props, ref) {
  return (
    <div ref={ref} className='ProgressCircular' data-testid='progress'>
      <svg className='ProgressCircular_indicator' viewBox='0 0 52 52'>
        <circle
          cx='26'
          cy='26'
          r='16'
          fill='none'
          stroke='url(#circular_progress)'
          strokeWidth='4'
        />
        <defs>
          <radialGradient id='circular_progress' r='1' cx='0' cy='0'>
            <stop offset='0%' stopColor='#282F36' />
            <stop offset='100%' stopColor='transparent' />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

export default ProgressCircular;
