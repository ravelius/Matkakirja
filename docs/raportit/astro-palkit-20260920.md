# Astronautin kamera: NASAn valkoiset kuvatunnistepalkit

Raportti päätoimittajalle (Sonnet-agentti, Sisältökirjuri-rooli) 20.9.2026.
Lähtökohta: `docs/raportit/kaappaukset/omistaja-20260920/astro-etna-valkoinen-palkki.webp`
— omistajan kaappaus Etnan toisesta havaintokuvasta (ISS013E62714), jonka
alareunassa näkyy kapea valkoinen palkki NASAn kuvatunnisteella.

**EI KOMMITOITU, EI PUSHATTU.** Vain tämä raportti on tarkoitettu repoon,
ja senkin committoi pääsessio. Kaikki kuva-aineisto on paikallisessa
scratchpadissa, ei repossa eikä missään ämpärissä.

## TÄRKEIN LÖYDÖS: kaksi tehtävänannon oletusta olivat vääriä

1. **`tools/astronaut/`-kansio (exact-transfer.mjs, import-loop.mjs,
   ambient-manifest.json, qa-first.json, qa-last.json, build-*.mjs,
   delivery-receipt.json) EI LIITY NASAn valokuviin lainkaan.** Luin
   `exact-transfer.mjs` ja `import-loop.mjs` kokonaan: ne käsittelevät
   linssin AMBIENSSIÄÄNTÄ (yksi jaettu taustaäänite, `ContentType:
   audio/mpeg`, R2-polku `matkakirja/aanet/linssit/astronautin-kamera/
   20260916/...`). "Astronautin kamera" on siis kahden erillisen
   toimitusputken yhteinen nimi: yksi ääntä (tools/astronaut/) ja yksi
   valokuvia (tools/hae-satelliittihavainnot.mjs) varten — ne eivät jaa
   koodia eivätkä ämpäripolkua. `qa-first.json`/`qa-last.json` ovat
   todennäköisesti äänen laadunvarmistusaineistoa, ei kuva-aineistoa.
2. **`ASTRONAUTIN_KYSYMYKSET` (js/linssit/astronaut-kysymykset.js) ON
   käytössä.** `js/linssit/satelliitti.js` rivi 160 tuo sen suoraan:
   `import { haeAstronautinKysymykset } from './astronaut-kysymykset.js';`
   — se ei ole irrallinen tiedosto.

## MISTÄ KUVAT OIKEASTI TULEVAT

Todellinen kuva-aineisto on **`js/linssit/satelliitti-data.js`**
(koneellisesti tuotettu tiedosto, lähde `tools/hae-satelliittihavainnot.mjs`
→ `images-api.nasa.gov`). Se sisältää 64 kohdetta ja 83 havaintoa
(`SATELLIITTI_KOHTEET[].havainnot[]`), joista jokaisella on `kuva`
(iso, ~1920 px) ja `pikku` (pieni, ~640 px) -kenttä.

**KRIITTINEN ARKKITEHTUURIHAVAINTO: kuvat EIVÄT asu missään Matkakirjan
omassa ämpärissä.** `kuva`/`pikku`-osoitteet osoittavat SUORAAN NASAn
omalle CDN:lle, esim.
`https://images-assets.nasa.gov/image/iss013e62714/iss013e62714~large.jpg`.
Peli hakee ne selaimessa suoraan NASAlta joka kerta — `media.matkakirja.app`
ei tarjoile näitä kuvia lainkaan tällä hetkellä. Tämä tarkoittaa, että
"korjaa palkki ja lataa korjattu kuva ämpäriin paikalleen" -malli (joka
toimisi esim. ääniaineistolle) EI sovi suoraan: emme voi "korvata"
NASAn omaa objektia, koska emme omista sitä emmekä voi kirjoittaa sinne.
Korjaus vaatii UUDEN kuvan (Matkakirjan omaan ämpäriin) JA koodimuutoksen,
joka ohjaa nuo 12 havaintoa lukemaan NASAn sijaan omasta ämpäristä —
ks. alla "Ehdotus lopulliseksi vienniksi".

Vahvistin tämän myös oikeasta pelistä (matkakirja.app, Chromium
selainpaneelissa `window.matkakirja.ui` -konsolilla): avasin
Astronautin kamera -linssin, ajoin kameran Etnalle ja napautin merkkiä.
Ruudulla näkyi täsmälleen sama valkoinen palkki tekstillä "…24"
(havainnon `iss005e19024` loppuosa), DOM:ista löytyi
`<img class="satelliitti-kuva" src="https://images-assets.nasa.gov/
image/iss005e19024/iss005e19024~large.jpg">`, ja kuva oli `complete:
true` (ei kesken latauksen oleva harha) — palkki on siis aidosti
NASAn omassa JPEG-tiedostossa, ei pelin oma renderöintivirhe.

## MITÄ TUTKITTIIN

Ladattiin ja tutkittiin **166 kuvatiedostoa** = kaikki 83 havaintoa ×
2 kenttää (`kuva` + `pikku`), eli KAIKKI Astronautin kameran tällä
hetkellä käyttämät NASA-kuvat, ei vain kysymyskortilla varustetut 32
kohdetta (kysymykset kattavat vain osan 64 kohteesta; itse kuvat
näytetään kaikille 64:lle riippumatta kysymyksistä).

Tunnistus (Node + `sharp`, ei ImageMagickia tarvittu — `sharp@0.35.4`
oli jo asennettu): ensimmäinen yritys (yksinkertainen "onko rivi 97 %
valkoinen") epäonnistui, koska NASAn palkissa on musta teksti valkoisella
pohjalla — tekstirivit eivät ole 97 % valkoisia, joten algoritmi pysähtyi
palkin sisään. Korjattu menetelmä: verrataan riviä sen OMAAN mediaaniin
(sallii tekstin), vaaditaan taustan olevan lähes valkoinen (ei mustaa —
yöllisten kaupunkivalo-, revontuli- ja taifuunikuvien aito musta
taivas/meri antoi muuten runsaasti vääriä hälytyksiä), ja vaaditaan että
tunnistetulla kaistalla on oikeasti tummia leimapikseleitä (muuten
esim. Uyunin suolatasangon aito valkoinen pinta olisi laskettu palkiksi).
Kaista rajattu 80 pikseliin, koska kaikki aidot palkit osuivat
johdonmukaisesti ~35 px:n (iso kuva) tai ~11–12 px:n (pikkukuva) väliin
— n. 2,7 % kuvan korkeudesta joka kerta.

## TULOS: 12 havaintoa (24 tiedostoa) palkillisia, 71 puhtaita

Kaikki palkit olivat alareunassa, valkoisia, ja poikkeuksetta ~2,7 %
kuvan korkeudesta. Yhtään yläreunan palkkia ei löytynyt. Kaikki
palkilliset kuvat ovat NASAn VANHOJA arkistokuvia (2002–2013); uudemmat
(n. 2014 jälkeiset) kuvat eivät koskaan sisältäneet palkkia — NASA on
siis muuttanut oman kuvakirjastonsa `~large`/`~small`-tuotantoputkea
matkan varrella. Tämä auttaa ennakoimaan: jos `tools/
hae-satelliittihavainnot.mjs` tuo joskus lisää VANHOJA (esim. Space
Shuttle -aikaisia) kuvia, ne kannattaa tarkistaa samalla menetelmällä.

| Kohde (tunnus) | Havainto (NASA-id) | Iso kuva | Poistettu (px) | Pikkukuva | Poistettu (px) |
| --- | --- | --- | --- | --- | --- |
| etna | iss005e19024 (oletus) | 1920×1307 | 35 alhaalta | 640×435 | 11 alhaalta |
| etna | iss013e62714 (kaappauksen kuva) | 1920×1307 | 35 alhaalta | 640×435 | 11 alhaalta |
| sarytsev | iss020e009048 | 1920×1311 | 36 alhaalta | 640×437 | 12 alhaalta |
| siveluts | iss014e17165 | 1920×1286 | 35 alhaalta | 640×428 | 11 alhaalta |
| niilin-suisto | iss025e009858 | 1920×1314 | 36 alhaalta | 640×438 | 12 alhaalta |
| richat | iss002e5693 | 1920×1312 | 35 alhaalta | 640×437 | 11 alhaalta |
| goidhoo | iss010e12917 | 1920×1307 | 35 alhaalta | 640×435 | 11 alhaalta |
| onekotan | iss026e016287 | 1920×1311 | 36 alhaalta | 640×437 | 12 alhaalta |
| mataiva | iss024e011914 | 1920×1311 | 36 alhaalta | 640×437 | 12 alhaalta |
| issaouane | iss013e65526 | 1920×1307 | 35 alhaalta | 640×435 | 11 alhaalta |
| bingham | iss015e29867 | 1920×1307 | 35 alhaalta | 640×435 | 11 alhaalta |
| heard | iss018e038182 | 1920×1311 | 36 alhaalta | 640×437 | 12 alhaalta |

Huom: samasta kohteesta toinen havainto oli usein PUHDAS (esim. Niilin
suiston `iss037e004654`, Richatin `iss069e005471`, Onekotanin
`iss071e046421`) — palkki ei siis riipu kohteesta vaan yksittäisestä
NASA-kuvasta.

## Silmämääräinen tarkistus (3+ kuvaa)

Verrattiin rajattujen kuvien alareunaa alkuperäiseen: `niilin-suisto/
iss025e009858`, `richat/iss002e5693` ja `heard/iss018e038182`. Kaikissa
kolmessa rajattu reuna päättyy suoraan oikeaan kuvasisältöön (yövalot,
autiomaa, jäätikkö) — palkki ja teksti ovat kokonaan poissa, eikä
yhtään riviä oikeaa maisemaa ole leikattu pois.

## Paikalliset kansiot (EI repossa)

- `astro-alkuperainen/` — kaikki 166 alkuperäistä tiedostoa
  (nimetty `<tunnus>__<NASA-id>__kuva|pikku.jpg`).
- `astro-rajattu/` — 24 rajattua tiedostoa (vain palkilliset).
- `astro-images.json` — koko 83 havainnon lista (tunnus, id, kuva-, pikku-
  ja sivu-osoitteet), poimittu `satelliitti-data.js`:stä.
- `astro-raportti.json` — koneellinen tulos jokaiselle 166 tiedostolle
  (mitat, löytyikö palkki, montako pikseliä).
- `kasittele.mjs` — käytetty Node-skripti (lataus + tunnistus + rajaus).

Sijainti (tämän session scratchpad, katoaa session päätyttyä — pääsession
kannattaa kopioida talteen ennen jatkoa):
`/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/2fdb1d0e-0e84-47f7-bd59-d021bb337819/scratchpad/`

## EHDOTUS LOPULLISEKSI VIENNIKSI (EI SUORITETTU — vaatii pääsession/omistajan hyväksynnän)

Koska kuvat tulevat suoraan NASAlta, tämä EI ole "korvaa sama objekti
ämpärissä" vaan "tuo 12 kuvaa (24 tiedostoa) ensi kertaa Matkakirjan
omaan ämpäriin JA ohjaa juuri nämä 12 havaintoa käyttämään sitä".

**1. Ämpäripolku (ehdotus, sama kaava kuin muualla repossa, esim.
`matkakirja/aanet/linssit/...`):**
```
matkakirja/linssit/astronautin-kamera/<NASA-id>~large.jpg
matkakirja/linssit/astronautin-kamera/<NASA-id>~small.jpg
```
Alkuperäinen NASA-tiedosto talteen VIEREEN ennen korvausta (tehtävän-
annon vaatimus, jälkiä varten):
```
matkakirja/linssit/astronautin-kamera/<NASA-id>~large.alkuperainen.jpg
matkakirja/linssit/astronautin-kamera/<NASA-id>~small.alkuperainen.jpg
```

**2. Lataus (aws-sdk/aws-cli, sama muoto kuin `tools/astronaut/
import-loop.mjs`:n oma `aws s3 cp` -kutsu, mutta kuville):**
```bash
for id in iss005e19024 iss013e62714 iss020e009048 iss014e17165 \
          iss025e009858 iss002e5693 iss010e12917 iss026e016287 \
          iss024e011914 iss013e65526 iss015e29867 iss018e038182; do
  for koko in large small; do
    # 1) alkuperäinen talteen (vain jos ei jo siellä)
    aws s3 cp "astro-alkuperainen/<tunnus>__${id}__<kuva|pikku>.jpg" \
      "s3://$R2_BUCKET/matkakirja/linssit/astronautin-kamera/${id}~${koko}.alkuperainen.jpg" \
      --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com" \
      --content-type image/jpeg --cache-control "public,max-age=31536000,immutable" \
      --only-show-errors
    # 2) rajattu korvaa lopullisen nimen
    aws s3 cp "astro-rajattu/<tunnus>__${id}__<kuva|pikku>.jpg" \
      "s3://$R2_BUCKET/matkakirja/linssit/astronautin-kamera/${id}~${koko}.jpg" \
      --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com" \
      --content-type image/jpeg --cache-control "public,max-age=31536000,immutable" \
      --only-show-errors
  done
done
```
(Tiedostonimet pitää yhdistää oikein `astro-images.json`:n `tunnus`+`id`-
pareista; `large`→`kuva`-kenttä, `small`→`pikku`-kenttä.)

**3. Varmistus (HEAD + sisällön tarkistus), sama kaava kuin `import-
loop.mjs`:n `existing()`-funktiossa:**
```bash
curl -sI "https://media.matkakirja.app/matkakirja/linssit/astronautin-kamera/iss005e19024~large.jpg" \
  -H "Origin: https://matkakirja.app"
# odotettu: HTTP/2 200, content-type: image/jpeg,
# access-control-allow-origin: * tai https://matkakirja.app
```

**4. Koodimuutos `js/linssit/satelliitti-data.js`:ssä** — VAIN näiden
12 havainnon `kuva`/`pikku`-kentät osoittamaan uuteen ämpäriin, esim.
```js
"kuva": "https://media.matkakirja.app/matkakirja/linssit/astronautin-kamera/iss005e19024~large.jpg",
"pikku": "https://media.matkakirja.app/matkakirja/linssit/astronautin-kamera/iss005e19024~small.jpg",
```
**VAROITUS:** `satelliitti-data.js` on merkitty "KONEELLISESTI TUOTETTU
TIEDOSTO... Älä muokkaa käsin: aja tools/hae-satelliittihavainnot.mjs".
Jos tuo generointityökalu joskus ajetaan uudelleen (esim. uusien
kohteiden lisäämiseksi), se todennäköisesti KIRJOITTAISI NASAn
alkuperäiset osoitteet takaisin näille 12 riville ja palkki palaisi.
Pääsession kannattaa joko (a) lisätä `tools/hae-satelliittihavainnot.mjs`:ään
pysyvä poikkeuslista näille 12 NASA-id:lle (korvaa kuva/pikku-osoite
ämpäriosoitteella generoinnin jälkeen), tai (b) dokumentoida
Raamattuun/CONTRIBUTING.md:hen, että nämä 12 riviä ovat käsin ylläpidettyjä
poikkeuksia eikä niitä saa ajaa yli.

**5. Testit/savuke:** `tools/savukkeet/savuke-satelliittilinssi.mjs`
lataa NASA-kuvat suoraan verkosta (kommentti rivillä 21: "NASAn
kuva-ämpäri EI lähetä CORS-otsaketta... linssi näyttää kuvat tavallisina
img-elementteinä") — pikkukuva-ämpäri toimisi samoin, ei pitäisi vaatia
savukemuutoksia. `node --test tests/satelliitti.test.mjs` kannattaa silti
ajaa muutoksen jälkeen varmuuden vuoksi.

Tätä lataus- ja koodimuutosvaihetta EI ole suoritettu — se on
tuotantoon kirjoittava, peruuttamaton toimenpide (uusi ämpäriobjekti +
muutos koneellisesti tuotettuun tiedostoon), joka vaatii pääsession/
omistajan oman hyväksynnän ja ajamisen.
