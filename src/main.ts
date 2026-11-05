import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { ProductCatalogModel } from './components/Models/ProductCatalogModel';
import { CartModel } from './components/Models/CartModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { Api } from './components/base/Api';
import { LarekApi } from './components/LarekApi';
import { API_URL } from './utils/constants';

const catalog = new ProductCatalogModel();
catalog.setProducts(apiProducts.items);
const cart = new CartModel();
const buyer = new BuyerModel();
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

/* Методы модели ProductCatalogModel */
console.log('Каталог:', catalog.getProducts());
console.log(
    'Товар по ID:',
    catalog.getProductById(apiProducts.items[0].id)
);
catalog.setPreview(apiProducts.items[0]);
console.log('Товар для подробного отображения:', catalog.getPreview());

/* Методы модели CartModel */
console.log('Корзина:', cart.getItems());

cart.addProduct(apiProducts.items[0]);
console.log('Корзина после добавления товара:', cart.getItems());

cart.removeProduct(apiProducts.items[0]);
console.log('Корзина после удаления товара:', cart.getItems());

cart.addProduct(apiProducts.items[0]);
console.log('Корзина перед очисткой:', cart.getItems());
cart.clear();
console.log('Корзина после очистки:', cart.getItems());

cart.addProduct(apiProducts.items[0]);
cart.addProduct(apiProducts.items[1]);
console.log('Общая стоимость корзины:', cart.getTotal());

console.log('Количество товаров в корзине:', cart.getCount());

console.log(
    'Наличие первого товара в корзине:',
    cart.hasProduct(apiProducts.items[0].id)
);
console.log(
    'Наличие третьего товара в корзине:',
    cart.hasProduct(apiProducts.items[2].id)
);

/* Методы модели BuyerModel */
console.log('Покупатель:', buyer.getBuyer());

buyer.setBuyer({
    payment: 'card',
    address: 'Омск, ул. Тленная, 13',
    email: 'test@test.com',
    phone: '+78005553535'
});

console.log('Данные покупателя после заполнения:', buyer.getBuyer());

buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getBuyer());

console.log('Ошибки валидации:', buyer.validate());

/* Вызов метода `getProductList()` у larekApi */
larekApi.getProductList()
    .then((data) => {
        catalog.setProducts(data.items);
        console.log('Каталог с сервера:', catalog.getProducts());
    })
    .catch((error) => {
        console.error('Ошибка получения каталога:', error);
    });