<template>
  <div class="flex-column">
    <div class="option-name quick-control"
         @click="selectAll()"
    >
      Select all
    </div>
    <div class="option-name quick-control"
         @click="clearSelection()"
    >
      Clear selection
    </div>
    <div v-for="(option, key) of options" 
         class="option-name"
         :key="key"
         @click="toggleElement(option.value)"
         :class="{'checked': value.indexOf(option.value) !== -1}"
         v-html="option.name"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'options'
  ],
  methods: {
    toggleElement(value) {
      const index = this.value.indexOf(value);
      if (index === -1) {
        this.value.push(value);
      } else {
        this.value.splice(index, 1);
      }
      this.$emit('input', this.value);
      this.$emit(
        'setEnabled',
        (this.value.length > 0 && this.value.length < this.options.length)
      );
    },
    selectAll() {
      this.value = [];
      for (const option of this.options) {
        this.value.push(option.value);
      }
      this.$emit('input', this.value);
      this.$emit('setEnabled', false); // full filter is meaningless, so we don't filter by it
    },
    clearSelection() {
      this.value = [];
      this.$emit('input', this.value);
      this.$emit('setEnabled', false); // empty filter is also meaningless (would return empty results), so we also don't filter
    }
  }
}
</script>

<style lang="scss" scoped>


.quick-control {
  color: #fa6;
  background: linear-gradient(90deg, rgba(#4e2b17, 0) 0%, rgba(#4e2b17, 0.69) 0.25em, rgba(#4e2b17, 0) 100%);
}

.option-name {
  position: relative;
  padding-left: 2em;
  margin-top: 0.25em;
  padding-top: 0.25em;
  width: 100%;
  cursor: pointer;

  &.checked {
    background: linear-gradient(90deg, rgba(#fa6, 0) 0%, rgba(#fa6, 0.69) 0.25em, rgba(#fa6, 0) 100%);
  }

  &.checked::before, &.checked::after {
    position: absolute;
    left: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    
    border-radius: 50%;
    // filter: drop-shadow(0 0 0.5px #22160C) drop-shadow(0 0 0.25px #22160C) drop-shadow(0 0 0.25px #22160C);
  }
  &.checked::before {
    height: 0.8em;
    width: 0.8em;
    background-color: #22160C;
  }
  &.checked::after {
    margin-left: 0.2em;
    height: 0.4em;
    width: 0.4em;
    background-color: #fa6;
  }
}

.flex-column {
  display: flex;
  flex-flow: column;
}
.flex-row {
  display: flex;
  flex-flow: row;
}
.flex-grow {
  flex-grow: 1;
}
.flex-static {
  flex-grow: 0;
  flex-shrink: 0;
}
</style>