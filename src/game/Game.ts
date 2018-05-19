import {Menu} from "./modules/Menu";
import {Cards} from "./modules/cards/Cards";
import {Fire} from "./modules/fire/Fire";
import {Text} from "./modules/text/Text";

export class Game {
    private menu:Menu = new Menu();
    private cars:Cards = new Cards();
    private text:Text = new Text();
    private fire:Fire = new Fire();

}