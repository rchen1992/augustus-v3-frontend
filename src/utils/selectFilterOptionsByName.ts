/**
 * Serach filter function for Ant Design Select component.
 * Filters by the select option name.
 */
export default (inputValue: string, option: React.ReactElement) => {
    const optionLabel = option?.props?.children;
    if (!optionLabel) {
        return false;
    }

    return (optionLabel as string).toLowerCase()?.indexOf(inputValue.toLowerCase()) >= 0;
};
