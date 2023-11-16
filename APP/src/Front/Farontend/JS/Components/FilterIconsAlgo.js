import shakeIcon from '../../../../Assets/shaker.png'
import chopIcon from '../../../../Assets/chop.png'
import pourIcon from '../../../../Assets/pour.png'
import decorateIcon from '../../../../Assets/decorate.png'
import succesIcon from '../../../../Assets/victory.png'

import { pourDictionary, shakeDictionary, chopDictionary, decorateDictionary } from '../dictionaries/dictionaryFilterIcons'

const getIconForPreparation = (text) => {
    text = text.toLowerCase();

    if (text.includes('dodaj')) {
        return pourIcon
    } else if (pourDictionary.some(action => text.includes(action))) {
        return pourIcon
    } else if (shakeDictionary.some(action => text.includes(action))) {
        return shakeIcon
    } else if (chopDictionary.some(action => text.includes(action))) {
        return chopIcon
    } else if (decorateDictionary.some(action => text.includes(action))) {
        return decorateIcon;
    } else if (decorateDictionary.some(action => text.includes(action))) {
        return decorateIcon;
    } else if (text === '') { 
        return succesIcon;
    }
    return shakeIcon;
};

export default getIconForPreparation;
