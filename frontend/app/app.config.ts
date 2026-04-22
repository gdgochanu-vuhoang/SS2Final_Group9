export default defineAppConfig({
  foo: 'bar',
  ui: {
    input: {
      variants: {
        size: {
          md: {
            base: 'text-base w-full bg-gray-100 text-black',
          },
        },
      },
      defaultVariants: {
        color: 'info',
      },
    },
    inputNumber: {
      defaultVariants: {
        color: 'info',
      },
    },
    button: {
      defaultVariants: {
        color: 'info',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'info',
      },
    },
    select: {
      defaultVariants: {
        color: 'info',
      },
    },
  },
})
