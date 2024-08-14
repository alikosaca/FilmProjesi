
export class Storage{
    static addFilmToStorage(newFilm:string){
        let films = this.getFilmsStorage();
    
        films.push(newFilm);
    
        localStorage.setItem("films",JSON.stringify(films)); //stringe çevirip local storage'e ekliyoruz
    }
    
    static getFilmsStorage(){
        //eklemek istediğimiz film var mı kontrolü ediyoruz
        
        let films;
        
        if(localStorage.getItem("films") === null){
            films = [];
        }
        else{
            var a = localStorage.getItem("films")
            films = JSON.parse(a !); // arrayimiz daha önceden varsa json.parse ile onu aldık
        }
        return films;
    }
    static deleteFilmFromStorage(filmTitle){
        let films = this.getFilmsStorage();
    
        films.forEach(function(film,index){
            if(film.title === filmTitle){
                films.splice(index,1); //sadece bir tane obje sileceğimizi söyliyoruz
            }
        });
    
        localStorage.setItem("films",JSON.stringify(films));
    }
    static clearAllFilmsFromStorage(){
        localStorage.removeItem("films");
    }
}
