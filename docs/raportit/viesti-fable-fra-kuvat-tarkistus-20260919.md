# Ranskan pakkojen kuvatarkistus — Sonnet, 19.9.2026 klo 12.21 Suomen aikaa

Tehtävä (Fable local): tarkista worktreessä origin/main-tilassa, että
kaikkien Ranskan pakkojen (`js/packs/*fra*.js`) kuvaosoitteet vastaavat
verkosta HEAD/GET 200, ja että jokaisella `hahmotelma-fra.js`:n nostolla
on kaksi kysymystä ja ≥ 2 kuvaa (Raamattu KARTTAUUDISTUKSEN PAATOKSET 44).
Vain lukevaa työtä; ei kosketettu simulaattoriin.

## Tulos lyhyesti

- **90/90 kuvaosoitetta vastaa 200.** Ei yhtään ei-200-osoitetta.
- **hahmotelma-fra.js: 27/27 nostoa kunnossa** — jokaisella on `teksti`,
  täsmälleen 2 `kysymykset`-kohtaa ja ≥ 2 kuvaa (`kuva` + `kuvat`).
  Tiedostossa ei ole enää yhtään `hahmotelma: true` -lippuista riviä
  (doc-kommentin väite pitää paikkansa 19.9. tilanteessa).

## Mitä tarkistettiin ja miten

Kuusi `js/packs/*fra*.js`-tiedostoa `origin/main`:sta (`git show
origin/main:js/packs/<tiedosto>.js`, ei kosketa työhakemistoon):
`fokuskohteet-fra.js`, `hahmotelma-fra.js`, `maalehtinostot-fra.js`,
`maastokohteet-fra.js`, `nakyvat-kaupungit-fra.js`, `nostoankkurit-fra.js`.

Node-skripti (ES-moduuli-importti suoraan pakoista, tuottaa saman datan
kuin peli) keräsi kaikki `kuva.osoite`- ja `kuvat[].osoite`-kentät ja
tarkisti ne `fetch`illä (HEAD, GET jos HEAD antoi 403/405), enintään 4
rinnakkain, `NODE_USE_ENV_PROXY=1`.

**Kolmesta tiedostosta löytyi 90 uniikkia suoraa kuvaosoitetta**
(kaikki `media.matkakirja.app/karttanostot/...`):

| Tiedosto | Osoitteita | Kaikki 200? |
|---|---|---|
| hahmotelma-fra.js | 56 | Kyllä |
| maastokohteet-fra.js | 34 | Kyllä |
| fokuskohteet-fra.js | 0 (ei vientitaulukkoa/kuvakenttiä tässä pakassa) | — |

Yhteensä 90 (osa osoitteista jaettu usean rivin kesken, esim. Mont
Blanc / Mont-Saint-Michel / Carcassonne, joilla on sekä vanha
17.9./18.9. kuva että uudempi täydennys — molemmat 200).

**Kaksi tiedostoa EI sisällä suoria kuvaosoitteita, ei siis tarkistettu
HTTP:llä — eri, jo olemassa oleva mekanismi:**

- `maalehtinostot-fra.js` lukee kuvan `maa-kategoriat.js`:n FRA-nostoista
  ajon aikana (`kuva.tiedosto`, esim. `'Stonehenge2007 07 30.jpg'` -
  Commons-tiedostonimi, ei URL). Todellinen osoite muodostetaan
  yhteisellä `valokuvaUrl()`-funktiolla (js/fokusvirta.js ym.), jota
  käyttävät KAIKKI maat, ei vain Ranska — tämän testaaminen olisi koko
  kuvaputken testi, ei Ranska-pakkojen testi, joten rajasin sen pois.
  Tämä koskee mm. testiraportissa (ranska-testi-3) mainittua
  Mont-Saint-Michel-nostoa "Meri palaa saaren ympärille" — **sen kuva
  EI ollut tässä tarkistuksessa mukana**, koska se tulee lehden kautta
  eikä ole staattinen osoite tässä pakassa. (Sen sijaan
  `maastokohteet-fra.js`:n oma, eri Mont-Saint-Michel-rivi, jolla on
  kaksi suoraa kuvaosoitetta, ON tarkistettu ja on 200/200.)
- `nakyvat-kaupungit-fra.js` importtaa `maalehtinostot-fra.js`:n eikä
  lisää omia kuvakenttiä — sama rajaus koskee sitä.
- `nostoankkurit-fra.js` on pelkkä lat/lng-taulu (kartta-ankkurit), ei
  kuvia lainkaan.

## hahmotelma-fra.js: kysymys- ja kuvamäärät

Kaikki 27 riviä läpäisivät: `kysymykset.length === 2` ja
`(kuva ? 1 : 0) + kuvat.length >= 2` jokaisella. Ei yhtään poikkeamaa
kirjattavaksi.

## Rajaus ja huomio Fablelle

En laajentanut tarkistusta `maalehtinostot-fra.js`:n/`maa-kategoriat.js`:n
Commons-tiedostoihin, koska se on jaettu, kaikkien maiden käyttämä
kuvaputki eikä Ranska-kohtainen — jos Fable haluaa senkin osoitteet
HTTP-tarkistettua, se on oma, laajempi tehtävä (koskisi kaikkia maita,
ei vain Ranskaa) ja kannattaa antaa omana toimeksiantona.

---

Haara: `sonnet-local-fra-kuvat` (worktree `/Users/samireivinen/Matkakirja-sonnet`).
Ei PR:ää (Raamattu, AGENTIT VAIN OPUS JA SONNET tarkennus 8 kohta 16).
Raportti pushattu, jään valmiuteen.
