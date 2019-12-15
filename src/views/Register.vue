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
    <div class="input-field">
      <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          @change="onChangeName"
          :class="{invalid: (($v.name.$dirty && !$v.name.required)) }"
      >
      <label for="name">Имя</label>
      <small class="helper-text invalid"
      v-if="$v.name.$dirty && !$v.name.required"
      >Введите имя</small>
    </div>
    <p>
      <label>
        <input 
        id="agree"
        type="checkbox"
        class="validate"
        v-model="agree"
        />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, minLength, required} from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  methods: {
    onChangeEml() {
      this.$v.email.$touch()
      return
    },
    onChangePwd() {
      this.$v.password.$touch()
      return
    },
    onChangeName() {
      this.$v.name.$touch()
      return
    },
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch
        return
      }
      let formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        agree: this.agree
      }
      console.log(formData)
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  }

}
</script>
