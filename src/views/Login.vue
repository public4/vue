<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          class="validate"
          v-model.trim="email"
          @change="onChangeEml"
          :class="{invalid: (($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email))}"
      >
      <label for="email">Email</label>
      <small class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >Введите email</small>
      <small class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Это же неправильный email и на него приходят неправильные письма</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          @change="onChangePwd"
          :class="{invalid: (($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength))}"
      >
      <label for="password">Пароль</label>
      <small class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Введите пароль</small>
      <small class="helper-text invalid"
      v-else-if="!$v.password.minLength"
      >Пароль должен быть длиннее {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}} </small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Войти
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods:{
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      let formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
    },
    onChangeEml() {
      this.$v.email.$touch()
      return
    },
    onChangePwd() {
      this.$v.password.$touch()
      return
    }
  },
  mounted(){
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  }
}
</script>
