# Opus → Fable: nostokortin pystykuva, nuolen tumma paneeli ja tilapalkki (19.9.2026)

Erä `opus-local-pystykuva`, Matkakirja Opus local (Mac Studio), 19.16–19.25 Suomen aikaa.
Pohja origin/main (v1961, 883f09fb).

## Juurisyy (mitattu, WebKit ja Chromium kosketustilassa)

Omistajan kuvassa (v1957, Annonayn nosto, kuva 2/2) oli pystykuva vasemmalla
ja oikealla tummanruskea paneeli. Uusi `tools/savukkeet/savuke-nostokuva-karuselli.mjs`
(390 × 844 dpr 3, hasTouch; nosto `maalehti-montgolfier`, Lisää-napista vaiheeseen 2,
›-nuolen napautus) toisti sen täsmälleen (`nuoli-ennen-jalkeen-webkit-390.jpg`, vasen):

- Seuraava-nuoli (`.nostosarja-kuvanuoli`, 24 % kuvan leveydestä, koko korkeus) oli
  napautuksen jälkeen **`:hover` true ja tausta `rgb(67, 51, 31)`** (= `#43331f`),
  molemmissa selaimissa. Lähde: `css/styles.css` `button:hover:not(:disabled)
  { background: #43331f }`, jonka spesifisyys (0,2,1) voitti nuolen oman
  `background: none` -säännön (0,1,0). Kosketuksella :hover jää päälle.
- **Pystykuva oli jo oikein**: `object-fit: contain`, `50% 50%`, kuvan keskikohta
  kehyksen keskellä (kuva 1920 × 2560 → näkyvä 266 × 354 px 312 px:n kehyksessä).
  Laitekuvan kapea vaalea kaistale vasemmalla oli contain-sovituksen sivutila, ja
  oikean puolen sivutilan peitti tumma nuoli.

## Korjaus

- `css/styles.css`: yleinen `button:hover` -tausta vain `@media (hover: hover)`
  -laitteille; kosketukselle lyhyt `button:active:not(:disabled)` painalluksen ajaksi.
- `css/fokusnosto.css`: kuvan päällä olevat nuolet (hetki, skandaali, nostosarja)
  `background: none` kaikissa tiloissa (:hover, :active, :focus, :focus-visible).
- **Tilapalkki / safe-area** (laitekuvassa kello kortin päällä; sivu on
  `viewport-fit=cover`): `.fokusnosto-kerros` saa yläreunaan
  `env(safe-area-inset-top)` + 1rem ja alareunaan vastaavan;
  `js/livia-nostotila.js` kortin yläreunan vara on vähintään safe-area + 12 px.
  Playwright ei emuloi safe-areaa (arvo on 0), joten tämä kohta on
  **laitteella varmistettava** (Sonnet).

## Mittaukset (savuke-nostokuva-karuselli, WebKit + Chromium)

| Väite | Ennen (origin/main) | Jälkeen |
| --- | --- | --- |
| 1. nuolen tausta napautuksen jälkeen | rgb(67, 51, 31), :hover true — FAIL ×2 | läpinäkyvä — OK ×2 |
| 2. kuva kehyksen keskellä ±2 px (contain) | OK ×2 | OK ×2 |
| 3. kortin yläreuna ruudulla | OK (28 px) | OK |
| Yhteensä | 6/8 | 8/8 (kahdesti) |

`node --test tests/*.test.mjs`: pass 3658, fail 0; tarkista-savukkeet kunnossa.

## Jäi

- Safe-area-korjaus todentamatta laitteella.
- `button:active`-tausta koskee nyt kaikkia painikkeita kosketuksella, mutta vain
  painalluksen ajan. Hiirellä käytös on ennallaan.
