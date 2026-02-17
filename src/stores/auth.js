import api from "@/api/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token'))

    const isLoggedIn = computed(() => !!token.value)

    async function login(email, password) {
        try {
            let res = await api.post('/auth/login', { email, password })
            token.value = res.data.data.token
            user.value = res.data.data.user
            localStorage.setItem('token', token.value)
        } catch (err) {
            // console.log(err.response);
            throw err.response
            
        }
    }

    async function logout() {
        try {
        // 🔥 call backend logout endpoint
        await api.post('/auth/logout')
        } catch (err) {
        // token might be expired – ignore error
        console.warn('Logout failed (token expired or invalid)')
        } finally {
        // ✅ always clear local state
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        }
    }

    return { user, token, isLoggedIn, login, logout }
})
