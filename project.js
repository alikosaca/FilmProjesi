const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title"); // film ismi,
const directorElement = document.querySelector("#director"); //yönetmen ismi
const urlElement = document.querySelector("#url"); // afiş linki
const cardBody = document.querySelectorAll(".card-body")[1]; // formun tamamı
const clear = document.getElementById("clear-films"); //filmi silme

//Artık obje üretmemize gerek yok çünkü static olarak yazdık

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsStorage();
        UI.loadAllFilms(films);
    });//sayfa yüklendiğinde devreye giriyor

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    //filmi eklemek için title/url/director elementlerinin değerlerini aldık
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    //elementlerimizin boş mu diye kontrol ediyoruz
    if(title === "" || director === "" || url === ""){
        //hata
        UI.displayMessage("Tüm alanları doldurun...","danger")
    }
    else{
        // Yeni film
        const newFilm = new Film(title,director,url);
        //şimdide arayüze ekliyoruz
        UI.addFilmToUI(newFilm); //Arayüze bu fonksiyon sayesinde yüklemiş oluruz
        Storage.addFilmToStorage(newFilm); //Storage'a film ekleme
        ui.displayMessage("Film Başarıyla eklendi...","success");
        console.log("d.5");
    }
    UI.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault(); // formun submit olmasını önler
}


function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("Silme işlemi başarılı...","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin Misiniz ? ")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }

}