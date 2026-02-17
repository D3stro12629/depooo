<template>
    <div class="modal fade" tabindex="-1" ref="modalRef">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="hide"></button>
            </div>
            <div class="modal-body">
            <slot></slot>
            </div>
            <div class="modal-footer">
            <slot name="footer">
                <button type="button" class="btn btn-secondary" @click="hide">
                Cancel
                </button>
                <button type="button" class="btn btn-primary" @click="confirm">
                Confirm
                </button>
            </slot>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap"; 

// Props and emits
const props = defineProps({
    title: { type: String, default: "Modal" }
});
const emit = defineEmits(["confirm", "show", "hide"]);

// Refs
const modalRef = ref(null);
let bsModal = null;

// Initialize Bootstrap modal
onMounted(() => {
    if (modalRef.value) {
        bsModal = new bootstrap.Modal(modalRef.value, { backdrop: "static" });
    }
});

const show = () => {
    if (bsModal) {
        bsModal.show();
        emit("show");
    }
};

const hide = () => {
    if (bsModal) {
        bsModal.hide();
        emit("hide");
    }
};

// Confirm button
const confirm = () => {
    emit("confirm");
};

defineExpose({
    show,
    hide
});
</script>
