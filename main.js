import { renderCards } from "./scripts/ui.js";

// console.log("for controls!!!");

let data;

// * Menü verilerini db.json dosyasından çeken fonksiyon (asekron olacak çünkü api dan verileri çektikten sonra sayfada değişiklikleri basacağız.)
async function fetchMenu() {
  // * api'dan verileri al(api'den verileri fetch metodu ile alırız.)
  const res = await fetch("./db.json");
  // * fetch metodu ile istediğimiz adres/dosya vb. yerden verileri alabiliriz. Bunda dikkat etmemiz gereken nokta şu: await yazarak beklemesini sağlamamız gerekiyor.
  // * sonrasında aldığımız cevabı bir değişkene atıyoruz ki dönüştürmede işimiz kolaylaşsın. Api'den gelen cevaplar json formatında oluyor.
  // * json verilerini js formatına çeviriyoruz. Bu çevirmede de await yazmamız gerkiyor ki verileri çağırdıktan sonra dönüştürsün. Ardından bir değişkene atıyoruz.
  //   const data = await res.json();
  //   console.log(data);
  // biz data 'nın fonksiyon dışında da erişilebilir halde olmasını istiyoruz.
  // fonsiyon çağırıldığında return ile ulaşabiliriz. Yani 25. satırdaki fonksiyonda erişmek istersek return ile ulaşabiliriz.
  // *Bunun için globalde değişken oluşturup(5. satırdaki let data değişkeni.) içine atamamız gerekiyor. Bunu önce globalde data değişkeni olarak tanımlayarak sonrasında da datayı await res.json(); a atayarak yapabiliriz.
  data = await res.json();
}

// * Sayfanın yüklenme olayını izle
window.addEventListener("DOMContentLoaded", () => {
  // verileri çeken fonksiyonu çalıştıracağız. Verileri çekip dönüştüren fonksiyonu yukarıda yazdık.
  fetchMenu()
    // fonksiyon başarılı olduğu zaman kartları ekrana basan fonksiyonu çalıştıracağız.
    .then(() => renderCards(data.menu));
  // renderCards(data.menu) şeklinde yazmamızın sebebi ise datanın içerisinde menu adında bir dizi olması.
});

// * buttons alanındaki inputları çağır
const inputs = document.querySelectorAll("#buttons input");

// * inputlara tıklanma olayını izle(burada buton yok inputlara diyebiliriz.)
// * inputlar dizisini dön.
inputs.forEach((input) => {
  // * herbir inputun değişim olayını izle.
  input.addEventListener("change", () => {
    // * seçilen kategoriyi belirle
    const selected = input.id;
    // * eğer hepsi seçiliyse bütün datayı ekrana bas
    if (selected === "all") {
      renderCards(data.menu);
    } else {
      // * menü elemanlarından seçilen kategoriye ait olanları filtrele
      // console.log(data);
      const filtred = data.menu.filter((i) => i.category === selected);
      // console.log(filtred);
      // * filtrelenen datayı ekrana bas
      renderCards(filtred);
    }
  });
});
