<template>
  <base-form-field :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :type="type" name="name"
           :placeholder="placeholder">
  </base-form-field>
</template>
<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'

export default {
  props: ['type'],
  mixins: [FormFieldMixin]
}
</script>
