import shakeIcon from '../../../../Assets/shaker.png'
import chopIcon from '../../../../Assets/chop.png'
import pourIcon from '../../../../Assets/pour.png'
import { pourDictionary, shakeDictionary, chopDictionary } from '../dictionaries/dictionaryFilterIcons'

const getIconForPreparation = (text) => {
    text = text.toLowerCase();

    if (text.includes('dodaj')) {
        return pourIcon;
    } else if (pourDictionary.some(action => text.includes(action))) {
        return pourIcon;
    } else if (shakeDictionary.some(action => text.includes(action))) {
        return shakeIcon;
    } else if (chopDictionary.some(action => text.includes(action))) {
        return chopIcon;
    }
    return shakeIcon; // Domyślnie zwracamy shakeIcon
};

export default getIconForPreparation;
