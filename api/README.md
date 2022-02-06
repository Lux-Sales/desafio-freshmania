# Rotas da api:

### `Get all products`

route: `http://localhost:5000/products`
method: `GET`
payload: `None`
headers: `None`

curl: `curl --location --request GET 'http://localhost:5000/products`

response:
```JSON
 {
    "products": []
 }
```

### `Create products`

route: `http://localhost:5000/add`
method: `POST`
payload: FormData
```
{
    "name": string //required
    "logo": File //required
    "Value": number //required
}
```
headers: `None`

curl: 
```
curl --location --request POST 'http://localhost:5000/add' \
--form 'logo=@"/home/lucas/Documents/banana.jpg"' \
--form 'name="banana"' \
--form 'value="2.3"'
```

response:
```JSON
{
    "message": "Product added!",
    "product": {
        "id": "61ff5591375e7ba99ee5761a",
        "logo": "http://desafio-freshmania.s3.amazonaws.com/2022-02-06 04:58:56.497352",
        "name": "banana",
        "value": "2.3"
    }
}
```

### `Update products`

route: `http://localhost:5000/product/update/<product.id>`
method: `PUT`
payload: FormData
```
{
    "name": string //optional
    "logo": File //optional
    "Value": number //optional
}
```
headers: `None`
curl: 
```
curl --location --request PUT 'http://localhost:5000/product/update/61f6f20c0d565169d7563d36' \
--form 'logo=@"/home/lucas/Documents/teste1.jpg"' \
--form 'name="melão"' \
--form 'value="3.33"'
```

response: 
```JSON
{
    "message": "Product updated!",
    "product": {
        "id": "61ff5583375e7ba99ee57619",
        "logo": "http://desafio-freshmania.s3.amazonaws.com/2022-02-06 05:00:59.152966",
        "name": "melão",
        "value": "3.33"
    }
}
```

### `Delete products`

route: `http://localhost:5000/product/delete/<product.id>`
method: `DELETE`

payload: `None`
headers: `None`

curl: `curl --location --request DELETE 'http://localhost:5000/product/delete/61ff5583375e7ba99ee57619'`

response:
```JSON
{
    "message": "Product deleted!",
    "product": {
        "id": "61ff5583375e7ba99ee57619",
        "logo": "http://desafio-freshmania.s3.amazonaws.com/2022-02-06 05:00:59.152966",
        "name": "melão",
        "value": "3.33"
    }
}
```


