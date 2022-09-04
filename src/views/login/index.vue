<template>
  <div class="login-container">
    <a-typography-title :level="3">登录</a-typography-title>
    <a-form
      :model="formState"
      name="basic"
      class="login-form"
      :wrapper-col="{ span: 24 }"
      hideRequiredMark
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        :colon="false"
        name="userName"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.userName">
          <template #prefix>
            <user-outlined type="user" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        :colon="false"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <lock-outlined type="user" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
    </a-form>

    <div>
      <div>
        <a-typography-paragraph>
          <a-typography-text strong>admin用户:</a-typography-text>
          <a-typography-text type="warning">
            账号: admin 密码: 123456
          </a-typography-text>
        </a-typography-paragraph>

        <a-typography-paragraph>
          <a-typography-text strong>guest用户:</a-typography-text>
          <a-typography-text type="success">
            账号: 随便写 密码: 123456
          </a-typography-text>
        </a-typography-paragraph>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { userInfoStore } from '@/stores/user';
import { PASSWORD } from '@/utils/constSet';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

const userInfo = userInfoStore();

interface FormState {
  userName: string;
  password: string;
}

const formState = reactive<FormState>({
  userName: 'admin',
  password: ''
});

const onFinish = (values: FormState) => {
  const { userName, password } = values;
  if (password !== PASSWORD) {
    message.error('密码有误!');
    return;
  }
  message.success('登录成功');
  userInfo.setUserInfo(userName);
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .login-form {
    width: 350px;
  }
}
</style>
