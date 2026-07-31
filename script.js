"use strict";

/*
================================================
 Study Focus
 Main JavaScript
 Part 1: Core System + Storage + Language
================================================
*/


// ===============================
// Global State
// ===============================


let subjects = JSON.parse(
    localStorage.getItem("studySubjects")
) || [];


let language =
localStorage.getItem("language") || "en";



let deleteTarget = null;



// ===============================
// DOM Elements
// ===============================


const subjectsContainer =
document.getElementById("subjectsContainer");


const subjectModal =
document.getElementById("subjectModal");


const finishModal =
document.getElementById("finishModal");


const deleteModal =
document.getElementById("deleteModal");


const addSubjectBtn =
document.getElementById("addSubjectBtn");


const cancelBtn =
document.getElementById("cancelBtn");


const createBtn =
document.getElementById("createBtn");


const languageBtn =
document.getElementById("languageBtn");


const subjectNameInput =
document.getElementById("subjectName");


const studyHoursInput =
document.getElementById("studyHours");


const studyMinutesInput =
document.getElementById("studyMinutes");



const template =
document.getElementById("subjectTemplate");




// ===============================
// Language System
// ===============================


const translations = {


en:{


heroTitle:
"Study Focus",

heroSubtitle:
"Stay focused. Finish your study sessions.",

add:
"+ Add Subject",

subjects:
"Subjects",

completed:
"Completed",

active:
"Active",

time:
"Study Time",

addTitle:
"Add Subject",

subjectName:
"Subject Name",

hours:
"Hours",

minutes:
"Minutes",

cancel:
"Cancel",

create:
"Create",

waiting:
"Waiting",

running:
"Studying",

paused:
"Paused",

completedStatus:
"Completed",

start:
"▶ Start",

pause:
"⏸ Pause",

resume:
"▶ Resume",

reset:
"🔄 Reset",

delete:
"🗑 Delete",

todo:
"Todo List",

newTask:
"New Task",

finish:
"Study Session Completed!",

excellent:
"Excellent work!",

close:
"Close",

deleteTitle:
"Delete Subject?",

deleteText:
"This action cannot be undone."

},



ar:{


heroTitle:
"تركيز الدراسة",

heroSubtitle:
"ابقَ مركزاً. أنهِ جلسات دراستك.",

add:
"+ إضافة مادة",

subjects:
"المواد",

completed:
"المكتملة",

active:
"النشطة",

time:
"وقت الدراسة",

addTitle:
"إضافة مادة",

subjectName:
"اسم المادة",

hours:
"الساعات",

minutes:
"الدقائق",

cancel:
"إلغاء",

create:
"إنشاء",

waiting:
"انتظار",

running:
"يدرس الآن",

paused:
"متوقف",

completedStatus:
"مكتمل",

start:
"▶ بدء",

pause:
"⏸ إيقاف",

resume:
"▶ متابعة",

reset:
"🔄 إعادة",

delete:
"🗑 حذف",

todo:
"المهام",

newTask:
"مهمة جديدة",

finish:
"اكتملت جلسة الدراسة!",

excellent:
"عمل ممتاز!",

close:
"إغلاق",

deleteTitle:
"حذف المادة؟",

deleteText:
"لا يمكن التراجع عن هذا الإجراء."

}

};





function applyLanguage(){


const t =
translations[language];


document.documentElement.lang =
language;


document.documentElement.dir =
language === "ar"
? "rtl"
: "ltr";



document.getElementById("heroTitle")
.textContent=t.heroTitle;


document.getElementById("heroSubtitle")
.textContent=t.heroSubtitle;



document.getElementById("addSubjectBtn")
.textContent=t.add;



document.getElementById("statSubjects")
.textContent=t.subjects;


document.getElementById("statCompleted")
.textContent=t.completed;


document.getElementById("statActive")
.textContent=t.active;


document.getElementById("statTime")
.textContent=t.time;



document.getElementById("modalTitle")
.textContent=t.addTitle;


document.getElementById("subjectLabel")
.textContent=t.subjectName;


document.getElementById("hoursLabel")
.textContent=t.hours;


document.getElementById("minutesLabel")
.textContent=t.minutes;


cancelBtn.textContent=t.cancel;


createBtn.textContent=t.create;


languageBtn.textContent =
language==="en"
? "🌐 AR"
: "🌐 EN";


localStorage.setItem(
"language",
language
);



renderSubjects();


}





languageBtn.onclick=()=>{


language =
language==="en"
? "ar"
: "en";


applyLanguage();


};






// ===============================
// Local Storage
// ===============================



function saveData(){


localStorage.setItem(

"studySubjects",

JSON.stringify(subjects)

);


}






// ===============================
// Modal Controls
// ===============================



function openModal(){


subjectModal.classList.remove(
"hidden"
);


subjectNameInput.focus();


}



function closeModal(){


subjectModal.classList.add(
"hidden"
);


subjectNameInput.value="";

studyHoursInput.value=0;

studyMinutesInput.value=30;


}



addSubjectBtn.onclick =
openModal;



cancelBtn.onclick =
closeModal;




// ===============================
// Create Subject
// ===============================



createBtn.onclick = ()=>{


let name =
subjectNameInput.value.trim();


let hours =
Number(studyHoursInput.value);


let minutes =
Number(studyMinutesInput.value);



if(!name){

alert(
language==="en"
?
"Subject name is required"
:
"اسم المادة مطلوب"
);

return;

}



let totalSeconds =
(hours*3600)
+
(minutes*60);



if(totalSeconds<=0){


alert(
language==="en"
?
"Duration cannot be zero"
:
"المدة لا يمكن أن تكون صفر"
);


return;


}



const subject = {


id:
Date.now(),


name,


duration:
totalSeconds,


remaining:
totalSeconds,


status:
"waiting",


tasks:[],


created:
Date.now()

};



subjects.push(subject);


saveData();


renderSubjects();


closeModal();



};





// ===============================
// Initial Load
// ===============================


applyLanguage();

renderSubjects();