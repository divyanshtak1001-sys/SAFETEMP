// ============================================================================
// CYBERSECURITY DETECTION SYSTEM - INTERACTIVE JAVASCRIPT
// Professional Website for Google Competition
// ============================================================================

// Import AI Analysis Engine
let AIAnalysisEngine, ThreatClassifier;
if (typeof require !== 'undefined') {
  const { AIAnalysisEngine: Engine, ThreatClassifier: Classifier } = require('./ai-analysis.js');
  AIAnalysisEngine = Engine;
  ThreatClassifier = Classifier;
} else {
  // Browser environment - scripts loaded via HTML
  AIAnalysisEngine = window.AIAnalysisEngine;
  ThreatClassifier = window.ThreatClassifier;
}

// Global Configuration
const CONFIG = {
  apiDelay: 300,
  scanDuration: 3000,
  alertThreshold: 0.7,
  animationDuration: 600,
  aiEnabled: true // Enable AI-powered analysis
};

// State Management
let appState = {
  isScanning: false,
  alertLevel: 'safe',
  detectionHistory: [],
  networkStats: {
    packets: 0,
    threats: 0,
    blocked: 0
  }
};

// ============================================================================
// SMOOTH SCROLLING AND NAVIGATION
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('[v0] Navigating to:', this.getAttribute('href'));
    }
  });
});

// ============================================================================
// HEADER INTERACTIONS
// ============================================================================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Mobile Menu Toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
    console.log('[v0] Mobile menu toggled');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
  });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
  if (header && window.scrollY > 50) {
    header.classList.add('scrolled');
  } else if (header) {
    header.classList.remove('scrolled');
  }
});

// ============================================================================
// LIVE DETECTION SYSTEM - INTERACTIVE CONSOLE
// ============================================================================

// Detection System removed

// ============================================================================
// FEATURES INTERACTIVE CARDS
// ============================================================================

class FeatureCards {
  constructor() {
    this.cards = document.querySelectorAll('.feature-card');
    this.init();
  }

  init() {
    this.cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(104, 182, 255, 0.4)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(104, 182, 255, 0.2)';
      });

      // Stagger animation
      card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
    });
  }
}

// ============================================================================
// REAL-TIME THREAT SIMULATION CHART
// ============================================================================

class ThreatChart {
  constructor() {
    this.chartContainer = document.querySelector('.threat-chart');
    this.init();
  }

  init() {
    if (!this.chartContainer) return;

    // Create simple bar chart
    this.updateChart();
    setInterval(() => this.updateChart(), 5000);
  }

  updateChart() {
    const threatTypes = ['Phishing', 'Malware', 'DDoS', 'SQLi', 'XSS'];
    const chartHTML = threatTypes.map(type => {
      const value = Math.floor(Math.random() * 100);
      const percentage = (value / 100) * 100;

      return `
        <div class="chart-bar">
          <div class="bar-label">${type}</div>
          <div class="bar-container">
            <div class="bar-value" style="width: ${percentage}%; background: linear-gradient(90deg, #68b6ff, #4ade80);"></div>
          </div>
          <div class="bar-count">${value}%</div>
        </div>
      `;
    }).join('');

    this.chartContainer.innerHTML = chartHTML;
  }
}

// ============================================================================
// FORM HANDLING - CONTACT SECTION
// ============================================================================

class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Add focus animations to inputs
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Validate
    if (!this.validateForm(data)) {
      this.showMessage('Please fill all fields correctly', 'error');
      return;
    }

    // Simulate sending
    const submitBtn = this.form.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      this.showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
      this.form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      console.log('[v0] Form submitted:', data);
    }, 1500);
  }

  validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return data.name && data.email && emailRegex.test(data.email) && data.message;
  }

  showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `form-message message-${type}`;
    message.textContent = text;
    this.form.appendChild(message);

    setTimeout(() => message.remove(), 4000);
  }
}

// ============================================================================
// STATISTICS COUNTER ANIMATION
// ============================================================================

class StatisticsCounter {
  constructor() {
    this.stats = document.querySelectorAll('[data-stat]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          this.animateCounter(entry.target);
          entry.target.dataset.animated = true;
        }
      });
    }, { threshold: 0.5 });

    this.stats.forEach(stat => observer.observe(stat));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.stat) || 0;
    let current = 0;
    const increment = target / 60;
    const suffix = element.dataset.suffix || '';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 30);
  }
}

// ============================================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================================

class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.elements.forEach(el => observer.observe(el));
  }
}

// ============================================================================
// MODAL DIALOG HANDLER
// ============================================================================

class ModalHandler {
  constructor() {
    this.modals = document.querySelectorAll('.modal');
    this.init();
  }

  init() {
    // Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) this.closeModal(modal);
      });
    });

    // Click outside to close
    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Open modals
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.target.dataset.openModal;
        const modal = document.getElementById(modalId);
        if (modal) this.openModal(modal);
      });
    });
  }

  openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// ============================================================================
// DARK MODE TOGGLE
// ============================================================================

class ThemeToggle {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    if (!this.themeToggle) return;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);

    this.themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (this.themeToggle) {
      this.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

// ============================================================================
// PARALLAX SCROLL EFFECT
// ============================================================================

class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', () => {
      this.elements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = window.scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

class KeyboardShortcuts {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K - Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('[v0] Search shortcut triggered');
      }

      // Escape - Close modals
      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
          new ModalHandler().closeModal(modal);
        }
      }

      // Ctrl/Cmd + L - Quick scan
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const scanBtn = document.querySelector('.scan-btn');
        if (scanBtn && !scanBtn.disabled) {
          scanBtn.click();
          console.log('[v0] Quick scan triggered');
        }
      }
    });
  }
}

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

class NotificationSystem {
  static show(message, type = 'info', duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;

    const container = document.querySelector('.notification-container') || this.createContainer();
    container.appendChild(notification);

    setTimeout(() => notification.remove(), duration);
  }

  static createContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
  }

  static success(msg) { this.show(msg, 'success'); }
  static error(msg) { this.show(msg, 'error'); }
  static warning(msg) { this.show(msg, 'warning'); }
  static info(msg) { this.show(msg, 'info'); }
}

// ============================================================================
// INITIALIZATION ON DOM LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('[v0] Initializing Cybersecurity Detection System...');

  // Initialize all systems
  // DetectionSystem removed
  new FeatureCards();
  new ThreatChart();
  new FormHandler();
  new StatisticsCounter();
  new ScrollReveal();
  new ModalHandler();
  new ThemeToggle();
  new ParallaxEffect();
  new KeyboardShortcuts();

  console.log('[v0] All systems initialized successfully');
  NotificationSystem.success('System online - All modules active');
});

// ============================================================================
// ADVANCED CYBER BACKGROUND ANIMATIONS
// ============================================================================

// Initialize cyber background elements
function initCyberBackground() {
  // Create matrix rain columns
  const matrixRain = document.querySelector('.matrix-rain');
  if (matrixRain) {
    for (let i = 0; i < 20; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = (i * 5) + '%';
      column.style.animationDelay = Math.random() * 3 + 's';
      matrixRain.appendChild(column);
    }
  }

  // Create floating shapes
  const shapes = document.querySelector('.cyber-shapes');
  if (shapes) {
    // Shapes are already defined in CSS
  }

  // Create energy waves
  const waves = document.querySelector('.energy-wave');
  if (waves) {
    // Waves are already defined in CSS
  }
}

// ============================================================================
// WINDOW LOAD - POST INITIALIZATION
// ============================================================================

window.addEventListener('load', () => {
  console.log('[v0] Page fully loaded');

  // Initialize cyber background
  initCyberBackground();

  // Remove page loader immediately (no blocking)
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader && pageLoader.parentNode) {
    pageLoader.remove();
  }

  // Remove loading state if exists (fallback)
  const loader = document.querySelector('.page-loader');
  if (loader && loader.parentNode) {
    loader.remove();
  }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

window.addEventListener('error', (event) => {
  console.error('[v0] Runtime error:', event.error);
  NotificationSystem.error('An error occurred - Please check the console');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[v0] Unhandled promise rejection:', event.reason);
});
