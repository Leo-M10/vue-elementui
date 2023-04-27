<template>
  <div class="register">
    <div class="register_box">
      <div class="register_logo">
        <img src="../../assets/logo.png" alt="">
      </div>
      <el-form class="register_form" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="账号" label-width="60px" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px" prop="password">
          <el-input v-model.trim="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="60px" prop="nickname">
          <el-input v-model.trim="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="权限" label-width="60px" prop="isAdmin">
          <el-radio v-model="form.isAdmin" label="0">管理员</el-radio>
          <el-radio v-model="form.isAdmin" label="1">普通用户</el-radio>
        </el-form-item>
<!--        按钮区域-->
        <el-form-item class="register_btn">
          <el-button type="primary" @click="submitForm('form')"><i class="el-icon-s-promotion"></i></el-button>
          <el-button type="info" @click="resetForm('form')"><i class="el-icon-close"></i></el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: '',
        password: '',
        nickname: '',
        isAdmin: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 11, message: '用户名长度应在2-11个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min:6, max: 14, message: '密码长度应在6-14个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '昵称不能为空', trigger: 'blur'},
          {min: 1, max: 10, message: '昵称长度应在1-10个字符', trigger: 'blur'}
        ],
        isAdmin: [
          {required: true, message: '选择用户权限', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    resetForm(from) {
      this.$refs[from].resetFields()
    },
    submitForm(from) {
      this.$refs[from].validate( async (valid) => {
        if (!valid) return
        const {data} = await this.$http.post('/sysUser/register',{
          username: this.form.username,
          password: this.form.password,
          nickName: this.form.nickname,
          isAdmin: this.form.isAdmin
        })
        if (data.code !== 200) return this.$message.error(data.message)
        this.resetForm(from)
        this.$message.success('注册成功!')
        await this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped lang="less">
.register {
  height: 100%;
  background-color: orange;
  background: url('../../assets/static/images/绘画风景 自然 山脉 云 草 花桌面壁纸_彼岸壁纸.jpg');
  background-size: 100%;
  .register_box {
    height: 500px;
    width: 300px;
    background-color: #f5f5f5;
    border: 0 solid whitesmoke;
    border-radius: 5px;
    box-shadow: 0 1px 10px #c5ced5;
    opacity: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    //padding: 10px 5px;

    .register_form {
      position: absolute;
      top: 30%;
      .register_btn {
        position: absolute;
        left: 50%;
        transform: translateX(-40%);
      }
    }
    .register_logo {
      height: 80px;
      width: 80px;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>