app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    /*html*/
    `
   <div class="product-display">
        
   <div class="product-container">
   <div class="product-image">
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img :src="image" />
     <div class="color-circles-container">
       <div class="color-circle"
            v-for="(variant, index) in variants"
            :key="variant.id"
            :style="{ backgroundColor: variant.color }"
            @mouseover="updateProduct(index)">
       </div>
     </div>
   </div>
      
      <div class="product-info">
        <h1>{{ productName }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>



        <button class="button" v-on:click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>
      </div>
    </div>

    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview" ></review-form>
  </div>
   `,
  data() {
    return {
      product: 'PHONE',
      brand: 'THE',
      selectedVariant: 0,
      details: ['6.7 inches screen', '512Gb', '64mpx camera'],
      variants: [
        {
          id: 2234,
          color: '#90EE90',
          image: './assets/images/green.jpeg',
          quantity: 10
        },
        {
          id: 2235,
          color: 'black',
          image: './assets/images/black.jpeg',
          quantity: 2
        },
        {
          id: 2236,
          color: 'pink',
          image: './assets/images/pink.jpeg',
          quantity: 0
        }
      ],
      reviews: [],
      tabs: ['review-form', 'review-list'],
      activeTab: 'review-form'
    }
    
    
    
  },
  methods: {
    addToCart() {
      const variant = this.variants[this.selectedVariant];
      if (variant.quantity > 0) {
        this.$emit('add-to-cart', variant.id);
        variant.quantity--;
      }
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    productName() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return '999$'
      }
      return 2.99
    }
  }
  
})
