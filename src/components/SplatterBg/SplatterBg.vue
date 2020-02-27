<template>
  <div class="splatter1">
    <div class="splatter2">
      <div class="raise">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
/* .splatter1 {
  position: relative;
  z-index: 100;
} */
.splatter1, .splatter2 {
  display: inline-block;
}

/* .splatter1::after, .splatter1::before, .splatter2::after, .splatter2::before {
  position: absolute;
  content: '';
  display: block;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-size: auto 100%;
  background-repeat: repeat-x;
}

.splatter1::before {
  background-image: url('./splat-nw.png');
  top: -0.25em; left: -1.82em;
}
.splatter1::after {
  background-image: url('./splat-ne.png');
  background-position-x: right;
  top: -0.25em; left: 1em;
}
.splatter2::before {
  background-image: url('./splat-sw.png');
  top: 0.25em; left: -0.75em;
}
.splatter2::after {
  background-image: url('./splat-se.png');
  top: 0.25em; left: 2em;
  background-position-x: right;
}
.raise {
  z-index: 1000;
} */
</style>