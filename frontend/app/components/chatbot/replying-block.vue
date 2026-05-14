<template>
  <div class="w-full grid grid-cols-4">
    <div class="col-span-1" />
    <div
      class="w-max max-w-full h-max col-span-3 px-2 rounded-lg relative bg-purple-600 text-white ml-auto flex gap-2"
    >
      <div
        class="absolute top-2 size-4 rotate-45 rounded-sm z-1 bg-purple-600 -right-2"
      />
      <p
        v-for="n in 3"
        :key="n"
        class="text-3xl animate-dot"
      >
        •
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-dot {
  display: inline-block;
  animation: dotMove 1.4s infinite ease-in-out both;
}

.animate-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.animate-dot:nth-child(3) {
  animation-delay: 0.4s;
}

.animate-dot:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes dotMove {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1.2) translateY(-2px);
    opacity: 1;
  }
}
</style>
