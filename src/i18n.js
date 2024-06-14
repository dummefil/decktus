class Localizator {
    constructor() {
        this.lang = 'ru';
        this.dict = {
            'presetGroup': 'Группа'
        }
    }
    localize(id) {
        return this.dict[id] || id;
    }
}

export const localizator = new Localizator()
