const { createApp } = Vue;
// مكون القرآن (الأساسي)
const quran = {
  template: `
    <div class="container" style="direction: rtl;">
      <!-- الجزء الأول: قائمة السور -->
      <div v-if="!selectedSurah">
        <h3>فهرس السور : </h3>
        <ul class="surah-list" style="list-style: none; padding: 0;">
          <li v-for="surah in surahs" :key="surah.number" @click="fetchSurah(surah.number)" class="surah-card" style="cursor:pointer; border:1px solid #ddd; margin:5px; padding:10px;">
            <span>{{ surah.number }} - {{ surah.name }}</span>
            <small> ({{ surah.numberOfAyahs }} آية)</small>
          </li>
        </ul>
      </div>

      <!-- الجزء الثاني: عرض آيات السورة -->
      <div v-else class="surah-view">
        <button @click="selectedSurah = null" class="back-btn">⬅ عودة للفهرس</button>
        <h4>{{ selectedSurah.name }}</h4>
        <hr>
        <div class="ayah-text" >
          <span v-for="ayah in selectedSurah.ayahs" :key="ayah.number">
            {{ ayah.text }}
            </br>
            <b style="color: green"> ({{ ayah.numberInSurah }}) </b>
          </span>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      surahs: [],
      selectedSurah: null
    }
  },
  mounted() {
    // جلب قائمة السور وتخزينها في surahs
    fetch('http://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        this.surahs = data.data; // هنا التعديل المهم
        console.log(surahs)
      })
      .catch(err => console.error("Error fetching surahs:", err));
  },
  methods: {
    fetchSurah(id) {
      // جلب تفاصيل السورة
      fetch(`http://api.alquran.cloud/v1/surah/${id}/quran-uthmani`)
        .then(res => res.json())
        .then(json => {
          this.selectedSurah = json.data; // التعديل هنا (json.data مباشرة)
          window.scrollTo(0, 0);
        })
        .catch(err => alert("خطأ في تحميل السورة"));
    }
  }
}

// مكونات فرعية بسيطة
const azkar = {
  template: '<div class="page"><h1>الأذكار قريباً...</h1></div>'
}
const sabah = {
  template: '<div class="page"><h1>السبحة الإلكترونية</h1></div>'
}


const home = {
  template: `
   <header>{ بســــم اللــه الرحمـــن الرحيـــم }
      <br>
       تطبيق القرآن والذكر 
  </header>
  
  <div>: الصلاة القادمة
  </div>
  <div class="cont">
    <img src="istekame.jpg" alt="">
  </div>
  `,
  mounted() {
    setTimeout(() => {
      const img = document.querySelector('img')
      img.style.width = '60px'
      img.style.height = '40px'
      img.style.left = '2px'
      img.style.top = '95px'
    }, 1000)
  }
}

const routes = [
  { path: '/quran', component: quran },
  { path: '/azkar', component: azkar },
  { path: '/sabah', component: sabah },
  { path: '/', component: home }
]



const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = createApp({})
app.use(router)
app.mount('#app')


