document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

        const postData = () => {
                return new Promise((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', () => {
                        if(request.readyState !== 4) return;
                        if(request.status === 200) {
                            const data = JSON.parse(request.responseText);
                            data.cars.forEach(item => {
                                if (item.brand === select.value) {
                                    const {brand, model, price} = item;
                                    resolve({brand, model, price});                        
                                }
                            })
                        }
                        else reject();
                    });
                    request.open('GET', './cars.json');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send();
                });
                
            } 

    select.addEventListener('change', () => {
        postData()
                .then(({brand, model, price}) => output.innerHTML = `Тачка ${brand} ${model}  <br> Цена: $${price}`)
                .catch(error => {output.innerHTML = 'произошла ошибка';});
    })
    

});