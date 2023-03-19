import { atom } from "recoil";

interface IToDoState {
  [key: string]: IState[];
}
export interface IState {
  id: number;
  text: string;
  url: string;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const dndState = atom<IToDoState>({
  key: "DND",
  default: {
    Basic: [],
  },
  effects: [localStorageEffect("DND")],
});

export const boardState = atom<string[]>({
  key: "Board",
  default: ["Basic"],
  effects: [localStorageEffect("Board")],
});
