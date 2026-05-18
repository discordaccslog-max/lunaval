/* ============================================
   HORIZON THEME JS - REPLICATED
   ============================================ */

// ---- Cart State ----
const cart = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  add(product) {
    const existing = this.items.find(i => i.id === product.id && i.variant === product.variant);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      this.items.push({ ...product, quantity: product.quantity || 1 });
    }
    this.save();
    this.updateCount();
    renderCartItems();
  },

  remove(id, variant) {
    this.items = this.items.filter(i => !(i.id === id && i.variant === variant));
    this.save();
    this.updateCount();
    renderCartItems();
  },

  total() {
    return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  updateCount() {
    const countEl = document.querySelector('.cart-count');
    if (!countEl) return;
    const count = this.count();
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }
};

// ---- Sticky Header ----
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });
}

// ---- Search Overlay ----
function initSearch() {
  const btn = document.querySelector('[data-search-toggle]');
  const overlay = document.querySelector('.search-overlay');
  const input = overlay?.querySelector('input');

  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => input?.focus(), 100);
    document.body.style.overflow = 'hidden';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  const form = overlay.querySelector('form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) {
      window.location.href = `pages/search.html?q=${encodeURIComponent(q)}`;
    }
  });
}

// ---- Mobile Nav ----
function initMobileNav() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const close = document.querySelector('.mobile-nav-close');

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeNav = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  close?.addEventListener('click', closeNav);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeNav();
  });
}

// ---- Cart Drawer ----
function initCartDrawer() {
  const cartBtns = document.querySelectorAll('[data-cart-toggle]');
  const overlay = document.querySelector('.cart-overlay');
  const closeBtn = document.querySelector('.cart-drawer-close');

  if (!overlay) return;

  cartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeCart = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeCart);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCart();
  });
}

// ---- Render Cart Items ----
function renderCartItems() {
  const body = document.querySelector('.cart-drawer-body');
  const footer = document.querySelector('.cart-drawer-footer');
  if (!body) return;

  if (cart.items.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.392 6.875h13.216v8.016c0 .567-.224 1.112-.624 1.513-.4.402-.941.627-1.506.627H5.522a2.13 2.13 0 0 1-1.506-.627 2.15 2.15 0 0 1-.624-1.513zM8.818 2.969h2.333c.618 0 1.211.247 1.649.686a2.35 2.35 0 0 1 .683 1.658v1.562H6.486V5.313c0-.622.246-1.218.683-1.658a2.33 2.33 0 0 1 1.65-.686"/>
        </svg>
        <p>Your cart is empty</p>
        <a href="pages/collection.html" class="btn btn-secondary" style="font-size:0.875rem;padding:10px 20px">Shop all</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  body.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '<div style="width:100%;height:100%;background:#f5f5f5;"></div>'}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}${item.variant ? ` — ${item.variant}` : ''}</div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
          <div class="quantity-selector" style="height:32px;">
            <button class="quantity-btn" onclick="changeQty('${item.id}','${item.variant}',-1)" style="width:32px;height:32px;">−</button>
            <input class="quantity-input" value="${item.quantity}" style="width:36px;height:32px;font-size:0.8125rem;" readonly>
            <button class="quantity-btn" onclick="changeQty('${item.id}','${item.variant}',1)" style="width:32px;height:32px;">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}','${item.variant}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const totalEl = document.querySelector('.cart-total-amount');
  if (totalEl) totalEl.textContent = `$${cart.total().toFixed(2)}`;
}

window.removeFromCart = function(id, variant) {
  cart.remove(id, variant);
  showToast('Item removed from cart');
};

window.changeQty = function(id, variant, delta) {
  const item = cart.items.find(i => i.id === id && i.variant === variant);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  if (item.quantity === 0) {
    cart.remove(id, variant);
  } else {
    cart.save();
    renderCartItems();
  }
};

// ---- Add to Cart (product page) ----
function initAddToCart() {
  const form = document.querySelector('[data-product-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.dataset.productTitle || 'Product';
    const price = parseFloat(form.dataset.productPrice || '0');
    const id = form.dataset.productId || 'product-1';
    const image = form.dataset.productImage || '';
    const variant = form.querySelector('[data-variant-selected]')?.value || '';

    cart.add({ id, title, price, image, variant });
    showToast(`${title} added to cart`);

    // Open cart
    document.querySelector('.cart-overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

// ---- Variant Picker ----
function initVariantPicker() {
  const btns = document.querySelectorAll('.variant-btn');
  const hiddenInput = document.querySelector('[data-variant-selected]');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-variant-group]');
      group?.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (hiddenInput) hiddenInput.value = btn.dataset.value;
    });
  });
}

// ---- Gallery ----
function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.querySelector('.product-gallery-main img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) mainImg.src = thumb.querySelector('img')?.src || mainImg.src;
    });
  });
}

// ---- Toast ----
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- Filter pills (collection page) ----
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

// ---- Contact form ----
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you soon.');
    form.reset();
  });
}

// ---- Newsletter form ----
function initNewsletter() {
  const form = document.querySelector('[data-newsletter-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thanks for subscribing!');
    form.reset();
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initSearch();
  initMobileNav();
  initCartDrawer();
  initAddToCart();
  initVariantPicker();
  initGallery();
  initFilters();
  initContactForm();
  initNewsletter();
  renderCartItems();
  cart.updateCount();

  // Page transition
  document.querySelector('main')?.classList.add('page-transition');
});
