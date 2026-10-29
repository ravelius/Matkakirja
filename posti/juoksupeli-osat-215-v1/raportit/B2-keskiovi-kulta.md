Toimituksessa valittu pinta: `pinnat/1269-keskiovi-kulta.png`. Kehote: `prompts/B2-keskiovi-kulta.txt`. Alla tuotannon lähde- ja tarkistusraportti; native-polut viittaavat säilytettyihin paikallisiin alkuperäisiin.

# B2 / #1269 — kultainen keskiovi

## Toimeksianto ja lähde

- Pelikoodarin yhteistilaus `posti/pelikoodari-codex-juoksupeli-osat-215-20261029.md`, commit `084f144e819e2a39b546911df1674d2d6a80cf28`, blob `0037d8bd8237c0584e1e2f53f9e1f81ff6642fe2`. Koko lähde luettu. Koottu B2-jako ohjaa työtä.
- Liite `halli-03/tilaus-taihedian.md`, koko teksti luettu. Keskioven määritelmä: sama ovisarja kultaisin koristein, kullattu ristikko ja alapaneelit.
- `halli-03/9-keskiovi-kulta.png`: tavoitteen värijako ja kultakoristelu. Rajauksen alkuperäiset koordinaatit lähteen mukaan 714,196,750,234.
- `halli-03/k-julkisivu.png`: koko hallin viite, keskijänteen oven suhde ympäröiviin oviin. Tästä ei kopioitu ympäristöä tai valaistusta uuteen tekstuuriin.
- Aiempi `output/juoksupeli-rakennusmoduulit-20261027/delivery-surfaces-v1/1070-ristikko-pariovi.jpg` ja sen MANIFEST: tarkka 512 × 1024 kuvasuhde, kahden lehden rakenne, yläritilän/alapaneelin jako ja vetimien sijainti. Viitekuva ainoastaan; alkuperäistä 1070:tä ei muutettu. SHA256 säilyy `6d48dcba65e3cffa87048467d2f719db27d7ed1ddb3d633671039e0f7e275970`.

Kaikki kolme kuvaviitettä katsottu ennen generointia. Niiden paikalliset kopiot ovat `sources/`-kansiossa. Lähteen ja viitteiden tarkistussummat ovat `checkpoint.json`-tiedostossa.

## Tuotanto

Sisäänrakennettu ImageGen, kaksi kokonaan uutta kuvaa. Ei CLI/API-vaihtoa eikä osittaista retusointia. Ensimmäisessä otossa ristikkokennoihin syntyi liian voimakkaat leivotut varjot, joten sitä ei valittu. Toinen otto tehtiin erillisellä tiukasti tasaisen pigmenttikartan kehottella.

- Valittu alkuperäinen: `attempts/native-02.png`.
- Valittu kehote: `prompt-02.txt` (ensimmäinen kehote ja otto säilytetty).
- Lopullinen pinta: `delivery/1269-keskiovi-kulta.png`, 512 × 1024 RGB PNG.
- Ainoa vientikäsittely: koko kuvan Lanczos-pienennys sekä RGB PNG -muotomuunnos. Ei rajausta, väri- tai sisältömuutoksia, maalausta, yhdistelyä tai paikkausta.
- Kutsut: ImageGen 2, Tripo 0. Vastaanottoa, pelikäyttöä tai julkaisua ei ole väitetty valmiiksi.

## Tuonti ja tarkistus

Käytä yhtenä sRGB-värikuvana, yksi jaettu materiaali. Läpinäkyvyyttä ei tarvita. Ristikon takana on umpinainen tumman ruskeanpunainen pigmenttipinta. Säilytä 1070:n mitoitus ja UV-asettelu; kuva kattaa suljetun parioven kokonaan. Kyseessä on oven kerta-assetti, ei saumatonta seinätoistoa.

Yläritilä kattaa noin 60 % korkeudesta, vetimet ovat noin 61,5 % korkeudella ja alapaneelin kenttä noin 32 % korkeudesta, aiemman viitteen suhteiden mukaan. Parioven puolikkaat ovat tasaleveät. Kehys ja runko punalakkaa, ristikkopalkit ja alapaneelien ornamentti kultaa.

Kuvassa ei ole ympäristön heittovarjoja, suuntavalaistusta tai koko kuvan valogradienttia. Pienet värilliset reunaviivat sekä rengasvetimen muodon sävyerot ovat osa generoitua pigmenttipintaa; kuva ei ole mitattu puhdas materiaaliskannaus. Lopullinen PK/PT:n pelivalaistus- ja vertailutarkistus on erillinen vaihe.

`QA.json` sisältää vientikoon, formaatin, SHA256:n, rakenteen tarkistukset sekä hylkäyksen ja valinnan perustelut. `delivery/SHA256SUMS` kattaa lopullisen pintakuvan. Päätuottaja kokoaa yhteispaketin ja tekee toimituksen.
