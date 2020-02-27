<template>
  <div class="filter-group-root flex-column">
    <div class="filter-group-header-container">
      <div class="filter-group-header"
           :class="{'hprimary': !subcategory, 'hsubcategory': subcategory}"
           @click="toggleCollapsed()"
      >
        <span class="check">[
          <div class="warning-base" :class="{'warning': hasWarning}"></div>
          <div class="expand-button" :class="{'expanded': !collapsed}"></div>
        ]</span>{{categoryName}}
      </div>
    </div>
    <div class="fc-content" v-if="!collapsed">
      <slot></slot>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'FilterCategory',
  props: [
    'categoryName',
    'subcategory',
    'enabledFilters',
    'showWarning'
  ],
  data() {
    return {
      collapsed: true,
    }
  },
  computed: {
    hasWarning: function() {
      if (! this.collapsed || !this.enabledFilters || !this.showWarning) {
        return false;
      }
      for (const key of this.showWarning) {
        if (this.enabledFilters[key]) {
          return true;
        } 
      }
      return false;
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$emit('input', this.collapsed);
    },
  }
}
</script>

<style scoped>

.hprimary {
  font-size: 1.7rem;
  color: #0f0a06;
  font-weight: 800;
}
.hsubcategory {
  color: #662205;
  font-size: 1.42em;
}

.filter-group-root {
  /* background-color: #662205; */
  margin: 0.5em 2em 0em;
  user-select: none;
}
.filter-group-header-container {
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  /* margin-bottom: 1.5rem; */
  cursor: pointer;
}
.filter-group-header {
  /* margin-top: 1.2rem; */
  /* margin-bottom: 0.42rem; */
  width: 350px;
  text-align: left;
  font-family: 'IM FELL DW Pica SC';
}
.filter-group-header::before, .filter-group-header::after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 100vw;
  border-top: 1px solid;
}
.filter-group-header::before {
  transform: translateX(-100vw) translateY(0.7em);
  margin-left: -0.5em;
}
.filter-group-header::after {
  transform: translateY(0.7em);
  margin-left: 0.5em;
}

.check {
  padding-right: 0.42rem;
}

.expand-button, .warning-base {
  box-sizing: border-box;

  display: inline-block;
  position: relative;
  width: 0.5em;
  height: 1em;
}
.expand-button:before {
  box-sizing: border-box;

  content: '';
  position: absolute;
  display: block;
  height: 0.7em;
  width: 0.7em;

  border-bottom: 0.15em solid #fa6;
  border-right: 0.15em solid #fa6;

  filter: drop-shadow(0 0 1px #332202) drop-shadow(0 0 2px #332202) drop-shadow(0 0 1px #332202);
 
  top: 45%;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}
.expanded::before {
  box-sizing: border-box;

  content: '';
  position: absolute;
  display: block;
  height: 0.2em;
  width: 1em;

  border-bottom: 0.2em solid #662205;
  border-right: none !important;
 
  top: 60% !important;
  left: -0.22em;
  transform: none !important;
  filter: none !important;
}

.warning-base {
  width: 0;
  height: 0;
}
.warning::before {
  box-sizing: border-box;

  position: absolute;
  content: '';
  background-color: #662205;
  width: 0.75em;
  height: 0.75em;

  /* margin-left: -0.12em; */

  border: 1px solid #fa6;

  filter: drop-shadow(0 0 1px #332202) drop-shadow(0 0 0.2px #332202) drop-shadow(0 0 0.1px #332202);

  left: 50%;
  transform: translateX(-20%) rotate(45deg);
  top: -1.2em;
}
.warning::after {
  box-sizing: border-box;

  position: absolute;
  content: '!';
  color: #fa6;
  z-index: 1;
  font-size: 0.8em;

  top: -1.6em;
  left: 0.1em;
  /* left: 75%; */
  /* transform: translateX(-25%); */
}

.checkmark {
  color: #fa6;
  text-shadow: 0 0 0.1rem #000, 0 0 0.1rem #000, 0 0 0.1rem #000, 0 0 0.1rem #000, 0 0 0.3rem #000;
}
/* 
.overflow-x-hidden {
  overflow-x: hidden;
} */
.fc-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.42em;
}
</style>