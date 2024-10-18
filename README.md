# Blog Uygulaması

## Proje Tanımı
Bu proje, rol tabanlı grup yönetimi içeren tam özellikli bir blog platformu geliştirmeyi amaçlamaktadır. Kullanıcılar sisteme kayıt olabilir, giriş yapabilir, gruplara katılabilir, bloglar oluşturabilir, düzenleyebilir ve arşivleyebilir. Grup yöneticileri ise grup içi erişimleri yönetebilir.

## Gerçekleştirilen Özellikler
- **Blog Ekleme:** Kullanıcılar blog oluşturma işlemini gerçekleştirebilir.
- **Admin Girişi:** Admin kullanıcıları giriş yaparak grupları yönetebilir.
- **User Girişi:** Normal kullanıcılar sisteme giriş yaparak blogları görüntüleyebilir.
- **Admin Hareketleri:** Adminler, gruplarını yönetme ve blog içeriklerini düzenleme yetkisine sahiptir.
- **User Hareketleri:** Normal kullanıcılar, kendi bloglarını yönetebilir.
  
### Yapılmayan Özellikler
- **UI Düzenlemeleri Bitirilmedi
- ## Kullanıcı Etkileşimleri ve Blog Görünürlüğü
1. **Beğeni (Kalp Atma) Fonksiyonu**
   - Kullanıcılar kendilerine ait olmayan bloglara beğeni bırakabilir.

2. **Sıralama ve Filtreleme**
   - Bloglar en güncelden en eskiye doğru sıralanacak.

3. **Arama Mekanizması (Debounce Search)**
   - Bloglarda başlık veya içerik bazlı arama yapılabilecek.


## Özellikler ve Fonksiyonlar
### Kullanıcı Doğrulama ve Yetkilendirme
1. **Kayıt ve Giriş İşlemleri**
   - Kullanıcıların platforma erişebilmesi için kayıt olmaları ve giriş yapmaları gerekir.
   - Yalnızca giriş yapan kullanıcılar grup bloglarını ve genel blogları erişebilir.

2. **Rol Yönetimi**
   - Kullanıcılar gruplara üye olarak katılabilir.
   - Her grup için bir admin belirlenir.
   - Admin, gruba yardımcı adminler ekleyebilir, adminlik yetkisini kaldırabilir veya gruptan kullanıcıyı çıkarabilir.

### Blog İşlemleri
1. **Grup Blogları**
   - Her grup admini, kendi grubu için bloglar ekleyebilir, düzenleyebilir, arşivleyebilir.
   - Sadece gruba üye olanlar o grubun bloglarını görüntüleyebilir.

2. **Genel Bloglar**
   - Her kullanıcı, genel bloglar oluşturabilir.
   - Genel blogları tüm kullanıcılar görüntüleyebilir, ancak sadece blog sahibinin düzenleme veya arşivleme yetkisi vardır.



## Teknolojiler
- **Frontend:** 
  - TailwindCSS
  - Yup
  - React Hook Form
  - Redux Toolkit
  - Redux Toolkit Query
  - TypeScript

- **Backend:**
  - Node.js
  - TypeScript
  - Express
  - PostgreSQL
 
### Database Şeması
![image](https://github.com/user-attachments/assets/bf4dfca7-2d73-4d23-a3e6-6dbfe5eaaa00)


