# Pulun rytmi, karttaväistö ja katseluryhmät — 22.9.2026

## Toimeksianto ja raja

Omistaja pyysi luonnollista nopeudenvaihtelua nykyisiin eleisiin, lisää käyttökelpoista vaihtelua, panoroinnin/zoomauksen aikaisen räpyttelyn korvaamista nopealla poistumisella ja viidellä varovaisella paluulla sekä katselusivulle ryhmittelyn vetolaatikoihin. Ihmismäinen suu on keskusteluehdotus, ei toteutettu ulkoasumuutos.

Haara `codex/pulu-rytmi-ja-vaihtelu-20260922`, työpuu `/Users/samireivinen/Documents/Codex/2026-09-22/pulu-katselu-ja-paikka`. Pohja v2099 `fc651208a9cd8deabc9766ff6245de55197f1ef1` ja erikseen toimitettu sijoittelu `69f9a2e83963066488848034b0fcba48ef86d4c4`. Tämä erä ei muuta sijoittelun CSS:ää.

## Toteutettu

- 34 nykyisen eleen rytmitystä muutettu: valmistautuminen vastasuuntaan, napakka pääliike, pito ja vaimennettu palautus. Nyökkäys ja kielto ovat SVG:ssä jatkuvia liikekaaria pikseliasentojen hyppäysten sijaan. Nokkaisujen osumapaikat säilyvät mutta lähestymisen nopeus vaihtelee. Siiven kohotus häivyttää taitetun siiven ja nostaa avoimen siiven asteittain.
- Selityksellä kolme samaa merkitystä säilyttävää tapaa: osoitus, avoin siipiele ja hillitty katsepainotus. Cue-tunnus ja äänen lähde määräävät tavan deterministisesti; tauko/kelaus ei arvo uutta. Pitkä/lyhyt liikealue ja käynnistyksessä lukittava toistonopeus säilyvät. Manifestin sanat, semanttiset cue-tarkoitukset ja millisekunnit eivät muutu.
- Taustaeleet välttävät kolmea viime elettä. Lehden taustassa on kuusi hillittyä elettä aiemman kahden sijaan; odotuksen pooli kasvaa kuuteen. `facepalm` aktivoituu vain omaa virhettä tarkoittavasta näkyvästä repliikistä. Kaikkia vanhoja gag-eleitä ei otettu satunnaiskäyttöön.
- Cue-rajat tarkistetaan myös jo käyvässä piirtojaksossa, ei vain harvemmassa `timeupdate`-tapahtumassa. Ei uutta rinnakkaista rAF-silmukkaa. Keskeneräinen kelaus, pause, waiting, stalled, vanha sidonta ja purku estävät uudelleenkäynnistyksen.
- Nokan olemassa oleva puheliike seuraa nyt todellista mediakelloa silloin, kun sellainen on käytettävissä. Tämä EI ole äänenvoimakkuus- tai foneemianalyysi; puheen sisäisten hiljaisten taukojen tunnistus on edelleen tekemättä. Ei WebAudio/CORS-riskiä tai uutta äänenhakua tässä erässä.
- Yleisten paluugagien aikarajat: kömpelö lasku vähintään 3 min, lasiin törmäys vähintään 10 min. Karttaväistö ei koskaan valitse näitä.

## Kartan väistö

Kameran todellinen liike (myös inertia) käynnistää 260 ms poistumisen. Pulu on sitten kokonaan poissa. Kameran pysähtymisen 500 ms tunnistuksen jälkeen odotetaan vielä vähintään 3 s; myös kokonaan piilossa vietetty aika on vähintään 3 s. Piilovaiheessa ei ole rAF-animaatiota, vain yksi peruttava paluukello ja ennestään ollut kameravahti.

Paluut vuorottelevat viiden läpi: sivukurkkija, kaksi tarkistusta, matala liuku, pieni korkea kaari sekä nyökkäys ja kaksi askelta. Ensin piirtyy vain pää ruudun oikeassa reunassa. Kurkistus kestää 650–1100 ms, paluu 680–900 ms. Radat ja painotukset eroavat, mutta kaikki päättyvät samaan ankkuriin. Uusi liike kurkistuksen tai paluun aikana piilottaa heti ja aloittaa rauhoittumisajan uudelleen.

Puhe, luenta, chat, kortti/dialogi, pullapalkinto, kohtauslento, taustalle siirtyminen ja reduced motion syrjäyttävät väistön. Kuuntelevaa tai puhuvaa Pulua ei viedä pois kameran vuoksi. Reduced motion käyttää olemassa olevaa rauhallista staattista käytöstä eikä näitä lentoja. Vanha leijunnan SVG-piirtotuki jäi yhteensopivaksi, mutta peliohjain ei enää käynnistä sitä kartan liikkeestä.

## Katselu

`docs/livia-svg.html` käyttää natiiveja `details/summary`-vetolaatikoita jokaiselle eleryhmälle. Ensimmäinen **Uudet ja päivitetyt** on aluksi avoinna: 34 muutettua elettä + 5 karttapaluuta. Valinnan tila näkyy painikkeissa, vanha pudotusvalikko säilyy. Selityseleelle voi valita 1,5 s / 6,2 s ja kolme muunnelmaa. Karttaväistön katselu on merkitty liike-esikatseluksi, ei aidon kameran testiksi.

Paikalliset katseluartefaktit (ei tuotantopelikuittia):

- `/Users/samireivinen/Documents/ChatGPT/Matkakirja 2/output/pulu-rytmi-20260922/pulu-katselu.html` — itsenäinen HTML, ei palvelinta tai verkkohakuja animaatioiden näyttämiseen.
- Samassa hakemistossa `rytmi-vertailu.mp4` (neljä pohja/uusi-vertailua), `viisi-karttapaluuta.mp4` ja `karttapaluut-kontakti.png`.
- SVG-kontaktin visuaalisessa tarkastuksessa päärajaukset, viisi erilaista paluurataa ja loppupaikat erottuvat. Tämä ei varmista Safari/iOS-kompositointia eikä aidon pelin paneelikerroksia.

## Valmiit pohjat ja suunnitteluratkaisu

Tutkittu viralliset [GSAPin easing- ja CustomEase-ohjeet](https://gsap.com/docs/v3/Eases/CustomEase/) sekä [Motionin spring-ohje](https://motion.dev/docs/spring). Ne tarjoavat käyttökelpoisia kiihtyvyys-/hidastus- ja vaimennusmalleja, eivät valmista tämän hahmon elekirjastoa. Toteutus käyttää omia pieniä avainpistekäyriä nykyisessä media-aikaan sidotussa rendererissä; ei kopioitua ulkopuolista animaatioaineistoa tai lisäriippuvuutta.

## Varmennus ja jäljellä oleva portti

- `node --test --test-reporter=tap tests/livia-*.test.mjs`: 240/240 PASS.
- Koko sarja: 3934 testiä, 3921 PASS, 13 SKIP, 0 FAIL.
- Kaksoisavaimet, niputus, savukevartija, nimiöpäällekkäisyydet, diff-check PASS; nimiötarkistimen 56 nimiö–symboliosumaa ovat ennestään tiedoksi luokiteltuja.
- `node tools/build-standalone.mjs` PASS; generoitu dist ei toimitukseen.
- Aidon ohjaimen testit: kartan inertia, vähintään 3 s poissaolo, kurkistuksen keskeytys zoomilla, viiden paluun kierto, chat piilovaiheessa, prioriteettien peruutus, ei ajastinvuotoa. Lisäksi rAF→cue-rajapinta ja mediakelloon sidottu nokka, ilman `timeupdate`-tapahtumaa.
- Gallerian oma JS suoritetaan DOM-sovittimella: kaikki 70 valintaa, kaikki ryhmät, päivitettyjen lista, viisi paluuvalintaa ja reduced motion. Ei väitetä selaimen ulkoasuhyväksynnäksi.

Avoin ennen tuotantohyväksyntää: omistajan liikkuva katselmus, aidon pelin desktop/mobiili-panoroiminen ja zoomaus, Safari/iOS sekä paneelien/safe-alueiden tarkistus. Ei versionnostoa, mergeä, tuotantojulkaisua, maksettua ääni-/alignment-ajoa, teksti- tai asustemuutosta. Uusia kuvia ei tarvita. Julkinen katselusivu muuttuu vasta tämän erän julkaisun jälkeen.
