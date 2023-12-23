import shakeIcon from '../../../../Assets/Normal/shaker.png'
import chopIcon from '../../../../Assets/Normal/chop.png'
import pourIcon from '../../../../Assets/Normal/pour.png'
import decorateIcon from '../../../../Assets/Normal/decorate.png'
import successIcon from '../../../../Assets/Normal/victory.png'
import peelIcon from '../../../../Assets/Normal/peel.png'
import serveIcon from '../../../../Assets/Normal/serve.png'

//Icons for mobile
import chopMobileIcon from '../../../../Assets/Mobile/chop_Mobile.png'
import decorateMobileIcon from '../../../../Assets/Mobile/cocktail.png'
import shakerMobileIcon from '../../../../Assets/Mobile/mixer.png'
import peelMobileIcon from '../../../../Assets/Mobile/peel.png'
import pourMobileIcon from '../../../../Assets/Mobile/pouring.png'
import serveMobileIcon from '../../../../Assets/Mobile/serve.png'

import { pourDictionary, shakeDictionary, chopDictionary, decorateDictionary, peelDictionary, serveDictionary } from '../dictionaries/dictionaryFilterIcons'


const getIconForPreparation = (text) => {
    let windowSize = window.innerWidth;
    text = text.toLowerCase()
    if (pourDictionary.some(action => text.includes(action))) {
        return windowSize > 576 ? pourIcon : pourMobileIcon
    } else if (shakeDictionary.some(action => text.includes(action))) {
        return windowSize > 576 ? shakeIcon : shakerMobileIcon
    } else if (chopDictionary.some(action => text.includes(action))) {
        return windowSize > 576 ? chopIcon : chopMobileIcon
    } else if (decorateDictionary.some(action => text.includes(action))) {
        return windowSize > 576 ? decorateIcon : decorateMobileIcon
    } else if (peelDictionary.some(action => text.includes(action))) {
        return windowSize > 576 ? peelIcon : peelMobileIcon
    } else if (serveDictionary.some(action => text.includes(action))) {
        return windowSize > 576 ? serveIcon : serveMobileIcon
    } else if (text === '') {
        return successIcon
    }
    return windowSize > 576 ? shakeIcon : shakerMobileIcon
}

export default getIconForPreparation
