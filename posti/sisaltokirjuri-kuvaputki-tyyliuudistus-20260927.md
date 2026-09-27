## 2026-09-27 — SISÄLTÖKIRJURI → KUVAPUTKI: Nähtävyyskuvien tyylin kokonaisuudistus (KORVAA aiemman arviotilauksen laajuuden)

Omistajan tilaus (Fablen välittämänä 27.9.2026, kuvakaappaus Ateenan
kohdekartasta): nähtävyyksien miniatyyrikuvissa on kaksi täysin eri
TYYLIÄ sekaisin samoilla kartoilla — ei vain väriero. Aiempi
kuvaputkitilaus tänään (`posti/sisaltokirjuri-kuvaputki-poikkeamat-
arviointi-20260927.md`, 22 kuvaa) käsitteli VAIN värikylläisyyttä
mekaanisen mittarin perusteella. **Tämä tilaus laajentaa ja KORVAA sen
laajuudeltaan** — värikylläisyys on vain YKSI oire isommasta ongelmasta
(kaksi eri kuvasukupolvea, eri komposition ja perspektiivin logiikalla).
Älä tee aiempaa 22 kuvan korjausta erillisenä pikkutyönä: käsittele se
osana tätä isompaa läpikäyntiä (ne 22 kuvaa kuuluvat todennäköisesti
tämän tilauksen "vanha/muu mitta" -sukupolveen joka tapauksessa).

### 1. OIKEA TYYLI — pieni isometrinen pienoismalli

Vertailukohta: `assets/kartat/miniatyyrit/ateena-akropolis.webp`.

Ominaisuudet, jotka JOKAISEN nähtävyyskuvan pitää täyttää:
- **Isometrinen/3D-diorama-kuvakulma**: kohde esitetty vinosti ylhäältä
  pienoismallina, ei suoraan edestä kuin rakennuksen muotokuvana.
- **Läpinäkyvä tausta** (tai tasainen valkoinen): EI taivasta, EI
  pilviä, EI kaukomaisemaa tai ympäröivää kaupunkia/vuoristoa kohteen
  ympärillä. Kuva on YKSI irrallinen pienoismalli, joka "leijuu" kartan
  päällä.
- **Hillitty akvarellipaletti**: vaaleanbeige/ruskea kivi, vaimean
  vihreä kasvillisuus, ei kirkkaita/räikeitä värejä.
- **Pieni mittakaava**: rakennus/kohde täyttää suurimman osan
  512×512-ruudusta yksinään, ei ympäröivää katutason yksityiskohtaa.
  Pieniä ihmishahmoja mittakaavavihjeenä saa olla (esim. Zeuksen
  temppelin vartijat), mutta EI tarinallista toimintaa.
- Neliömuotoinen rajaus, EI pyöreää vinjettiä tai muuta erikoiskehystä.

Neljä referenssikuvaa, OMISTAJAN ITSENSÄ VAHVISTAMAT oikeiksi 27.9.2026
(kaikki paikallisia, `assets/kartat/miniatyyrit/`-kansiossa):
1. `ateena-akropolis.webp` — päävertailukohta
2. `ateena-antiikin-agora.webp`
3. `ateena-zeuksen-temppeli.webp`
4. `ateena-syntagman-aukio.webp`

Lisäksi: kaikki `-vari2`-tunnukset (`js/packs/miniatyyrit.js`:ssä
"pelkkä tunnus" -muodossa, R2-ämpärissä osoitteessa
`https://media.matkakirja.app/kohtaamiset/miniatyyrit/<tunnus>.png`)
edustavat tätä samaa tavoiteoitua — niitä on 565 kpl, hyvä laajempi
otanta jos referenssikuvia tarvitaan lisää.

### 2. VÄÄRÄ TYYLI — hylkäysperusteet

Merkitse kuva UUSITTAVAKSI, jos JOKIN näistä täyttyy:

1. **MAISEMA**: kuvassa näkyy taivas, pilvet, kaukomaisema tai
   ympäröivä kaupunki/vuoristo kohteen lisäksi.
2. **VÄÄRÄ KUVAKULMA**: suora julkisivunäkymä isometrisen
   pienoismallin sijaan.
3. **TARINALLINEN KOHTAUS**: kuva esittää tapahtumaa tai ihmisiä
   toiminnassa (hevoskärry, laivanlastaus, juoksija maalissa) PAIKAN
   pienoismallin sijaan. HUOM: nämä eivät ehkä kuulu nähtävyyskuviin
   OLLENKAAN — ks. kohta 5, "ei-paikat".
4. **LIIAN VÄRIKÄS/POIKKEAVA PALETTI** verrattuna muihin saman kartan
   kuviin (ks. myös erillinen värikylläisyystilaus, kohta yllä —
   sama ongelma, nyt osana isompaa läpikäyntiä).
5. **PYÖREÄ VINJETTI** tai muu erikoiskehystys.
6. **EI-ISOMETRINEN VALOKUVAMAINEN RENDER** (esim. moderni
   arkkitehtuurirender taivaalla ja puilla, ei akvarellipiirros).

Kolme esimerkkiä samasta Ateenan kartasta, OMISTAJAN ITSENSÄ VAHVISTAMAT
vääriksi 27.9.2026 (havainnollistavat useampaa hylkäysperustetta —
tämä on kalibrointiesimerkki: näin omistaja erottaa "väärän" ja
"oikean" toisistaan):
- `ateena-iliou-melathron.webp` — väärä kuvakulma (suora julkisivu) +
  maisema (taivas, hahmoteltu Akropolis taustalla)
- `ateena-akropolis-museo.webp` — maisema + ei-isometrinen render
- `ateena-niken-temppeli.webp` — maisema (koko Akropolis-kukkula
  näkyvissä taivaineen, ei vain temppeli pienoismallina)

### 3. MITÄ TEHDÄ

Codex arvioi ITSE JOKAISEN kaupungin KAIKKI nähtävyyskuvat yllä
olevalla rubriikilla (ei vain listattuja esimerkkejä) ja UUSII
POIKKEAVAT KOKONAAN (ei värikorjaus/retusointi — uusi kuva samasta
kohteesta oikeassa tyylissä). Lähdedata: `js/packs/miniatyyrit.js`
(kaupunki→kohde→tiedosto/tunnus) ja `js/packs/maakartat.js`
(`KAUPUNKIKARTAT`, kohteiden nimet ja kontekstit).

**HUOM "ei-paikat":** osa poikkeavista kuvista (esim. Maratonhuijaus,
Louis 1896 -maaliintulokuva Ateenassa) saattaa esittää TAPAHTUMAA tai
HETKEÄ, ei paikkaa — nämä eivät välttämättä kuulu "nähtävyys"-
kategoriaan lainkaan (vrt. Perustuslain/Raamatun "ei-paikat" -linjaus,
`tools/tarkista-nostopaikat.mjs`). Jos kohde ei ole oikeasti paikka
jota voi käydä katsomassa, MERKITSE se listaan huomautuksella
"EI-PAIKKA — tarkista kuuluuko nähtävyyksiin" äläkä uusi kuvaa
automaattisesti — Sisältökirjuri/Fable päättää säilytetäänkö kohde
ollenkaan.

**Havainnekuva-sana:** kaikki tekoälyn/Codexin tuottamia kuvia
kuvaavat pelaajalle näkyvät tekstit käyttävät sanaa "havainnekuva" (ei
"AI-kuva", "generoitu kuva" tai "kuvitus") — omistajan sääntö
13.4.2026, ks. Raamattu.

### 4. Järjestys ja toimitus

- **VAIN EUROOPPA ensin** (omistajan 27.9.2026 sääntö: uusi
  karttatyö/sisältötyö vain Eurooppaan kunnes valmis) — käy läpi
  kaikki Euroopan kaupungit ensin (`js/packs/europe.js`, `EUROPE.
  cities`, 50 kaupunkia). Muut mantereet vasta sen jälkeen, kun
  Eurooppa on valmis.
- **Toimitus kaupunkierinä, omina PR:inä** (ei yhtä jätti-PR:ää) —
  sama käytäntö kuin aiemmissa kuvaputkitoimituksissa. Jokaisessa
  PR:ssä ENNEN|JÄLKEEN-kontaktiarkki (kuten `tools/nahtavyyskuvien-
  kontaktiarkki.py` tuottaa) koko kaupungin kartasta, jotta muutos on
  silmämääräisesti tarkistettavissa yhdellä katsomisella.
  Aja `node tools/mittaa-miniatyyrit.mjs` samassa PR:ssä (tiedostojen
  sha256 muuttuu). Ei mergeä itse — Julkaisijan junaan.

### 5. Oma lähtölistamme (liite, vertailua varten)

Sisältökirjurin oma silmämääräinen ennakkoarvio poikkeavista kuvista
(kontaktiarkit koottu paikallisista `assets/kartat/miniatyyrit/`-
tiedostoista, luokiteltu samalla rubriikilla kuin yllä) on liitteenä —
ks. `posti/sisaltokirjuri-tyylilista-eurooppa-20260927.md`. Tätä EI ole
tarkoitettu tyhjentäväksi listaksi (emme mitanneet R2:n -vari2-kuvia
emmekä muita mantereita) — se on vertailukohta, jotta Codexin oman
läpikäynnin kattavuutta voi arvioida jälkikäteen.
