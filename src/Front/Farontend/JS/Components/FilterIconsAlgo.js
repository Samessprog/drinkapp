import shakeIcon from '../../../../Assets/shaker.png'
import chopIcon from '../../../../Assets/chop.png'
import pourIcon from '../../../../Assets/pour.png'
import decorateIcon from '../../../../Assets/decorate.png'
import successIcon from '../../../../Assets/victory.png'
import peelIcon from '../../../../Assets/peel.png'
import serveIcon from '../../../../Assets/serve.png'

import { pourDictionary, shakeDictionary, chopDictionary, decorateDictionary, peelDictionary, serveDictionary } from '../dictionaries/dictionaryFilterIcons'

const getIconForPreparation = (text) => {
    text = text.toLowerCase()
    if (pourDictionary.some(action => text.includes(action))) {
        return pourIcon
    } else if (shakeDictionary.some(action => text.includes(action))) {
        return shakeIcon
    } else if (chopDictionary.some(action => text.includes(action))) {
        return chopIcon
    } else if (decorateDictionary.some(action => text.includes(action))) {
        return decorateIcon
    } else if (peelDictionary.some(action => text.includes(action))) {
        return peelIcon
    } else if (serveDictionary.some(action => text.includes(action))) {
        return serveIcon
    } else if (text === '') {
        return successIcon
    }
    return shakeIcon
}

export default getIconForPreparation
