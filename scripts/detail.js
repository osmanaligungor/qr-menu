/*
* 1-) console.log(window.location.search.split("="));
* 1-) yukarıdaki gibi yazımda consolda ['?id', '1'] şeklinde bir dizi oluşturarak, '=' den sonraki gelen değerleri böler.
* 2-) console.log(window.location.search.split("=")[1]);
* 2-) bu şekilde bir yazımda ise dizideki (0,1,2,3,4,5...) elemanlardan 1. elemana erişiriz.
* 3-) console.log(window.location.search.slice(4));
* 3-) yukarıdaki gibi bir yazımda ise 4. karakterden sonrakileri alıp yazdırır.
! ancak bu yöntemler profesyonel yöntemler değil. Çünkü bazı url' lerde birden fazla parametre olabiliyor. Dolayısıyla hata alırız. Tek bir parametre varsa işimize yarar ancak diğer metot daha uygun. Profesyonel yöntemler için aşağıdaki gibi hareket etmeliyiz.
*/

/*
 * URL'deki arama parametrelerine (search-param) erişeceğiz.
 * js' de tarayıcı ile alakalı olan verilere erişmek istiyorsak 'window' nesnesi kullanırız.
 * js' de URL'deki arama parametrelerini yönetmeye yarayan yerleşik bir class vardır. Bu class'ın ismi ===> 'URLSearchParams' dır.
 */

// const params = new URLSearchParams("?id=56&name=pankek&category=kahvalti");
// console.log(params.get("name"));
// yukarıda  URLSearchParams("?id=56&name=pankek&category=kahvalti") ile istediğimiz adresten istediğimiz parametreye ulaşabiliriz.

const params = new URLSearchParams(window.location.search);
// console.log(params.get("id"));
//* Yukarıdaki classtan oluşturduğumuz nesne sayesinde urldeki arama parametrelerini güncellemeye / erişmeye / silmeye yarayan methodları kullanabiliyoruz bizde get methodu ile id parametresine eriştik
const id = params.get("id");

// 1-) sayfanın yüklenme olayını izle.
document.addEventListener("DOMContentLoaded", async () => {
  // 2-) api'den verileri al.
  try {
    const res = await fetch("../db.json");
    const data = await res.json();

    // 3-) veriler arasından url'deki id'ye denk gelen ürünü bul.
    const product = data.menu.find((item) => item.id == id);

    if (!product) {
      // 4-) ürün bulunamazsa 404 sayfasını renderla
      renderNotFound();
    } else {
      // 5-) ürün bulunursa, sayfa içeriğini api'den aldığımız ürüne göre değiştir.
      renderPage(product);
    }
  } catch (error) {
    // api isteğinde hata olursa renderNotFound() foksiyonunu ekrana bas.
    renderNotFound();
    return alert("üzgünüz bir sorun oluştu!!!");
  }
});

// içerisine sayfa içeriğini ekrana basacağımız divi çağırdık
const outlet = document.getElementById("outlet");
// sayfa içeriğini aldığı parametreye göre dinamik olarak ekrana basan fonksiyon
function renderPage(product) {
  outlet.innerHTML = `
    <div class="d-flex justify-content-between fs-6">
        <a href="/">
            <img width="35px" src="./images/home.png" alt="home">
        </a>
        <p>anasayfa / ${product.category} / ${product.title.toLowerCase()}</p>
    </div>

    <h1 class="text-center my-4">${product.title}</h1>
    <img src="${product.img}" 
    style="max-height: 400px;" 
    alt="img1" class="rounded object-fit-cover shadow">
    <h4 class="mt-4">
        <span>Ürünün Kategorisi: </span>
        <span class="text-success">${product.category}</span>
    </h4>
    <h4 class="mt-4">
        <span>Ürünün Fiyatı: </span>
        <span class="text-success">${(product.price * 33).toFixed(2)} ₺</span>
    </h4>
    <p class="lead">
        ${product.desc}
    </p>
  `;
}

// * 404 sayfa içeriğini ekrana basan fonksiyon
function renderNotFound() {
  outlet.innerHTML = `
  <div style="height:90vh" class="d-flex justify-content-center align-items-center">
    <div class="d-flex flex-column align-items-center gap-3">
      <h1 class="text-center">Aradığınız ürün artık mevcut değil!!!</h1>
      <a href="/">Anasayfaya Dönün</a>
    </div>
  </div>
  `;
}
