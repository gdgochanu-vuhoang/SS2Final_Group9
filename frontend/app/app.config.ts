export default defineAppConfig({
  foo: 'bar',
  ui: {
    input: {
      variants: {
        size: {
          md: {
            base: 'text-base w-full',
          },
        },
      },
      defaultVariants: {
        color: 'info',
      },
    },
    button: {
      defaultVariants: {
        color: 'info'
      }
    }
  },
})
