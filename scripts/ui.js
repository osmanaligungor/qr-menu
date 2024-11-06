// ? Arayüze Etki Edecek Bütün Fonksiyonlar Burada Tutulacak

// * Bu dosyada tanımlanan foksiyonu ana js dosyasına export etmemiz lazım. export ettikten sonra ana js dosyasına import ile fonksiyonu çekmeliyiz.

// * menu-list divini çağıracağız. Çünkü buna erişmemiz lazım ki çevirdiğimiz diziyi bu dive yapıştırabilelim. İki farklı yöntemle de çağırabiliriz.

const menuList = document.getElementById("menu-list");
// const menuList = document.querySelector("#menu-list");

// * Menü elemanlarını parametre olarak alıp(data yani) dizideki her bir eleman için ekrana kartları basacak fonksiyon. export etmeyi unutma.
export const renderCards = (data) => {
  const cardsHTML = data
    .map(
      // diziyi dönmek için bir metoda ihtiyacımız var. O da 'map' metodu. Bu metodu yazarken kullanacağımız parametre dizideki her bir elemana karşılık gelen 'item' dır. Bunun item olma gibi bir zorunluluğu yok , mahmut bile olabilir. Ancak uyumlu olması adına item yazdık.
      // diziyi döndükten sonra yapılmasını istediğimiz neyse fonksiyona bunu yaptırıyoruz. Burada ekrana card basılmasını istediğimiz için card ' ı oluşturan html kodlarını alıyoruz ve backtick (``) arasına yazıyoruz.
      (item) => `
        <a href="/detail.html?id=${
          item.id
        }" id="card" class="d-flex flex-column flex-md-row text-dark gap-3 text-decoration-none">
            <img class="rounded shadow img-fluid" src="${item.img}" alt="img-2">
            <div>
                <div class="d-flex justify-content-between">
                    <h5>${item.title}</h5>
                    <p class="text-success fw-bold">${(item.price * 33).toFixed(
                      2
                    )}₺</p>
                </div>
                <p class="lead">${item.desc}</p>
            </div>
        </a>
  `
    )
    .join("");
  // bir diziyi string'e(metine) çevirebilmek için 'join("")' metodunu kullanırız.
  //   console.log(cardsHTML);
  // oluşturduğumuz cardları(cardsHTML) menuList te aktaralım. Bu aktarmayı da innerHTML ile yapabiliriz.
  menuList.innerHTML = cardsHTML;
};
