import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { section } from "./section.js";
import { student } from "./student.js";
import { teacher } from "./teacher.js";

export class university{
    students: student[]=[];
    teachers: teacher[]=[];
    sections: section[]=[];
    degrees = ['BSCS','MCS','MBA','MSCS'];
  

constructor(){

    this.builSections();
    //console.log(this.sections);
    
    
}

builSections(){
    this.sections.push(
        {sectionId: 1, sectionName: 'Section A'},
        {sectionId: 2, sectionName: 'Section B'},
        {sectionId: 3, sectionName: 'Section C'}
        );
}

async addStudent(studentId= 0) {

    if(studentId === 0) {
        //await this.debugPrint(studentId);
        let studentIdRan = Math.floor(Math.random()*100);
        let studentInput = await inquirer.prompt([
            {
                name:'stdName',
                type: 'string',
                message: 'Input Student Name'
            },
            {
                name:'stdSec',
                type: 'list',
                choices: this.sections.map(v=> v.sectionName),
                message: 'Select Section'
            },
            {
                name:'stdDegree',
                type: 'list',
                choices: this.degrees,
                message: 'Input Enrolled Degree'
            }
            
        ]);
    
        this.students.push(
            {studentId: studentIdRan, 
            studentName: studentInput.stdName, 
            enrolledDgree: studentInput.stdDegree,
            studentSection: studentInput.stdSec});
    } else {

        //let stId = await this.selectStudent();
        
        let studentUpdate = await inquirer.prompt([
            {
                name:'stdName',
                type: 'string',
                message: 'Input Student Name'
            },
            {
                name:'stdSec',
                type: 'list',
                choices: this.sections.map(v=> v.sectionName),
                message: 'Select Section'
            },
            {
                name:'stdDegree',
                type: 'list',
                choices: this.degrees,
                message: 'Select Enrolled Degree'
            }
            
        ]);
        
        let idx = this.students.findIndex(st=> st.studentId === studentId);
        let stndt = this.students[idx];
        //await this.debugPrint(stndt);
        let idToPass = ((studentId as unknown) as string).split('-')[0].trim();
        this.students.splice(idx,1,
            {studentId: ((idToPass as unknown) as number), 
                studentName: studentUpdate.stdName!==null?studentUpdate.stdName : stndt.studentName, 
                enrolledDgree: studentUpdate.stdDegree!==null?studentUpdate.stdDegree : stndt.enrolledDgree,
                studentSection: studentUpdate.stdSec!==null?studentUpdate.stdSec : stndt.studentSection});

    }
    
}

sleep = (ms=1000) => new Promise((r)=>setTimeout(r,ms));

async indexTitle() {
    console.clear();
    console.log();
    figlet('University - O.O.P',(error,data)=>{
        console.log(gradient.pastel(data));
    });
    await this.sleep();
}

async startProg() {
    try {
        
    
   let opt = await inquirer.prompt({
    name:'option',
    type:'list',
    choices: [
        '1.Add Student', '2.Update Student', 
        '3.Add Teacher','4.Update Teacher',
        '5.List of Students', '6.List of Teachers',
        '7.List Students by Course',
        '8.List of Students taught by Teacher' 
    ],
    message: 'Selection option to Continue'
   }) 

if((opt.option as string).includes("1")) {
    await this.addStudent(0);
    await this.getStudents();
    return false;
} else if((opt.option as string).includes("2")) {
    //console.log('update called')
    let id = await this.selectStudent();
    //let d = await this.debugPrint(id);
    await this.addStudent(id as number);
    await this.getStudents();
    return false;
} else if((opt.option as string).includes("3")) {
    
    await this.addTeacher(0);
    await this.getTeachers();
    return false;
} else if((opt.option as string).includes("4")) {
    
    let t = await this.selectTeacher();

    await this.addTeacher(t as number);
    await this.getTeachers();
    return false;
}  else if((opt.option as string).includes("5")) {
    
    await this.getStudents();
    return false;
}  
else if((opt.option as string).includes("6")) {
    
    await this.getTeachers();
    return false;
} else if((opt.option as string).includes("7")) {
    
    await this.getStudentsByCourse();
    return false;
} else if((opt.option as string).includes("8")) {
    
    await this.getStudentsByTeacher();
    return false;
}  
else {
    return true;
}

} catch (error) {
    console.log(`Oops something went wrong! Please try again`);  
    return false;     
}

}


async addTeacher(teacherId = 0) {
    //return new Promise((r)=>{
    if(teacherId === 0) {
        let teacherIdRan = Math.floor(Math.random()*20);
        let teacherInput = await inquirer.prompt([
            {
                name:'tchName',
                type: 'string',
                message: 'Input Teacher Name'
            },
            {
                name:'tchSec',
                type: 'checkbox',
                choices: this.sections.map(v=> v.sectionName),
                message: 'Select Sections'
            },
            {
                name:'tchCourse',
                type: 'checkbox',
                choices: this.degrees,
                message: 'Select Degree'
            },
            
        ]);
    
        this.teachers.push(
            {teacherId: teacherIdRan, 
            teacherName: teacherInput.tchName,
            sections: teacherInput.tchSec,
            degrees: teacherInput.tchCourse});
    } else {
        let teacherUpdate = await inquirer.prompt([
            {
                name:'tchName',
                type: 'string',
                message: 'Input Teacher Name'
            },
            {
                name:'tchSec',
                type: 'checkbox',
                choices: this.sections.map(v=> v.sectionName),
                message: 'Select Sections'
            },
            {
                name:'tchCourse',
                type: 'checkbox',
                choices: this.degrees,
                message: 'Select Degree'
            },
            
        ]);
        
       let idx = this.teachers.findIndex(i=>i.teacherId === teacherId);
       let findTecher = this.teachers[idx];
       let idToPass = ((teacherId as unknown) as string).split('-')[0].trim();

        this.teachers.splice(idx,1,
            {teacherId: ((idToPass as unknown) as number), 
            teacherName: teacherUpdate.tchName !== null ? teacherUpdate.tchName : findTecher.teacherName,
            sections: teacherUpdate.tchSec !== null ? teacherUpdate.tchSec :  findTecher.sections,
            degrees: teacherUpdate.tchCourse !== null ? teacherUpdate.tchCourse :  findTecher.degrees
        });
    }
//     setTimeout(r,0);
// });

}

async getStudents() {
        return new Promise((r) => {
            console.table(this.students);
            setTimeout(r, 0);
        })
    }

    async getTeachers() {
        return new Promise((r) => {
            console.table(this.teachers);
            setTimeout(r, 0);
        });
    }

async debugPrint(msg:any) {
    return new Promise((r)=>{
        setTimeout(r,0);
    })
}

    async selectStudent() {
        let st = await inquirer.prompt({
            name:'stu',
            type:'list',
            choices: this.students.map(s=> `${s.studentId} - ${s.studentName}`),
            message: 'Select Student'
        }        
         
    )
        return new Promise((r)=>{
            //console.log(st.studentId);
            r(st.stu);
            setTimeout(r,0);
            
        });
    }

    async selectTeacher() {
        let teac = await inquirer.prompt({
            name:'tea',
            type:'list',
            choices: this.teachers.map(s=> `${s.teacherId} - ${s.teacherName}`),
            message: 'Select Teacher'
        }        
         
    )
        return new Promise((r)=>{
            //console.log(st.studentId);
            r(teac.tea);
            setTimeout(r,0);
            
        });
    }

    async getStudentsByCourse() {

        let deg = await inquirer.prompt({
            'name': 'degree',
            'type': 'list',
            choices: this.degrees,
            message: 'Select Degree'
        })

        return new Promise((r)=>{
            let x = this.students.filter(s=>s.enrolledDgree === deg.degree);
            if(x!== null && x.length > 0) {
                console.table(x);
            } else {
                console.log(chalk.red(`No Student Found by ${deg.degree}`));
            }
            setTimeout(r,0);
        });

    } 


    async getStudentsByTeacher() {

        let teach = await inquirer.prompt({
            'name': 'tchr',
            'type': 'list',
            choices: this.teachers.map(t=>t.teacherName),
            message: 'Select Teacher'
        })

        return new Promise((r)=>{
            let t = this.teachers.filter(x=>x.teacherName === teach.tchr)[0];

            let x = this.students.filter(s=> t.degrees.includes(s.enrolledDgree));
            if(x!== null && x.length > 0) {
                console.log(`Students for Sir ${t.teacherName}`);
                console.table(x);
            } else {
                console.log(chalk.red(`No Student Found by ${t.teacherName}`));
            }
            setTimeout(r,0);
        });

    } 



}

