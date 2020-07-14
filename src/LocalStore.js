
class LocalStore
{
	static getItem (key) { return window.localStorage.getItem(key) }
	static setItem (key, val) { window.localStorage.setItem(key, val) }
	static removeItem(key) { window.localStorage.removeItem(key) }
	static deleteEverything() {
		console.warn("clearing all local storage");
		window.localStorage.clear();
	}
}

export default LocalStore;
