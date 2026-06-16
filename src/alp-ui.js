document.addEventListener('alpine:init', () => {

  // ── Button ──────────────────────────────────────────────────────────
  Alpine.data('button', (opts = {}) => ({
    variant: opts.variant || 'default',
    size: opts.size || 'default',
    extraClass: opts.class || '',

    get buttonAttrs() {
      const base = 'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95'

      const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      }

      const sizes = {
        xs: 'h-7 rounded-md px-2 text-xs',
        sm: 'h-8 rounded-md px-3 text-xs',
        default: 'h-9 px-4 py-2',
        lg: 'h-10 rounded-md px-6 text-base',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      }

      return {
        class: [base, variants[this.variant] || variants.default, sizes[this.size] || sizes.default, this.extraClass].filter(Boolean).join(' '),
        type: opts.type || 'button',
      }
    },
  }))

  // ── Badge ───────────────────────────────────────────────────────────
  Alpine.data('badge', (opts = {}) => ({
    variant: opts.variant || 'default',
    extraClass: opts.class || '',

    get badgeAttrs() {
      const base = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold'

      const variants = {
        default: 'border-border bg-primary text-primary-foreground shadow-xs',
        secondary: 'border-border bg-secondary text-secondary-foreground',
        destructive: 'border-border bg-destructive text-destructive-foreground shadow-xs',
        outline: 'border-input text-foreground',
      }

      return {
        class: [base, variants[this.variant] || variants.default, this.extraClass].filter(Boolean).join(' '),
      }
    },
  }))

  // ── Card ────────────────────────────────────────────────────────────
  Alpine.data('card', () => ({
    get cardAttrs() {
      return {
        class: 'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
      }
    },
  }))

  Alpine.data('cardHeader', () => ({
    get cardHeaderAttrs() {
      return {
        class: 'flex flex-col space-y-1.5 p-6',
      }
    },
  }))

  Alpine.data('cardContent', () => ({
    get cardContentAttrs() {
      return {
        class: 'p-6 pt-0',
      }
    },
  }))

  Alpine.data('cardFooter', () => ({
    get cardFooterAttrs() {
      return {
        class: 'flex items-center p-6 pt-0',
      }
    },
  }))

  // ── Input ───────────────────────────────────────────────────────────
  Alpine.data('input', (opts = {}) => ({
    state: opts.state || 'default',
    extraClass: opts.class || '',

    get inputAttrs() {
      const base = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
        disabled: this.state === 'disabled' ? true : undefined,
      }
    },
  }))

  // ── Textarea ────────────────────────────────────────────────────────
  Alpine.data('textarea', (opts = {}) => ({
    state: opts.state || 'default',
    extraClass: opts.class || '',

    get textareaAttrs() {
      const base = 'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
        disabled: this.state === 'disabled' ? true : undefined,
      }
    },
  }))

  // ── Label ───────────────────────────────────────────────────────────
  Alpine.data('label', (opts = {}) => ({
    extraClass: opts.class || '',

    get labelAttrs() {
      const base = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
      }
    },
  }))

  // ── Separator ───────────────────────────────────────────────────────
  Alpine.data('separator', (opts = {}) => ({
    orientation: opts.orientation || 'horizontal',
    extraClass: opts.class || '',

    get separatorAttrs() {
      const base = 'bg-border shrink-0'
      const orient = this.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full'

      return {
        class: [base, orient, this.extraClass].filter(Boolean).join(' '),
        role: 'separator',
      }
    },
  }))

  // ── Avatar ──────────────────────────────────────────────────────────
  Alpine.data('avatar', (opts = {}) => ({
    src: opts.src || '',
    alt: opts.alt || '',
    fallback: opts.fallback || '',
    size: opts.size || 'default',
    loaded: false,
    extraClass: opts.class || '',

    init() {
      if (this.src) {
        const img = new Image()
        img.onload = () => { this.loaded = true }
        img.onerror = () => { this.loaded = false }
        img.src = this.src
      }
    },

    get avatarAttrs() {
      const sizes = {
        sm: 'size-8 text-xs',
        default: 'size-10 text-sm',
        lg: 'size-12 text-base',
      }

      return {
        class: ['relative flex shrink-0 overflow-hidden rounded-full', sizes[this.size] || sizes.default, this.extraClass].filter(Boolean).join(' '),
      }
    },

    get showImage() {
      return this.src && this.loaded
    },

    get showFallback() {
      return !this.showImage
    },
  }))

  // ── Skeleton ────────────────────────────────────────────────────────
  Alpine.data('skeleton', (opts = {}) => ({
    shape: opts.shape || 'text',
    width: opts.width || '',
    height: opts.height || '',
    extraClass: opts.class || '',

    get skeletonAttrs() {
      const shapes = {
        text: 'h-3 w-3/4 rounded-md',
        circle: 'size-10 rounded-full',
        block: 'h-24 w-full rounded-lg',
      }

      return {
        class: ['bg-muted animate-pulse', shapes[this.shape] || shapes.text, this.width, this.height, this.extraClass].filter(Boolean).join(' '),
      }
    },
  }))

})
