import { hideAt } from '../../utils/responsive';
import breakpoints from '../../styles/breakpoints';

const BigScreen = hideAt({ max: breakpoints.md });

export default BigScreen;
