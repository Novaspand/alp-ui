document.addEventListener('alpine:init', () => {

  // ── Button ──────────────────────────────────────────────────────────
  Alpine.data('button', (opts = {}) => ({
    variant: opts.variant || 'default',
    size: opts.size || 'default',
    rounded: opts.rounded || false,
    extraClass: opts.class || '',

    get buttonAttrs() {
      const radius = this.rounded ? 'rounded-full' : 'rounded-md'
      const base = `inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95 ${radius}`

      const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      }

      const sizes = {
        xs: `h-7 ${radius} px-2 text-xs`,
        sm: `h-8 ${radius} px-3 text-xs`,
        default: `h-9 ${radius} px-4 py-2`,
        lg: `h-10 ${radius} px-6 text-base`,
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
      const base = 'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3'

      const variants = {
        default: 'bg-primary text-primary-foreground shadow-xs',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs focus-visible:ring-destructive/20 dark:bg-destructive/60',
        outline: 'border-border text-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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
        class: 'flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border bg-card py-(--card-spacing) text-card-foreground shadow-sm [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
      }
    },
  }))

  Alpine.data('cardHeader', () => ({
    get cardHeaderAttrs() {
      return {
        class: '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-(--card-spacing)',
      }
    },
  }))

  Alpine.data('cardTitle', () => ({
    get cardTitleAttrs() {
      return {
        class: 'leading-none font-semibold',
      }
    },
  }))

  Alpine.data('cardDescription', () => ({
    get cardDescriptionAttrs() {
      return {
        class: 'text-sm text-muted-foreground',
      }
    },
  }))

  Alpine.data('cardAction', () => ({
    get cardActionAttrs() {
      return {
        class: 'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      }
    },
  }))

  Alpine.data('cardContent', () => ({
    get cardContentAttrs() {
      return {
        class: 'px-(--card-spacing)',
      }
    },
  }))

  Alpine.data('cardFooter', () => ({
    get cardFooterAttrs() {
      return {
        class: 'flex items-center px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
      }
    },
  }))

  // ── Input ───────────────────────────────────────────────────────────
  Alpine.data('input', (opts = {}) => ({
    state: opts.state || 'default',
    extraClass: opts.class || '',

    get inputAttrs() {
      const base = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'

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
      const base = 'flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'

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
      const base = 'text-sm leading-none font-medium select-none group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
      }
    },
  }))

  // ── Field ────────────────────────────────────────────────────────────
  Alpine.data('field', (opts = {}) => ({
    invalid: opts.invalid || false,
    disabled: opts.disabled || false,
    extraClass: opts.class || '',

    get fieldAttrs() {
      const base = 'group/field flex w-full flex-col gap-3'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
        'data-invalid': this.invalid ? true : undefined,
        'data-disabled': this.disabled ? true : undefined,
      }
    },
  }))

  Alpine.data('fieldContent', () => ({
    get fieldContentAttrs() {
      return {
        class: 'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
      }
    },
  }))

  Alpine.data('fieldDescription', (opts = {}) => ({
    extraClass: opts.class || '',

    get fieldDescriptionAttrs() {
      const base = 'text-sm leading-normal font-normal text-muted-foreground'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
      }
    },
  }))

  // ── Field Group ──────────────────────────────────────────────────────
  Alpine.data('fieldGroup', (opts = {}) => ({
    cols: opts.cols || 2,
    extraClass: opts.class || '',

    get fieldGroupAttrs() {
      const grids = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }
      return {
        class: ['grid gap-4', grids[this.cols] || grids[2], this.extraClass].filter(Boolean).join(' '),
      }
    },
  }))

  // ── Input Group ──────────────────────────────────────────────────────
  Alpine.data('inputGroup', (opts = {}) => ({
    disabled: opts.disabled || false,
    extraClass: opts.class || '',

    get inputGroupAttrs() {
      const base = 'group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
        role: 'group',
        'data-disabled': this.disabled ? true : undefined,
      }
    },
  }))

  Alpine.data('inputGroupAddon', (opts = {}) => ({
    align: opts.align || 'inline-start',
    extraClass: opts.class || '',

    get inputGroupAddonAttrs() {
      const base = 'flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>svg:not([class*="size-"])]:size-4'
      const aligns = {
        'inline-start': 'order-first pl-3',
        'inline-end': 'order-last pr-3',
      }

      return {
        class: [base, aligns[this.align] || aligns['inline-start'], this.extraClass].filter(Boolean).join(' '),
        role: 'group',
        'data-align': this.align,
      }
    },
  }))

  Alpine.data('inputGroupInput', (opts = {}) => ({
    extraClass: opts.class || '',

    get inputGroupInputAttrs() {
      const base = 'h-9 w-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-1 text-base shadow-none outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-0 dark:bg-transparent'

      return {
        class: [base, this.extraClass].filter(Boolean).join(' '),
        'data-slot': 'input-group-control',
      }
    },
  }))

  // ── Button Group ─────────────────────────────────────────────────────
  Alpine.data('buttonGroup', (opts = {}) => ({
    orientation: opts.orientation || 'horizontal',
    extraClass: opts.class || '',

    get buttonGroupAttrs() {
      const base = 'flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10'
      const orient = this.orientation === 'vertical'
        ? 'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none'
        : '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none'

      return {
        class: [base, orient, this.extraClass].filter(Boolean).join(' '),
        role: 'group',
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
