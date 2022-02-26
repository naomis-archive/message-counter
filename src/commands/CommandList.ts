import { Command } from "../interfaces/Command";

import { display } from "./display";
import { help } from "./help";
import { reset } from "./reset";

export const CommandList: Command[] = [display, help, reset];
