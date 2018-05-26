import { Container } from '@exteranto/ioc'
import { Browser } from '@exteranto/support'
import { MyChromeService } from './MyChromeService'
import { MySafariService } from './MySafariService'
import { AbstractService } from './AbstractService'

Container.bind(MyChromeService).to(AbstractService).for(Browser.CHROME)
Container.bind(MySafariService).to(AbstractService).for(Browser.SAFARI)

const myService: AbstractService = Container.resolve(AbstractService)

// if browser is chrome, assert myService instanceof MyChromeService === true
// if browser is safari, assert myService instanceof MySafariService === true
