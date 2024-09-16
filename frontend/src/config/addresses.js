import google from '../assets/icons/google.svg'
import apple from '../assets/icons/apple.svg'
import yandex from '../assets/icons/yandex.svg'

export const addresses = [
    {
        id: 1,
        name: "st. Pushkinskaya 18-15",
        contacts: [
            {
                type: 'phone',
                data: '+375331234567'
            },
            {
                type: 'phone',
                data: '+375331234567'
            },
            {
                type: 'email',
                data: 'addressmail1@gmail.com'
            },
        ],
        links: [
            {
                type: 'google',
                icon: google,
                link: 'https://maps.app.goo.gl/YPMaeBUk9VHsTpj39'
            },
            {
                type: 'apple',
                icon: apple,
                link: 'https://maps.apple.com/?address=%D0%9F%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0,%20224005%20Brest,%20Brest%20Region,%20Belarus&ll=52.095708,23.689839&q=Dropped%20Pin&_ext=EiYpiF548agLSkAxmGT8Hr2uN0A5BjSeTc8MSkBBNniBaHuyN0BQBA%3D%3D'
            },
            {
                type: 'yandex',
                icon: yandex,
                link: 'https://yandex.by/maps/-/CDDLYS4n'
            },
        ],
        position: [52.095708, 23.689841]
    },
    {
        id: 2,
        name: "st. Oktyabyr'skoy revolyutsii 7A",
        contacts: [
            {
                type: 'phone',
                data: '+375291234567'
            },
            {
                type: 'phone',
                data: '+375291234567'
            },
            {
                type: 'email',
                data: 'addressmail2@gmail.com'
            },
        ],
        links: [
            {
                type: 'google',
                icon: google,
                link: 'https://maps.app.goo.gl/riZiC5MoQnXdvCG2A'
            },
            {
                type: 'apple',
                icon: apple,
                link: 'https://maps.apple.com/?address=%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9E%D0%BA%D1%82%D1%8F%D0%B1%D1%80%D1%8C%D1%81%D0%BA%D0%BE%D0%B9%20%D0%A0%D0%B5%D0%B2%D0%BE%D0%BB%D1%8E%D1%86%D0%B8%D0%B8,%20224011%20Brest,%20Brest%20Region,%20Belarus&ll=52.080780,23.745127&q=Dropped%20Pin&_ext=EiYp4h7FL9MJSkAxrWhloN68N0A5YPTqi/kKSkBBEx8dm5zAN0BQBA%3D%3D'
            },
            {
                type: 'yandex',
                icon: yandex,
                link: 'https://yandex.by/maps/-/CDDLiP~G'
            },
        ],
        position: [52.080844, 23.745422]
    }
]