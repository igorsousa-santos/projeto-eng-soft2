class User {
   
   #id;
   #nome;
   #email;
   #password;

  set id(id) {
    this.#id = id;
   }
   get id() {
     return this.#id;
   }
  
  set nome(nome) {
    this.#nome = nome.UpperCase();
   }
   get nome() {
    return this.#nome;
   }  
   set email(email) {
    this.#email = email;
   }
   get email() {
    return this.#email;
   }
   set password(password) {
    this.#password = password;
   }  
   get password() {
     return this.#password;
   } 

   toJSON() {
     return  {
         id: this.#id,
         nome: this.#nome,
         email: this.#email,
         password: this.#password
     }
   }
}
module.exports = User;