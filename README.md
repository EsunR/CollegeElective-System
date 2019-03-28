
## NOTICE
> 课题：基于SpringCloud的高校选课系统 Vue+Spring cloud高校选课系统

![](http://ww1.sinaimg.cn/large/a71efaafly1g1i8zilha0j215a0pedkf.jpg)

/src/commom.vue中存放全局变量：
- host：API服务器地址
- login_location：登录页面相对于服务器根目录的地址
- index_location：主页相对于服务器根目录的地址

![](https://img.shields.io/badge/Base-Vue2.2-brightgreen.svg)
![](https://img.shields.io/badge/Build-Vue--Cli3-orange.svg)
![](https://img.shields.io/badge/Design-ElementUI-blue.svg) 
![](https://img.shields.io/badge/Installer-Yarn-red.svg)

# 需求分析
## 用户身份
### 学生
注册登录，成绩管理（查看各科成绩），学分管理，选课

### 老师
登录，学生成绩管理，课程信息管理（有哪些课要上）

### 管理员
管理老师学生账号信息，教室管理（）

### 描述
学生可以选好想要的老师的科目，安排好上课的教室，
可以统计总共的已学习的科目和学分，
查看选课后的课表

## 学生界面
默认进入/student，展示当前已选择的课程。

主界面左侧的列表中有：
- 已选课程(/student/studentCourse)
- 选课(/student/selectCourse)
    - 根据不同院系，显示该学生所在院系的课程
- 查看成绩(/student/grade)
    - 查看当前选课的分数情况
- 学分管理(/student/credit)
    - 查看所得学分


## 教师界面
默认进入/teacher，展示当前要上的课

主界面左侧的列表中有：
- 主页（/teacher/teacherCourse）
    - 显示该老师要上的课
- 添加课程(/teacher/manageCourse)
    - 教师添加课程
    - 点进课程，可以添加这个课程的上课时间
    - 该教师为那个院系的教师，就只能上传当前院系的课程（如计算机院系的老师，只能添加分类为计算机院系的课程）
- 管理学生成绩(/teacher/manageGrade)
    - 查看教师所在院系的学生选课情况，为学生授予成绩

## 管理员界面
默认进入/admin，显示当前的系统基本信息（学生数、教师数、教室数）

主界面左侧的列表中有
- 主页(/schoolInfo)
- 管理学生(/admin/manageStudent)
    - 删除学生
- 管理教师(/admin/manageTeacher)
    - 添加教师
    - 删除教师
- 管理教室(/admin/manageClassroom)
    - 添加教室
    - 查看教室信息（位置）
    - 查看该教室安排的课程
    - 添加院系










