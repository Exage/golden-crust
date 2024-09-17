import google from '../assets/icons/google.svg'
import apple from '../assets/icons/apple.svg'
import yandex from '../assets/icons/yandex.svg'

export const addresses = [
    {
        id: 1,
        address: {
            street: 'Pushkinskaya',
            house: '18-15'
        },
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
                link: 'https://maps.apple.com/?ll=52.095750,23.689865&q=Dropped%20Pin&t=m'
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
        address: {
            street: 'Oktyabyr\'skoy revolyutsii',
            house: '7A'
        },
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
                link: 'https://maps.apple.com/?ll=52.080819,23.745062&q=Dropped%20Pin&t=m'
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