export const findWord = async (value: string) => {
	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
	if (value === "") return Promise.reject("Error");
	return fetch(url + value, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (res.status === 404) return Promise.reject("Can't find word");
			return res.json();
		})
		.then((res) => res[0]);
};
