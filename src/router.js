import Vue from 'vue'
import Router from 'vue-router'
// import global from './common.vue'
import noFound from './components/noFound'

// student
import student from './components/student/student.vue'
import studentCourse from './components/student/studentCourse.vue'


// teacher
import teacher from './components/teacher/teacher.vue'
import teacherCourse from './components/teacher/teacherCourse.vue'
import addCourse from './components/teacher/addCourse.vue'
import manageGrade from './components/teacher/manageGrade.vue'


//  admin
import admin from './components/admin/admin.vue'
import schoolInfo from './components/admin/schoolInfo.vue'
import manageStudent from './components/admin/manageStudent.vue'
import manageTeacher from './components/admin/manageTeacher.vue'
import manageClassroom from './components/admin/manageClassroom.vue'






Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    {
      path: '*',
      name: 'noFound',
      component: noFound
    },
    {
      path: '/student',
      redirect: '/student/studentCourse',
      component: student,
      children: [
        {
          path: 'studentCourse',
          component: studentCourse
        }
      ]
    },
    {
      path: '/teacher',
      redirect: '/teacher/teacherCourse',
      component: teacher,
      children: [
        {
          path: 'teacherCourse',
          component: teacherCourse
        },
        {
          path: 'addCourse',
          component: addCourse
        },
        {
          path: 'manageGrade',
          component: manageGrade
        }
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/schoolInfo',
      component: admin,
      children: [
        {
          path: 'schoolInfo',
          component: schoolInfo
        },
        {
          path: 'manageStudent',
          component: manageStudent
        },
        {
          path: 'manageTeacher',
          component: manageTeacher
        },
        {
          path: 'manageClassroom',
          component: manageClassroom
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    console.log("get success");
    next();
  } else {
    console.log("no token!");
    // window.location.href = global.login_location
    next();
  }
})

export default router
