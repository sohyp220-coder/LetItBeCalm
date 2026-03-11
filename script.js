const { createApp } = Vue;

// مكون القرآن (الأساسي)
const quran = {
  template: `
    <div class="container">
      <!-- الجزء الأول: قائمة السور (تظهر لو مفيش سورة مختارة) -->
      <div v-if="!selectedSurah">
        <h3 style="text-align:center">فهرس السور</h3>
        <ul class="surah-list">
          <li v-for="surah in surahs" :key="surah.number" @click="fetchSurah(surah.number)" class="surah-card">
            <span>{{ surah.number }} - {{ surah.name }}</span>
            <small>{{ surah.numberOfAyahs }} آية</small>
          </li>
        </ul>
      </div>

      <!-- الجزء الثاني: عرض آيات السورة (تظهر عند الضغط) -->
      <div v-else class="surah-view">
        <button @click="selectedSurah = null" class="back-btn">⬅ عودة للفهرس</button>
        <h2 style="text-align:center; color:#2c3e50">{{ selectedSurah.name }}</h2>
        <hr>
        <div class="ayah-text">
          <span v-for="ayah in selectedSurah.ayahs" :key="ayah.number">
            {{ ayah.text }} <b style="color: green"> ({{ ayah.numberInSurah }}) </b>
          </span>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      surahs: [], // لتخزين القائمة
      selectedSurah: null // لتخزين بيانات السورة اللي ضغطنا عليها
    }
  },
  mounted() {
    // نجيب الفهرس بس في البداية (خفيف جداً)
    fetch('https://api.alquran.cloud')
      .then(res => res.json())
      .then(json => this.surahs = json.data)
  },
  methods: {
    // دالة لجلب تفاصيل السورة بالرقم
    fetchSurah(id) {
      fetch(`https://api.alquran.cloud/${id}/quran-uthmani`)
        .then(res => res.json())
        .then(json => {
          this.selectedSurah = json.data;
          window.scrollTo(0, 0); // نطلع لأول الصفحة
        })
    }
  }
}

// مكونات فرعية بسيطة
const azkar = { template: '<div class="page"><h1>الأذكار قريباً...</h1></div>' }
const sabah = { template: '<div class="page"><h1>السبحة الإلكترونية</h1></div>' }

// إعدادات الرواتر
const routes = [
  { path: '/quran', component: quran },
  { path: '/azkar', component: azkar },
  { path: '/sabah', component: sabah },
  { path: '/', redirect: '/quran' } // افتراضي يفتح القرآن
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = createApp({})
app.use(router)
app.mount('#app')
