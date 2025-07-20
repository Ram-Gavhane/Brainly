import { atom } from "recoil"

export const modal = atom<boolean>({
    key:'modalState',
    default:false,
});
