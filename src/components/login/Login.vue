<template>
  <div class="login">
    <div class="login_box">

      <!--    头像区-->
      <div class="icon">
        <img src="../../assets/logo.png" alt="">
      </div>
      <!--    login表单区-->
      <el-form class="login_form" label-width="0" :model="form" ref="form" :rules="rules" status-icon>
        <el-form-item label="" prop="username">
          <el-input prefix-icon="el-icon-user" v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="el-icon-lock" v-model.trim="form.password" show-password></el-input>
        </el-form-item>
        <!--      按钮区域-->
        <el-form-item class="form_button">
          <el-button type="primary" @click="submitForm('form')">Login</el-button>
          <el-button type="info" @click="resetForm('form')">Reset</el-button>
          <!--          <el-link type="success">主要链接</el-link>-->
        </el-form-item>
      </el-form>
      <div class="register_btn">
        <el-link type="primary" :underline="false" @click="toRegister">没有账号?</el-link>
      </div>

    </div>

  </div>
</template>

<script>
import Register from "@/components/login/Register.vue";

export default {
  name: "login",
  components: {Register},
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 7, message: '用户名长度应在2-7个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 3, max: 14, message: '密码长度应在6-14个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm(from) {
      this.$refs[from].resetFields()
    },
    submitForm(from) {
      this.$refs[from].validate(async (valid) => {
        if (!valid) return
        console.log('login...')
        const {data} = await this.$http.post('/sysUser/login', {
          username: this.form.username,
          password: this.form.password
        })
        if (data.code !== 200) return this.$message.error(data.message, 2000)
        this.$message.success('登陆成功!', 2000)
        // 保存token
        window.sessionStorage.setItem('token', data.data)
        //跳转首页
        await this.$router.push('/system')

      })
    },
    toRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="less">
.login {
  user-select: none;
  background-color: #2b4b6b;
  background: url('../../assets/static/images/蓝色极光星空湖水雪山风景壁纸_彼岸壁纸.jpg');
  background-size: 100%;
  height: 100%;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: whitesmoke;
    //opacity: 0.9;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .icon {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eee;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;

      .form_button {
        display: flex;
        justify-content: space-between;
      }
    }

    .register_btn {
      color: #00b0e8;
      font-size: 12px;
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }

}

</style>