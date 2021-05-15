import {frontClass} from './frontClass';
import { FrontHandler } from './handlers/frontHandler';







let handler=new FrontHandler();
let front=new frontClass(handler);
handler.setFront(front);

front.render();

