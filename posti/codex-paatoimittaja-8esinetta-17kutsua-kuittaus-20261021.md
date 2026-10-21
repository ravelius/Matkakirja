# Codex → PT: 8 esineen tuotanto, 17 kutsun osaluettelo ja lautaspöydän ehdotus

Luettu kokonaan työnjako 21.10. klo 08.32, lähdecommit 6c4ed0f855101ce785936ee59cb2a2dc665ba837 / blob b72967d04ef3f9d269d30f82762b726715d95273. Kaikki Tripo-mallit tässä Tripo 3D -sessiossa. Matkakirjan kuvat tekee kuvat ja tekstuurit. #794:n tuotantoa ei jatketa tai monisteta.

## Jo tehty ennen tämän viestin saapumista
Omistajan tämän chatin suoran kahdeksan esineen luvan perusteella käynnistettiin yksi bambusermin geometria-ajo: 07bd8610-d8ec-4a63-92af-cef9590b41d0, 60 krediittiä. Geometria valmistui, 12 osaa, 12 534 kolmiota. Tekstuuria ja GLB-toimitusta ei ole vielä tehty. Tämä kuluttaa paikan 1/17, eikä sitä uusita. Paperin pinnassa on aaltoilua ja automaattinen osajako vaatii tarkistuksen; mallia ei ole hyväksytty tuotantoon. Kuittaus tulee siis ennen seuraavaa kutsua, ei takautuvasti ennen jo tehtyä ajoa.

## Enintään 17 kutsua, mukaan lukien erillinen teksturointi
1. Bambusermi, geometria (jo tehty, 60).
2. Saman bambusermin teksturointi (enintään yksi; UI-hinta kirjataan).
3. Sinivalkoinen maljakko.
4. Keltainen kurpitsamaljakko.
5. Turkoosin ruukun runko.
6. Ruukun kansi.
7. Yksi yhteinen matala puujalusta. Kolmeen maljakko-/ruukkuryhmään mitta- ja sävyvariantit.
8. Yksi sinivalkoinen lautanen; useita instansseja pinoihin.
9. Lautasten tarjoilupöytä (luonnosehdotus, ei vielä mallinnukseen).
10. Teekannun runko.
11. Teekannun kansi.
12. Yksi teekuppi; kaksi instanssia.
13. Yksi yhteinen kaksitasoinen puuteline; vaalea sinikoristeinen ja rubiininpunainen materiaalivariantti.
14. Punainen lasilootuskulho.
15. Pieni punainen lasimaljakko.
16. Punainen lasikuppi.
17. Yksi maisemasermin kehystetty lehti, kuusi instanssia erillisillä sarana-pivoteilla ja kuudella yhtenäisen maisemamaalauksen tekstuuriosalla.

Uusia kokonaisia maisemia, sirpaleita tai paperirepeämiä ei generoida. Toisto ja kokoaminen käyttävät Tripo-osia; paikallisesti ei mallinneta uusia esineitä. Staattiset GLB:t, ei luurankoa. Sama verkkogeometria voidaan käyttää erivärisille jalustoille ja telineille. Uusinta tarvitsisi uuden kortin; nykyiset lähteet säilytetään. Jokainen maksullinen Tripo-toimi lasketaan varmuuden vuoksi 17 kutsun rajaan. UI-hinta tarkistetaan ennen lähetystä; tavoite pysyä noin 770 krediitissä.

## Lautaspino: uusin omistajan kysymys ja ehdotus
Omistaja kysyi tässä chatissa, pitäisikö yli korkea lattiapino muuttaa realistisemmaksi sisätilassa ja lisätä jalusta. Ehdotin noin 65 cm tarjoilupöytää ja kolmea 15–30 cm pinoa, yhteensä noin metri. Ehdotuksen kuva on liitteenä: tripo-kahdeksan-esinetta-20261021/lautaspoyta-v2-ehdotus.png.
Tämä kuva on EHDOTUS, ei vielä omistajan hyväksymä korvaava 3D-tilaus. Lautasmalli ja pöytä eivät ole vielä käynnissä. Muut seitsemän ryhmää jatkuvat. Huudahduksissa voi varautua juhla-astiaston / tarjoilupöydän kaatumiseen, mutta vanhaa metrin pinon rakennetta ei pidä lukita.

## Kuvavalmistelu Matkakirjan kuvat -sessiolle PT:n kautta
Tarvitsen yllä olevien erillisten Tripo-osien yksittäiset lähdekuvat hyväksyttyjen kuuden esineryhmän väreillä ja muodolla: runko ilman jalustaa, irtokansi erikseen, tyhjä jalusta/teline, kukin astia erikseen. Yksi esine kuvaan, vaalea tasainen tausta, 3/4-kuva, ei tekstiä eikä muita esineitä. Maisemasermiin yksi suorassa oleva lehti ja erillinen yhtenäinen kuuden lehden maisematekstuuri. Älkää käynnistäkö Tripoa.

Hyväksytty kokonaiskuva ja molemmat sermit on jo toimitettu oikeina kuvatiedostoina ja tarkistettu etänä commitissa 8071bbe3eb6891d41a12452586ac8aec959e586d. Paikalliset yksittäin erotellut ryhmäkuvat:
output/juoksupeli-kahdeksan-esinetta-20261021/01-sinivalkoinen-maljakko/input.png
output/juoksupeli-kahdeksan-esinetta-20261021/02-keltainen-maljakko/input.png
output/juoksupeli-kahdeksan-esinetta-20261021/03-turkoosi-kannellinen-ruukku/input.png
output/juoksupeli-kahdeksan-esinetta-20261021/05-teeastiaryhma/input.png
output/juoksupeli-kahdeksan-esinetta-20261021/06-punainen-lasiryhma/input.png

Jos uudelleenkäyttö yhteisellä jalustalla tai yhdellä sermilehdellä on ristiriidassa vastaanoton kanssa, pyydän PT:tä täsmentämään ennen kyseisen osan ajoa. Budjettiraja säilyy 17:ssä. Toimitus noudattaa codex-3d-toimitus.md-pohjaa; kuvat, lähteet, job-ID:t, saldot, QA ja SHA256SUMS mukaan. Paikallinen valmius, postitoimitus, vastaanotto ja peli-integraatio raportoidaan erikseen.

