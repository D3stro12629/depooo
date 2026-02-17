<template>
  <!-- {{ rows }} -->
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <!-- {{ columns }} -->
      <tr>
        <td v-for="col in columns">{{ col.label }}</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      <!-- {{ rows }} -->
      <tr v-for="row in rows" :key="row.id">
        <td v-for="col in columns" :key="col.key">
          <slot :name="`col-${col.key}`" :row="row" :value="row[col.key]">
            {{ row[col.key] }}
          </slot>

        </td>
        <td class="text-center">
            <button class="btn btn-sm btn-primary me-2" @click="$emit('edit', row)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="$emit('delete', row.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
  defineEmits(['delete', 'edit'])
  defineProps(
    {
      columns: Array,default:[],
      rows: Array,default:[]
    },
  )
</script>