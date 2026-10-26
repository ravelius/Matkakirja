# Pelikoodarin luovutus 22.9.2026 (yö 2, klo 21.45)

Työhakemisto `/Users/samireivinen/Matkakirja-pelikoodari` (rooli-worktree;
erät omiin haaroihin temp-worktreissä `/Users/koodaus/wt-pelikoodari-*`).
Node 22: `node --test "tests/*.test.mjs"`. Savukkeet paikallisesti:
`CHROMIUM="" PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js NODE_USE_ENV_PROXY=1 SAVUKE_MOOTTORI=webkit node tools/savukkeet/<x>.mjs`.
Edellinen luovutus: `viesti-pelikoodari-luovutus-20260922-ilta2.md`.

## ⚠ ENSIN: peli ei käynnisty omistajan iPhonella v2126:lla

Omistaja: **tyhjä runko**, peli ei käynnisty. Fable ei toista sitä
emuloinnissa (työpöydän WebKit). **Kaikki mergeet ovat jäissä, kunnes syy
on selvä.** Epäillyt, todennäköisyysjärjestyksessä:

1. **Laitteelle tallennettu piirtokoe tai kehysprofiili.** v2125 toi
   ratasvalikkoon Piirtokoe-listan ja "Näytä kehysprofiili" -kytkimen;
   valinta tallentuu (`localStorage`: `matkakirja-piirtokoe`,
   `matkakirja-kehysprofiili`) ja **vaikuttaa jokaisessa käynnistyksessä**,
   myös tallennetun pelin suorassa jatkossa laudalle. Omistaja on
   todennäköisesti valinnut jonkin kokeen puhelimella. Huomaa sivuvaikutus:
   `piirtokokeet()` palauttaa nyt myös tallennetut liput, joten MIKÄ
   TAHANSA valittu koe asentaa `__kehysprofiilin` (lauta.js:
   `if (ablaatioPaalla() || piirtokokeet().size) asennaKehysprofiili(...)`),
   joka käärii `window.requestAnimationFrame`in ja `renderer.render`in
   koko istunnon ajaksi. **Tarkista ensin:** kysy omistajalta valinta, tai
   anna ohje nollata avaimet; harkitse pakotietä `?piirtokoe=normaali`,
   joka tyhjentää valinnan ennen moduulien latausta.
2. **Service workerin moduuligraafi iOS:llä.** v2124–v2126 toivat uusia
   moduuleja ja uusia nimettyjä tuonteja olemassa oleviin
   (`tallennetutKokeet` → js/pallolaatat.js ja js/pallolauta/kerrokset.js;
   `luoAlfatonKonteksti`/`kankaanTausta` → js/pallo.js). Jos iOS ajaa
   sekaisin vanhaa ja uutta tiedostoa (esim. välimuistista vanha
   pallolaatat.js, verkosta uusi main.js), koko ES-moduuligraafi kaatuu
   `Importing binding name ... is not found` -virheeseen → tyhjä runko.
   Tarkistettu: kaikki uudet moduulit ovat sw.js:n SHELL-listalla, ja
   asennus käyttää `cache: 'reload'`. **Tarkista:** Macin Safarin Web
   Inspector -ohje (#2846) ja puhelimen konsoli; tai tyhjennä sivuston
   tiedot puhelimelta ja kokeile uudelleen — jos se korjaa, syy on SW.
3. **v2126:n muutokset käynnistyspolulla**, jossa tallennettu peli jatkuu
   suoraan laudalle (`rakennaPallo`, js/pallo.js):
   - `rendererConfig`issa spread `...(eiAlfaa ? {...} : {})` — ilman
     lippua tyhjä, mutta jos alpha0 on tallennettu (kohta 1), v2126:ssa
     se asettaa vain läpinäkymättömän taustan (`kankaanTausta`), ei vielä
     omaa kontekstia (se on #2849/#2850:ssä, joka EI ole tuotannossa).
   - js/pallolaatat.js: `laattakerroksenKokeet(haku)`in oletusparametri
     muuttui (`haku === undefined` → yhdistää tallennetut liput);
     `vahemmanDc` luetaan kerroksen luonnissa.
   - Kumpikaan ei kaada selaimessa ilman lippua (savukkeet ja
     paikalliset ajot vihreitä), joten epäily kohdistuu siihen, mitä
     puhelimessa on tallennettuna (kohta 1) tai välimuistissa (kohta 2).

## Avoimet PR:t (kaikki odottavat syyn selviämistä)

| PR | haara | sisältö | tila |
| --- | --- | --- | --- |
| #2849 / #2850 | `pelikoodari-alpha-aito2` / `julkaisija-julkaise-alphaaito` (v2127) | **alpha0 aito:** kangas + WebGL2-konteksti luodaan itse, koska three r185 luo kontekstin aina `alpha: true`; vartija `savuke-piirtokokeet.mjs` (P1–P4, paikallisesti 7/7) | **Pidätetty**: CI:n WebKit-launch-vika (alla), ei koodivika |
| #2851 | `pelikoodari-profiili-jakaa` | Ruutunäyttö ei katkaise mittauspalvelimen otosta: `kehysprofiili.otos(ms)` + `kaynnissa()`, ruutunäyttö ottaa viipaleen eikä sulje mitään | valmis, 3983 testiä vihreä |
| #2853 | `pelikoodari-eivienti-laatat` | `eivienti` kattaa laattojen tekstuurit (samaa porttia kuin `vientilepo`); overlayn "laattavientejä" laski ennen päivityksiä | valmis; mitattu WebKit: vedossa 39 → 0 vientiä |

## CI:n WebKit-vika (ei koodi)

`browserType.launch: Timeout 180000ms exceeded` — `pw_run.sh --headless`
käynnistyy (pid syntyy), mutta yhteys ei aukea. **Sama 11 WebKit-savuketta
on kaatunut JOKA ajossa klo 16.44 UTC (19.44 paikallista) alkaen**, myös
ennen alpha0:aa; klo 16.13 UTC ajossa niitä ei ollut. Paikallisesti ja
sarjana ajettuna samat savukkeet menevät läpi samalla sha:lla
(glnimiot-nimet 7/7, lepopiirto 12/12, hehkupiste 6/6 — Laitetestaaja
vahvisti). Laitetestaaja selvittää ajurin ympäristöä (rinnakkaisuus 6,
jumittuneet Playwright-WebKit-prosessit, GUI-istunto).

## Tämän illan tuotantoon menneet (v2122–v2126)

| versio | sisältö |
| --- | --- |
| v2122 | `?koe=profiili`: overlay + POST `/__profiili` seuraamisvirhe-palvelimelle, rAF-tahti ja piirto-osuus |
| v2123 | **iPhonen nykimisen juurisyy:** lepopiirto ohitti vedon aikana kehykset, joihin ei osunut pointermovea (iOS ei tahdista sitä rAF:iin), ja kaikki syötetavat ajetaan juuri siinä tickissä → 0/2-kuvio. Ele ja liuku ovat nyt lepopiirron este. Vartija V7 vetää joka toiseen kehykseen (vanha tasaisuusveto EI paljastanut vikaa). |
| v2124 | Profiilin rollaava ikkuna kasvatti rAF-ketjujen määrää: Tasaisen "500 Hz" oli mittarin vika |
| v2125 | Ratasvalikkoon Piirtokoe (Normaali, eipuskuri, dpr15, eivienti) + "Näytä kehysprofiili" |
| v2126 | alpha0 (vain tausta, ks. #2849) ja vahemmandc (dc 22 → 18) |

## Mittausten tulkinta (Laitetestaajalle kerrottu)

- `puskurikirjoituksia` ja `laattaVienteja` ovat **kumulatiivisia**;
  kehystä kohti luku = jakson erotus / kehysmäärä (overlay laskee niin).
  Mac-mittauksen 69–111 "per kehys" olivat summia. Oikeasti (WebKit):
  normaali 0,07/kehys (9 rakennusta 120 kehyksessä), eipuskuri 0.
- Omistajan v2123-kaappaukset: rAF 56–63 Hz, piirto 100 %, mutta dt p95
  50 ms ja pitkät kehykset PIIRRETTYJÄ, js ≈ 0, render ≈ 0,2 ms → aika on
  GPU:ssa/komposiittorissa (Safarin GPU-prosessi). MSAA (Kokeellinen) ei
  ollut syy. Piirtokokeet on tehty juuri tämän rajaamiseen.

## Uusi sessio tekee ensin

1. **iPhonen käynnistysvika** (yllä, kohta 1 → 2 → 3). Älä mergeä
   mitään ennen kuin syy on selvä.
2. Kun syy on selvä: #2851 ja #2853 mergeen (Julkaisija), #2850 kun CI:n
   WebKit toimii tai Julkaisija päättää ohittaa sen paikallisilla ajoilla.
3. Laitetestaaja mittaa eivientin uudelleen #2853:n jälkeen.

## Opit

1. **Mittari voi valehdella hiljaa.** Kolme kertaa tänä iltana luku
   kertoi muuta kuin nimi lupasi: rollaava ikkuna kasvatti ketjuja,
   "laattavientejä" laski päivityksiä, harness luki kumulatiivista
   laskuria. Kun luku on mahdoton (500 Hz, 87 kirjoitusta/kehys), epäile
   mittaria ennen peliä.
2. **Vartijan on tuotettava vian olosuhde.** Tasaisuusmittarin veto
   lähetti tapahtuman joka kehyksellä eikä siksi voinut nähdä vikaa,
   joka syntyi kehyksistä ILMAN tapahtumaa. Todenna aina, että uusi
   vartija kaatuu vanhalla koodilla.
3. **Tallennettu asetus on käynnistyspolkua.** Kaikki mitä valikko
   tallentaa, ajetaan jokaisessa käynnistyksessä — myös kokeet, jotka on
   tarkoitettu vain mittaukseen.
