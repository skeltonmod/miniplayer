import { is_dark_theme } from "../util/store";

export const updateTheme = () => {
    is_dark_theme.update((value) => {
        console.log(value);
        return !value;
    });
}