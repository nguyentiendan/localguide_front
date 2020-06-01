import { math } from 'polished';

import { hideAt } from '../../utils/responsive';
import breakpoints from '../../styles/breakpoints';

const SmallScreen = hideAt({ min: math(`${breakpoints.md} + 1px`) });

export default SmallScreen;
