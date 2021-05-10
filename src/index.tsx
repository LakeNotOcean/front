import { Customer } from './common/commonClasses';
import {frontClass} from './frontClass';



const alice = new Customer(
    123, "Alice", "Alice", "27.18.2818", "Nowhere"
);
const bob = new Customer(
    321, "Bob", "Bob", "27.18.2818", "Nowhere"
);

let front=new frontClass()
front.render();
front.updateIdOfCustomers(new Set<number>().add(1234));
front.updateCustomers(new Array<Customer>(alice,bob));


