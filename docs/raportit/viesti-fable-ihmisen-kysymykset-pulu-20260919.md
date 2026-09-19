# Opus 2 → Fable: Ihmisen matka – pulun valmiit kysymykset paneeliin

19.9.2026, haara `opus2-ihmisen-kysymykset` (pohja origin/main v1959 +
merge `agent-ihmisen-matka-kysymykset`). Ei versionostoa, ei PR:ää.
Raamattu: "IHMISEN MATKA: PULUN VALMIIT KYSYMYKSET JOKA JAKSOON".

## Mitä pelaaja näkee

Ihmisen matka -linssissä pulun keskustelupaneeli aukeaa ilman yleistä
tervehdystä ("Olen Livia, pulu – tuuraan Viisasta Pöllöä…"). Sen tilalla
ovat nykyisen paikan kolme valmista kysymystä nappeina. Napautus näyttää
kysymyksen ja esikirjoitetun vastauksen, jonka alla on lähdelinkki
("Lähde: en-Wikipedia: Wairau Bar"). Mallikutsua ei tehdä. Kaksi muuta
kysymystä jäävät tarjolle vastauksen alle. Vapaa kysymyskenttä toimii
kuten ennenkin.

Paikka valitaan tässä järjestyksessä:
1. Auki oleva nostokortti. Pääjakson kortti antaa jakson kolme kysymystä
   vastauksineen. Lisänoston kortti antaa `IHMISEN_MATKA_LISANOSTOT.kysymykset`
   -kentän kysymykset. Niille ei ole esikirjoitettua vastausta, joten ne
   menevät pulun tavallista mallireittiä, kuten kortin omat napit.
2. Esityksen jakso. Siirtymä- ja aluejaksoilla käytetään lähintä edeltävää
   löytöpaikkaa. Tutkimusvaiheessa se on viimeinen jakso (aotearoa), ja
   aikaselain kelaa saman indeksin.
3. Avauksessa ja Afrikan valoissa ei ole vielä löytöpaikkaa, joten
   paneelissa näkyy tavallinen tervehdys.

Neljä pääjaksoa (blombos, lake-mungo, tianyuan, niah) ei ole
kertomuksen `kohde`. Niiden kysymykset tulevat nostokortin kautta.

## Tiedostot

- `js/linssit/ihmisen-matka-pulukysymykset.js` (uusi): puhdas valinta
  `pulunKysymystilanne` sekä `kytkePulunKysymykset(ui, ajo)`, joka asettaa
  `ui.pulunLinssikysymykset()`.
- `js/aikajana.js`: `kaynnistaAikajana` kytkee kyselyn vain linssille
  `ihmisen-matka`, ja `Aikajana.pura` purkaa sen (kaikki sulkutiet).
- `js/pollo.js`:
  - `linssikysymykset()`
  - `naytaLinssinValmiit()`
  - `vastaaLinssinValmiilla()` (esikirjoitettu vastaus: tekstisisältönä,
    lähteet vain `https://`-linkkeinä, historiaan ja Livian lokiin,
    ääneen luku kuten muillakin vastauksilla)
  - `kysymysAvain` saa linssin avaimen ensin
  - tervehdys ohitetaan linssin paikalla
  - linssi ohittaa kaupunkipakan lipun `VALMISKYSYMYKSET_KAYTOSSA` (false)
  - Pöllö ei tuo linssimoduulia, koska kysely kulkee ui:n kautta.
- `js/linssit/ihmisen-matka-kortti.js`: kortin avaus ja sulku kutsuvat
  `matkakirjaPollo.tarkistaKonteksti()`, jolloin auki oleva paneeli
  vaihtaa kysymyksensä.
- `css/styles.css`: `.pollo-valmislahteet`.
- `sw.js`: uusi moduuli SHELLiin.

## Todisteet

- `tests/ihmisen-matka-pulukysymykset.test.mjs` (8 testiä): jokainen
  kertomuksen löytöpaikka ja jokainen pääjakso nostokortilta, siirtymä
  ja avaus, lisänosto, kytkennän purku sekä lähdekoodivartiot
  (tervehdys, ei mallikutsua, purku ajon purussa).
- `node --test tests/*.test.mjs`: 3666 / 0 hylättyä.
- Uusi selainsavuke `tools/savukkeet/savuke-ihmisen-pulukysymykset.mjs`
  (Chromium, Mac, 390 × 844): ks. alla. Savuketta ei lisätty
  sarjat.json-julkaisusarjaan (erä D karsii sarjaa); lisää, jos haluat
  sen porttiin.
- `savuke-ihmisen-pulukysymykset`: **10 / 10 läpi**. Toinen avaus
  jatkaa tutkimusvaiheesta, jolloin tervehdys väistyy ja aotearoan
  kolme kysymystä näkyvät. Napautus näyttää Wairau Barin vastauksen
  lähdelinkkeineen, ja **POST-pyyntöjä on 0**. Kaksi muuta kysymystä
  jäävät tarjolle. Denisovan kortti vaihtaa kysymykset, samoin Toban
  lisänosto. Linssin sulku purkaa kyselyn. Sivuvirheitä ei ole.
- Vartio `savuke-ihmisen-tutkimus` jäi ajamatta. Toinen sessio ajoi sitä
  samaan aikaan (portti 8749), ja yksi selain kerrallaan -sääntö esti
  toisen ajon. Sen kortti → chatti -väite (6b) kulkee muuttumattoman
  `polloKysy`-reitin kautta. CI ajaa vartion julkaisusarjassa.

Kaappaukset (390 × 844): `docs/raportit/kaappaukset/ihmisen-pulukysymykset-20260919/`
(`390-1-napit.jpg`, `390-2-vastaus.jpg`, `390-4-lisanosto.jpg`).
