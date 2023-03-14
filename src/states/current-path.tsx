import { atom } from 'recoil';

const currentPathState = atom({
    key: 'currentPathState',
    default: '',
});

export { currentPathState };