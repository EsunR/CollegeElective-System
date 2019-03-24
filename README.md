## 1. 基本

### 1.0 获取系别
url：/getfaculity GET

返回：
```js
{
    code: 1,
    data: [
        {
            id: '111',
            name: '系别名'
        },
        ... ...
    ]
}
```

### 1.1 用户登录
url: /login

类型：post

发送：
```js
// 普通用户登录
{
    account: "111",
    password: "123",
}
```

返回：
```js
// 登录成功
{
    code: 1,
    data: {
        token: "asdas.asdadwe23.sdasdas"
    }
}

// 登录失败
{
    code: 0,
    msg: "密码错误或帐号不存在"
}
```


### 1.2 用户注册
url: /register

类型：post

发送：
```js
{
    account: "123",
    password: "123",
    name: "张三",
    faculity: '计算机' // 系别
+   enterTime: '1111111111111'
}
```

返回：
```js
// 注册成功
{
    code: "1"
}

// 注册失败
{
    code: "0",
    msg: "注册失败，账号已存在"
}
```

### 1.3 获取用户信息
url：/userInfo 

类型：get

返回：
```js
// 如果有token，则返回
{
    code: 1,
    data:{
        uid: "1",
        account: "123",
        name: "张三",
        identity: "teacher" // 三种身份'student','teacher','admin'
        faculity: '计算机',
+       semester: '1' // 学期
    }
}

// 如果没有token，则返回
{
    coed: 2
}
```


## 2. 管理员界面相关

### 2.1 获取学校基本信息
url：/getSchoolInfo GET

返回：
```
{
    code: 1,
    data: {
        studentNum: 999,
        teacherNum: 999,
        classroomNum: 999
    }
}
```

### 2.2 获取学生信息
url：/getStudent GET

发送：
```
/getStudentData?page=1
```


返回：
```js
{
    code: 1,
    data: {
        total: 1000,
        studentData: [
            {
                id: "1",
                account: "123",
                name: "张三",
                faculity: '计算机'
            }
            ... ... // 返回十条数据
        ]
    }
}
```

### 2.2 获取教师信息
url：/getTeacherData GET

发送：
```
/getTeacherData?page=1
```

返回：
```js
{
    code: 1,
    data: {
        total: 1000,
        teacherData: [
            {
                id: "1",
                account: "123",
                name: "张三"
            }
            ... ... // 返回十条数据
        ]
    }
}
```

### 2.3 删除用户
url：/deleteUser GET

发送：
```
/deleteUser?id=1
```

### 2.4 添加教师
url：/addTeacher POST

发送：
```js
{
    account: "",
    name: "",
    password: "",
    faculity: ""
}
```

### 2.5 获取教室
url：/getClassroom GET

返回：
```js
{
    code: 1,
    data: [
        {
            id: 1, //教室id
            location: "A06-403" // 存为字符串类型
        }
    ]
}
```

### 2.6 添加教室 
url：/addClassroom POST

发送：
```js
{
    location: "A06-403"
}
```

## 3. 教师界面
### 3.1 获取教师排课信息（这些课对应的课程状态为未结课）
url：/getTeacherClass

发送：
```
/getTeacherClass?id=1

id: 教师id
```

返回：
```js
{
    code: 1,
    data: [
        {
            id: '1', // 课节(class)表ID
            courseId: '2',
            classroomId: '2',
            teacherId: '1',
            day: '1',
            time: '2',
            classroom: 'A06-201',
            courseName: '软件工程',
            teacherName: '小红红'
        }
        ... ...
    ]
}
```

### 3.2 添加课程
url：/addCourse POST

发送：
```js
{
    name: "课程名",
    faculityId: "1",
    credit: "5",
    semester: "1",
    proptype: "选修",
    teacherId: "1"
}
```

### 3.3 获取某个老师发布的未结课的课程
url：/getTeacherCourse GET

发送：
```
/getTeacherCourse?id=1

id: 教师id
```

返回:
```js
{
    code: 1,
    data: [
        {
            id: '11',
            name: "课程名",
            credit: "10",
            faculityName: "院系名",
            semester: "1",
            proptype: "1"  //选修是0 必修是1
        }
        ... ...
    ]
}
```

### 3.4 添加课程
url：/addClass

发送：
```js
{
    courseId: "1",
    day: "",
    time: ""
}
```

### 3.5 获取某个老师发布的已结课的课程
url：/getTeacherCourseFinished GET

发送：
```
/getTeacherCourseFinished?id=1

id: 教师id
```

返回:
```js
{
    code: 1,
    data: [
        {
            id: '11',
            name: "课程名",
            credit: "10",
            faculityName: "院系名",
            semester: "1",
            proptype: "1"  //选修是0 必修是1
        }
        ... ...
    ]
}
```


### 3.6 获取某课程信息
url：/getCourseInfo GET

发送：
```
/getCourseInfo?id=1

id:课程id
```

返回：
```js
{
    code: 1,
    data: {
        name: "课程名",
        faculityName: "专业名",
        faculityId: "专业ID",
        credit: "10",
        semester: "1",
        proptype: "1",
        teacherName: "格格巫",
        teacherId: "1",
        status: "0"
    }
}
```

### 3.7 获取选修该课程的学生的信息
url：/getCourseStudentInfo GET

发送：
```
/getCourseStudentInfo?id=1

id: 课程id
```

返回：
```js
{
    code: 1,
    data: [
        {
            id: "1", // 学生id
            name: "李帅帅",
            grade: "98"
        },
        ... ...
    ]
}
```

### 3.8 设置学生成绩
url：/setGrade POST

发送：
```js
{
    courseId: "1", // 课程id
    studentId: "2", // 学生id
    grade: "99" // 成绩
}
```

### 3.9 课程结课
url：/finishedCourse GET

发送：
```
/finishedCourse?id=1

id: 课程id
```

### 3.10 添加院系
url: /addfaculity POST

发送：
```
{
    faculityName: '院系名'
}
```






## 4. 学生系统

### 4.1 获取某个学生的课节（这些课对应的课程状态为未结课）
url：/getStudentClass GET

发送：
```
/getStudentClass?id=1

id: 学生id
```

返回:
```js
{
    code: 1,
    data: [
        {
            id: '1', // 课节(class)表ID
            courseId: '2',
            classroomId: '2',
            teacherId: '1',
            day: '1',
            time: '2',
            classroom: 'A06-201',
            courseName: '软件工程',
            teacherName: '小红红'
        }
        ... ...
    ]
}
```

### 4.2 获取某学生可选的课程列表

批注：这些课程的搜索依据为学生的系别和学期，且课程状态为未结课

url: /getChooseCourseList GET

发送：
```
/getChooseCourseList?faculity=计算机&semester=2

faculity:系别
semester:学期
```

返回:
```js
{
    code: 1,
    data: [
        {
            id: '11',
            name: "课程名",
            credit: "10",
            faculityName: "院系名",
            semester: "1",
            proptype: "1",  //选修是0 必修是1
            teacher: "授课教师"
        },
        ... ...
    ]
}
```

### 4.3 获取某一课程的上课时间
url：/getClassByCourse GET

发送：
```
/getClassByCourse?id=1

id:课程id
```

返回：
```js
{
    code: 1,
    data: [
        {
            id: '1', // 课节(class)表ID
            courseId: '2',
            classroomId: '2',
            teacherId: '1',
            day: '1',
            time: '2',
            classroom: 'A06-201',
            courseName: '软件工程',
            teacherName: '小红红'
        }
        ... ...
    ]
}
```