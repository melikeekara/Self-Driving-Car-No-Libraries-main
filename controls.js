//Controls sınıfını içeriyor. Bu sınıf, klavye kontrollerini yönetmek veya belirli bir modda aracı sabit bir şekilde hareket ettirmek için kullanılır.
class Controls {
  //constructor fonksiyonu, bir kontrol tipine (type) göre aracın hareketini sağlayacak kontrol değişkenlerini ayarlar. İlk başta tüm kontrol değişkenleri false olarak atanır.
  constructor(type) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    switch (type) {
      case "KEYS":
        this.#addKeyboardListeners();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }
//#addKeyboardListeners fonksiyonu, klavye olaylarını dinlemek için kullanılır:
  #addKeyboardListeners() {
    //#addKeyboardListeners fonksiyonu, klavye olaylarını dinlemek için kullanılır:
    document.onkeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
    };

    //document.onkeyup olayına bir fonksiyon atayarak klavye tuşlarından çıkılma durumunu dinler. Çıkılan tuşa göre ilgili kontrol değişkenlerini false yapar.
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    };
  }
}
