const { createApp } = Vue;
// مكون القرآن (الأساسي)
const quran = {
  template: `
    <div class="container" style="direction: rtl;">
      <!-- الجزء الأول: قائمة السور -->
      <div v-if="!selectedSurah">
        <h3>فهرس السور : </h3>
        <ul class="surah-list" style="list-style: none; padding: 0;">
          <li v-for="surah in surahs" :key="surah.number" @click="fetchSurah(surah.number)" class="surah-card" >
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
           </br>
            {{ ayah.text }}
            </br>
            <b > ({{ ayah.numberInSurah }}) </b>
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
    fetch('https://api.alquran.cloud/v1/surah')
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
      fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`)
        .then(res => res.json())
        .then(json => {
          this.selectedSurah = json.data; // التعديل هنا (json.data مباشرة)
          window.scrollTo(0, 0);
        })
        .catch(err => alert("خطأ في تحميل السورة"));
    }
  }
}

const azkar = {
  data() {
    return {
      azkarSabah: [],
      azkarMasaa: [],
      adeya : [],
      adeyaT: [],
      sleep: [],
      tsabeeh: [],
      azkarIst: [],
      abimaa:[],
      showContent: false,
      type:''
    }
  },
  mounted() {
    fetch('https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json')
      .then(res => res.json())
      .then(json => {
        const azkarSabah = json['أذكار الصباح']
        this.azkarSabah = azkarSabah
        const azkarMasaa= json['أذكار المساء']
        this.azkarMasaa = azkarMasaa
        const adeya = json['أدعية الأنبياء']
        this.adeya = adeya
        const adeyaT = json['أدعية قرآنية']
        this.adeyaT = adeyaT
        const sleep = json['أذكار النوم']
        this.sleep = sleep
        const tsabeeh = json['تسابيح']
        this.tsabeeh = tsabeeh
        const azkarIst = json['أذكار الاستيقاظ']
        this.azkarIst = azkarIst
        const abimaa = json['أذكار بعد السلام من الصلاة المفروضة']
        this.abimaa = abimaa
      })
      .catch(err => console.error('Error:', err))
  },
  methods: {
    content(type) {
      this.showContent = true
      this.type = type
    },
    Ncontent(){
      this.showContent = false
    }
  },
  template: `
<button @click="content('sabah')"> أذكار الصباح </button>
<button @click="content('tsabeeh')"> تسابيح </button>
<button @click="content('azkarIst')"> أذكار الاستيقاظ من النوم </button>
<button @click="content('abimaa')"> أذكار السلام من الصلاة  </button>
<button @click="content('masaa')"> أذكار المساء </button>
<button @click="content('adeya')"> ادعيه الانبياء </button>
<button @click ="content('adeyaT')">ادعيه القران </button>
<button @click="content('sleep')"> أذكار النوم </button>
<button @click="Ncontent()">عودة للأذكار</button>
<div v-if="showContent" style='margin-top: 300px;'>
  <h1 v-for="azkar in (type === 'sabah' ? azkarSabah : type === 'masaa' ? azkarMasaa : type === 'adeya' ? adeya : type === 'adeyaT' ? adeyaT : type === 'sleep' ? sleep : type === 'tsabeeh' ? tsabeeh : type === 'azkarIst' ? azkarIst : type === 'abimaa' ? abimaa : [])" :key="azkar.content" style="font-size: 25px;">
    {{ azkar.content }}
  </h1>
</div>

  `
}

const sapah = {
  data() {
    return {
      count: 0,
      type: '',
      types: ['تسبيح', 'حمد', 'تكبير', 'تهليل', 'استغفار']
    }
  },
  mounted() {
  },
  methods: {
    zt(type) {
      this.type = type
      this.count = 0
    },
    increment() {
      if (this.type) {
        this.count++
      }
    }
  },
  template: `
    <div>
      <div class='count' style="margin: auto;">
        <button @click="increment()">اذكر الله</button>
      </div>
      <h2 v-if="type" style="margin: auto;">{{ count }} :{{type}} الذكر</h2>
      <button v-for="(t, index) in types" :key="index" @click="zt(t)" style="margin: 5px;">{{ t }}</button>
    </div>
  `
}
const home = {
  data() {
    return {
      timings: {}
    }
  },
  template: `
    <header>{ بســــم اللــه الرحمـــن الرحيـــم } <br> تطبيق القرآن والذكر </header>
    <div class='sa'>
      <p>الفجر: {{timings.Fajr}}</p>
      <p>الشروق: {{timings.Sunrise}}</p>
      <p>الظهر: {{timings.Dhuhr}}</p>
      <p>العصر: {{timings.Asr}}</p>
      <p>الغروب: {{timings.Sunset}}</p>
      <p>المغرب: {{timings.Maghrib}}</p>
      <p>العشاء: {{timings.Isha}}</p>
    </div>
    <div class="cont">
      <img src="istekame.jpg" alt="">
    </div>
  `,
  mounted() {
    setTimeout(() => {
      const img = document.querySelector('img')
      img.style.opacity = '.0'
      img.style.opacity = '.5'
      img.style.height = '70px'
      img.style.width = '70px'
      img.style.borderRadius = '50%'
      img.style.top = '80px'
      img.style.right = '10px'
      img.style.opacity = '.5'
      img.style.opacity = '1'
    }, 500)
    fetch('https://ipapi.co/json')        
          .then(res => res.json())
          .then(data => {
             let date = new Date();
             let day = date.getDate();
             let month = date.getMonth() + 1;
             let year = date.getFullYear();
             let latitude = data.latitude
             let longitude = data.longitude
             let city = data.city
             let country = data.country
             let country_name = data.country_name
        fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`)       
          .then(res => res.json())
          .then(data => {
            this.timings = data.data['timings']
          })
      })
  }
}
const routes = [
  { path: '/quran', component: quran },
  { path: '/azkar', component: azkar },
  { path: '/sabah', component: sapah },
  { path: '/', component: home }
]



const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = createApp({})
app.use(router)
app.mount('#app')
