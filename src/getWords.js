const getWords = async (page, group) => {
    const url = "https://afternoon-falls-25894.herokuapp.com/words";
    const rawResponse = await fetch(`${url}?page=${page}&group=${group}`);
    const word = await rawResponse.json();
    return word;
};

export default getWords;