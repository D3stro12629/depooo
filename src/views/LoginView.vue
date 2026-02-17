<template>
    <div>
        <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-5">
                                <h2 class="fw-bold mb-4 text-center">Login</h2>

                                <form @submit.prevent="handleLogin">
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email address</label>
                                        <input v-model="email" type="text" class="form-control" id="emailInput"
                                            placeholder="name@example.com" >
                                            <div class="text-danger small">{{ err.email }}</div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Password</label>
                                        <input v-model="password" type="password" class="form-control"
                                            id="passwordInput" placeholder="Password" >
                                            <p class="text-danger small">{{ err.password }}</p>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                    </div>

                                    <div class="d-grid">
                                        <button :disabled="isLoading" type="submit" class="btn btn-primary btn-lg">

                                            <div v-if="isLoading" class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>

                                            <div v-else>
                                                Sign In
                                            </div>

                                        </button>
                                    </div>

                                    <p class="text-center mt-4 mb-0">Don't have an account? <a href="#"
                                            class="text-decoration-none">Sign Up</a></p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { isEmail, required,validate } from '@/components/utils/validate';
// import bar from 1 file inport with knea  mk 
import { toast } from 'vue3-toastify';
import { notify } from '@/components/utils/toast';

let email = ref('');
let password = ref('');
let auth = useAuthStore();

let err = reactive({
    email : '',
    password : ''
})

let isLoading = ref(false);

function validator(){
    err.email = validate(email.value, [
        (v) => required(v, 'This field is required'),
        (v) => isEmail(v, 'Email is wrong format')
    ]);
    err.password = required(password.value, 'Password is required');
    console.log(err.email);
    console.log(err.password); // ah 2 nis bar ot pjol ey te vea show Email is required & Password is required in console log

    return !err.email && !err.password;
}

async function handleLogin() {
    if (!validator()) return;
    isLoading.value = true;
    try {
        // isLoading.value = true;
        await auth.login(email.value, password.value);
        notify.success('Login successful!', '/', '1000');
    } catch (err) {
        notify.error(err.data.message);
        isLoading.value = false; // for disable button when login
    } finally {
        // isLoading.value = false;
    }


}
</script>