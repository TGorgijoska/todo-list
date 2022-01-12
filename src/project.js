export default function Project (name) {

    const uniqueName = (arr) => {
        if(arr == null) return false;
        return arr.some(el => el.name == name);
    }

    return {name, uniqueName};
}