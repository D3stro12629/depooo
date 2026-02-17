<template>
    <div class="sidebar p-3">
        <h5 class="text-white mb-4">Admin Panel</h5>
        <router-link :to="{name:'home'}">Dashboard</router-link>
        <router-link :to="{name:'article'}">Article</router-link>
        <a href="#"><i class="bi bi-people me-2"></i> Users</a>
        <router-link :to="{name:'category'}">Category</router-link>
        <a href="#"><i class="bi bi-gear me-2"></i> Settings</a>
        <hr class="border-secondary" />
        <a href="#" @click="handleLogout"><i class="bi bi-box-arrow-left me-2 text-danger"></i> Logout</a>
      </div>
</template>
<script setup>
  import { useAuthStore } from '@/stores/auth'

  let auth = useAuthStore()

  async function handleLogout(){
      auth.logout();
  }
</script>