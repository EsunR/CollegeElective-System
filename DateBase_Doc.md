## 用户表
- id
- account
- password
- name
- identity (三种身份'student','teacher','admin')
- 系别 faculity  (管理员系为空)
- 入学时间 enterTime

## 院系表
- id
- 院系名 name


## 课程表
- id
- 课程名 name
- 任课教师id teracherId
- 任课教师姓名 teacherName
- 课程所属院系 faculity
- 学分 credit
- 学期 semester `1-8`
- 课程属性 proptype `1-必修 0-选修`
- 是否结课 status `1-结课 2-尚未结课`


## 课节表
- id
- 对应课程id courseId
- 上课教室id classroomId
- 周几 day  `1,2,3,4,5`
- 时间 time  `1,2,3,4`


## 选课表
- id
- 学生ID studentId
- 选课课程ID courseId
- 成绩 grade


## 教室表
- id
- 教室位置 location (如：403)

