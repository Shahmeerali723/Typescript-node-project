import { human } from "./human.js";
import { section } from "./section.js";

export class teacher extends human {
    teacherId!: number;
    teacherName!: string;
    sections!: section[];
    degrees!: string[];
}