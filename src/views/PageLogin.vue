<template>
  <LayoutAuth title="Войти">
  <UiForm>
    <UiFormGroup label="Email">
      <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
    </UiFormGroup>
    <UiFormGroup label="Пароль">
      <UiInput v-model="password" name="password" type="password" placeholder="password" required />
    </UiFormGroup>

    <template #buttons>
      <UiButton variant="primary" type="submit" block>Войти</UiButton>
    </template>

    <template #append> Нет аккаунта? <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink> </template>
  </UiForm>
  </LayoutAuth>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHeadTitle } from '../plugins/headTitle/index.js';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useApi } from '../composables/useApi.js';
import { loginUser } from '../api/authApi.js';

export default {
  name: 'PageLogin',

  components: {
    UiForm,
    UiButton,
    UiInput,
    UiLink,
    UiFormGroup,
    LayoutAuth
  },

  props: {
    from: {
      type: [String, Object],
      default: () => ({ name: 'index' }),
    },
  },

  setup(props) {
    const addTitle = useHeadTitle();
     
    addTitle('Вход | Meetups');

    const authStore = useAuthStore();
    const router = useRouter();

    const { result, request } = useApi(loginUser, {
      showProgress: true,
      successToast: 'Авторизация прошла успешно',
      errorToast: 'Неверные учётные данные...',
    });

    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      await request(email.value, password.value);
      if (result.value.success) {
        authStore.setUser(result.value.data);
        await router.push(props.from);
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
