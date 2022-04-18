<template>
  validate ...
</template>

<script setup lang="ts">
import { serviceFactory, Services } from '~/services';
import { UserService } from '~/services/user';
import { ValidateEmailDto } from '~/services/user/dtos/validate-email.dto';

const { $client } = useNuxtApp();
const service = <UserService>serviceFactory($client, Services.User);
const route = useRoute();
const { token, email } = route.query as ValidateEmailDto;

if (token === undefined || email === undefined) {
  navigateTo('login');
}

try {
  await service.validateEmail({
    token,
    email,
  });

  nextTick(() => navigateTo('/'));
} catch (error) {
  navigateTo('login');
}
</script>
