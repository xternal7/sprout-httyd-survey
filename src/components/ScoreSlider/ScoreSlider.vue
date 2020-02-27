<template>
  <div class="flex flex-row slider-root"
  >
    <div class="flex-static slider-decrease"
         @click="decrement()"
    >
    </div>
    <div ref="track" class="flex-grow slider-track">
      <div ref="button" 
           class="slider-button"
           :style="{'left': `${currentScrollPositionX}px`}"
           @mousedown="startSliderMove()"
      >
        <div class="slider-button-outline">

        </div>
      </div>
    </div>
    <div class="flex-static slider-increase"
         @click="increment()"
    >
    </div>
    <div class="flex-static slider-current-value">
      {{value || '&lt;tno value&gt;'}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentScrollPositionX: 0,
    }
  },
  props: [
    'value',
    'min',
    'max',
  ],
  computed: {
    steps: function() {
      return this.max - this.min;
    }
  },
  mounted() {
    this.setTickFromValue();
  },
  updated() {
    this.setTickFromValue();
  },
  methods: {
    decrement() {
      this.value = Math.max(this.value - 1, this.min);
      this.$emit('input', this.value);
      this.setTickFromValue();
    },
    increment() { 
      this.value = Math.min(this.value + 1, this.max);
      this.$emit('input', this.value);
      this.setTickFromValue();
    },
    startSliderMove() {
      window.addEventListener('mouseup', this.endSliderMove);
      window.addEventListener('mousemove', this.handleMouseMove);
      this.startScrollPositionX = null;
    },
    endSliderMove() {
      window.removeEventListener('mouseup', this.endSliderMove);
      window.removeEventListener('mousemove', this.handleMouseMove);
    },
    handleMouseMove(event) {
      const sliderBounds = this.getSliderBounds();
      const tickSize = sliderBounds.width / this.steps;
      const rawOffset = Math.max(2, Math.min(sliderBounds.width - 2, event.clientX - sliderBounds.min) );
      const tick = Math.round( (rawOffset / tickSize) - 0.25);
      this.currentScrollPositionX = tick * tickSize;
      this.value = tick + this.min;
      this.$emit('input', this.value);
    },
    setTickFromValue() {
      const sliderBounds = this.getSliderBounds();
      const tickSize = sliderBounds.width / this.steps;
      this.currentScrollPositionX = (this.value - this.min) * tickSize;
    },
    getSliderBounds() {
      const brekt = this.$refs.track.getBoundingClientRect();
      const buttonSize = this.$refs.button.getBoundingClientRect();

      return {
        min: brekt.left,
        width: brekt.right - brekt.left - ((buttonSize.right - buttonSize.left))
      }
    }
  }
}
</script>
<style scoped>
.slider-decrease, .slider-increase {
  height: 1.25rem;
  width: 1.5rem;
  background-image: url('./img/inc-dec-button.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding-left: 0.5rem 0.2rem;
  cursor: pointer;
}
.slider-increase {
  transform: scaleX(-1);
}
.slider-button, .slider-button-outline {
  height: 1.25rem;
  width: 1.5rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  position: absolute;
}
.slider-button-outline {
  background-image: url('./img/button.png');
}
.slider-button {
  background-image: url('./img/button-background.png');
}

.slider-track {
  height: 1.25rem;
  background-image: url('./img/track.png');
  background-size: auto 5px;
  background-repeat: repeat-x;
  background-position: center;
  position: relative;
}

.slider-decrease:hover, .slider-increase:hover {
  background-color: #fa6;
}

.slider-current-value {
  width: 2rem;
}

.flex-row {
  display: flex;
  flex-flow: row;
}
.flex-static {
  flex-grow: 0;
  flex-shrink: 0; 
}
.flex-grow {
  flex-grow: 1;
}

</style>