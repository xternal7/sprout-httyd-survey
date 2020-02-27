<template>
  <div class="filter-group-root flex-column overflow-hidden">
    <div class="filter-group-header-container">
      <div class="filter-group-header"
      >
        <span class="check">[<b class="checkmark" :class="{'invisible': !value}">x</b>]</span>{{groupName}}
      </div>
    </div>
    <div class="flex-center">
      <slot></slot>
    </div>
  </div>  
</template>

<script>
export default {
  props: [
    'groupName',
    'value'
  ],
  methods: {
    toggleValue() {
      this.value = !this.value;
      this.$emit('input', this.value);
    }
  }
}
</script>

<style scoped>
.filter-group-root {
  /* background-color: #662205; */
  margin: 0.5rem 2rem;
  user-select: none;
}
.filter-group-header-container {
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  margin-bottom: 0.69rem;
}
.filter-group-header {
  /* margin-top: 5rem; */
  text-align: center;
  font-family: 'IM FELL DW Pica SC';
  font-size: 1.2rem;
  color: #88401B;
}
.filter-group-header::before, .filter-group-header::after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 100vw;
  border-top: 1px solid;
}
.filter-group-header::before {
  transform: translateX(-100vw) translateY(0.5em);
  margin-left: -0.5em;
}
.filter-group-header::after {
  transform: translateY(0.5em);
  margin-left: 0.5em;
}

.check {
  padding-right: 0.42rem;
}

.checkmark {
  color: #fa6;
  text-shadow: 0 0 0.1rem #000, 0 0 0.1rem #000, 0 0 0.1rem #000, 0 0 0.1rem #000, 0 0 0.3rem #000;
}

.overflow-hidden {
  overflow: hidden;
}
.invisible {
  opacity: 0 !important;
}

</style>