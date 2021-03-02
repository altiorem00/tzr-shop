<template>
  <base-form-field :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" name="comments"
              :placeholder="placeholder"></textarea>
  </base-form-field>
</template>
<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'

export default {
  mixins: [FormFieldMixin]
}
</script>
