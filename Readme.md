## EndPoints


Rota de criação de usuario, cadastro


>/signup

Parametros:

```js

{
	"name":"Fernando Santos",
	"email":"fernandorato.0@hotmail.com",
	"city":"Capelinha",
	"uf":"Mg",
	"birth_date":"1990-04-23",
	"password":"123456"
}


```

Obs: todos os campos acima são obrigatorios para realizar o cadastro...
o campo de password deve ter no minimu 6 caracters, podendo ser numero ou letras




>/signin

  Parametros:
  ```js
    {
	  "email":"e-mail@email.com",
	  "password":"1234567"
    }
  ```




Rota para atualização do usuario:


>/profile


parametros:

```js

{
	"name":"Fernando Santos",
	"email":"fernandorato.0@hotmail.com",
	"city":"Capelinha",
	"uf":"Mg",
	"oldPassword":"123456",
	"password":"1234567",
	"confirmPassword":"1234567"
}

```


Na atualização os campos não são obrigatorios,
Para atualizar a senha, é preciso entrar com a senha antiga, e com a senha nova, e com a confirmação da mesma!
a senha so sera atualizada, se a oldPassword estiver correto




### novos endpoints serão inseridos