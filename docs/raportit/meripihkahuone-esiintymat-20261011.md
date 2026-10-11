# Meripihkahuone pelaajalle näkyvissä teksteissä: esiintymät (Sisältökirjuri 11.10.2026)

PT:n tilaus 11.10. klo 21.5x: omistaja vaihtaa Euroopan aarteen (Meripihkahuone ei mahdu matkalaukkuun). Luettelo kattaa koko repon (mainin tila 11.10. illalla): data, oppaat, Pulu, diplomi, kaaret, aarremerkinnät, Raamattu. Mittaus: kaikki `js/packs/`-moduulit ladattu ja merkkijonot käyty läpi, lisäksi tekstihaku koko repoon. Ei muutoksia dataan.

## 1. Pelaajalle näkyvät (korjattava, kun uusi aarre on valittu)

| Paikka | Määrä | Mitä |
|---|---|---|
| `js/packs/europe.js` (Euroopan lauta) | **9 merkkijonoa + 1 kuva** | laudan nimi `name: 'Meripihkahuone'` (näkyy laudan nimenä), `tagline`, `tokens.types.star.name` ja `.fakta` (Preussin lahja 1716, katoaminen 1945), `texts.intro`, `starFound`, `starToast`, `winStar`, `winnerStar`; kuva `assets/aarteet/aarre-europe-star.jpg` (aarteen ja diplomin kuva, tekstit tulevat samoista kentistä) |
| `js/packs/maailmankartta.js` | **2 merkkijonoa** | `mannerTypes.europe.star.name` ja `.fakta` (samat tekstit; lisäksi koodikommentti rivillä 1269) |
| **Aarremerkinnät** (fokusvirta, `aarremerkinta.teksti`) | **50 tekstiä** (kaikki Euroopan kaupungit) | kaikki on kirjoitettu "etsin Meripihkahuonetta täältä, ei ollut" -mallilla (#4410). Sanan *Meripihkahuone* sisältää **11** (Berliini, Budapest, Tukholma, Tallinna, Amsterdam, Vilna, Krakova, Alpit, Lappi, Tromssa, Kassa), sanan *meripihka* ilman huonetta **22**, epäsuorasti (huone / Preussin lahja / tsaari / Aarnin luettelo) **15**, ei sanaa **2** (Helsinki, Bryssel). Kaikki 50 on silti kirjoitettava uusiksi, koska ne rakentuvat huoneen etsintään |
| `index.html` (aloitussivun tarinateksti) | **2 kohtaa** | rivit 1303 ("…seitsemästä maanosasta: Meripihkahuoneen aarre") ja 1354 ("luetteloonsa … Meripihkahuoneen, El Doradon ja muut") |
| `js/muutokset.js` v226 | 1 | muutosloki-rivi "Maailmankartan aarrekuulutus ei väitä Meripihkahuonetta" (historiaa; vaihdetaan vain jos muutosloki näkyy pelaajalle) |
| Kaaret (`KAARI_PAKETIT`, 41 elävää + 9 luonnosta) | **0** | kaaren aarre-osat ovat kaupungin paikallisia kätköjä eivätkä mainitse huonetta; luonnosten (#4448) aarteet ovat samoin riippumattomia. Euroopan mysteerin (tuntematon kulkija) ratkaisu on kirjattu vain dokumentteihin ("Meripihkahuoneen aarteen löytymishetkeen") |
| Pulun repliikit | **0** | ei osumia (`pollo.kommentti`, `maakunnat-pulu.js`, `pollo-kysymykset.js`) |
| Diplomi | **0 omaa tekstiä** | käyttää `europe.js star.name` + `star.kuva` -kenttiä; korjautuu niiden mukana |
| Oppaat (`data/oppaan-kuvat/`) | **0** | ei osumia |
| Äänet | ei osumia datatekstissä | aarremerkinnöillä ei ole luentaa (vain `teksti`); fokus-/kaariluennoissa ei sanaa. Äänittäjän kannattaa silti tarkistaa ämpäristä, onko jokin vanha mp3 (esim. aarteen löytö, voittoilmoitus) lukenut sanan |

**Yhteensä pelaajalle näkyvää:** 9 + 2 + 50 + 2 = **63 tekstiä** + 1 aarrekuva (+ muutosloki 1).

## 2. Ei korjattavaa (meripihka aineena, ei huoneena)

Itämeren meripihka on oma aiheensa: ei kuulu vaihtoon, ellei PT toisin päätä. Noin **35 merkkijonoa** (hahmotelmat LVA/CZE/DNK, maastokohteet LTU/AUT, maa-/kulttuuri-kategoriat LTU/AUT/Klaipeda/Kaliningrad, Vilnan tähystäjät ja takyt, Krakovan kauppahalli `kohtaamiskuvat-data.js`, `europe.js`/`maailmankartta.js` **pieniAarre** "Itämeren meripihka" sekä `europe-questions.js`/`placeFacts` Krakova). Huomio: Euroopan pikkuaarre (`pieniAarre`) on **Itämeren meripihka**, ei huone; jos aarteen vaihto muuttaa myös sitä, kysy erikseen.

## 3. Ei pelaajalle näkyvät (päivitettävä kaanoniin Fablen toimesta)

`js/tyohuone-raamattu.js` (3 kohtaa: aarremerkintäsääntö ym.; Raamattu), `docs/tarina.md` (Aarnin luettelo), `docs/isoisan-raamattu.md` (mantereen mysteeri), `docs/raamattu-loki/` (1 tiedosto), `docs/raportit/` (4 raporttia; aarremerkintäteksti-tiedosto poistettu 11.10.), `docs/mantereet-tyoaineisto/` (1), `CONTRIBUTING.md` (1), `tools/aarrekuvat-promptit.md` (kuvapromptit rivit 51 ja 103), `js/tyohuone-tilanne.js` ja `tests/rules.test.mjs` (kommentit meripihkakuvasta). Arkisto jätetään.

## 4. Ehdotettu työjärjestys valinnan jälkeen

1. `europe.js` + `maailmankartta.js` (11 merkkijonoa) ja aarrekuva (Codex/kuvagenerointi omistajan luvalla; ei suojattua teosta).
2. Aarremerkinnät 50 kpl uudella aarteella (malli: sama rakenne, uusi aarre; erinä 10 kaupunkia, faktatarkistus).
3. `index.html` 2 kohtaa; Raamattu-/tarina-kirjaukset Fablelle.
4. Testit: `tests/rules.test.mjs` (aarrekuva/nimi), aarremerkintätestit, `npm test`.
