<template>
    <nav aria-label="Page navigation" v-if="totalPages > 1">
        <ul class="pagination">

        <!-- Previous -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="backPage">Previous</button>
        </li>

        <!-- Page numbers -->
        <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }">
            <button class="page-link" @click="goToPage(page)">
                {{ page }}
            </button>
        </li>

        <!-- Next -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
        </li>

        </ul>
    </nav>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:page']);

const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    },
    current: {
        type: Number,
        default: 1
    }
});

const currentPage = ref(props.current);

watch(() => props.current,(val) => (currentPage.value = val));

const goToPage = (page) => {
    if (page !== currentPage.value) {
        emit('update:page', page);
    }
};

const nextPage = () => {
    if (currentPage.value < props.totalPages) {
        emit('update:page', currentPage.value + 1);
    }
};

const backPage = () => {
    if (currentPage.value > 1) {
        emit('update:page', currentPage.value - 1);
    }
    };
</script>
