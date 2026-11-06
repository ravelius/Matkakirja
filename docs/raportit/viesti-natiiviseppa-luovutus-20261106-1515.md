# Natiivisepän luovutus 6.11.2026 klo 15.15 (konteksti 30 %, 7.37)

Korvaa -1440:n Tila- ja SEURAAVA TYÖ -kohdat. -1440:n "Kerrottu, ei NS:n työtä" ja "Huomiot" pätevät, samoin kuin sen luettelemat vanhemmat osat. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Remote Controlia en kytkenyt tässä sessiossa, koska työkalu vaatii omistajan pyynnön.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, V = P/valmis-jalki2. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, peili natiivi-backup.

## Tila
- Haara natiiviseppa/palikka-koe 2bfb126b0 (peilissä), työpuu puhdas. Mittari: 4d81046e3 + eräajokorjaus 2bfb126b0. Tyyppitarkistus 0 virhettä (V/tyyppitarkistus.zsh tarkistaa V:n kopion PalikkaKerros.cs:stä; se on nyt sama kuin työpuussa).
- Komennot: palikat jalki <nimi> <s> (piirretty kamera piirron alussa: paikka, kierto, näkymämatriisi, katsepiste, renderScale, varjo, kutsut, kolmiot), palikat ero <nimi> <s> (kuvaero 1024×768 ruudun keskeltä), palikat sarja <nimi> <s> (sama + JPG:t Documents/palikkasarja-<nimi>), palikat varjot 0|1. Lukijat V/jalki2.py ja V/sarja.py, ajamatta oikealla datalla.
- JU:lla: MAC-11B 2bfb126b0 (P/sk-mac-11.txt, lokit natiiviseppa-tarina-mac11b-2bfb126b0). Eräajossa vain jälki, ja se lukee kameran laskettuna, ei piirrettynä; ero ja sarja ohitetaan. Mac-11 ei tuottanut mitään: eräajossa kamera ei piirrä itsestään eikä kehyksen loppu tule (pääteltu lokista).
- JU:lla: IPAD 3B 190448df6 (P/ajopyynto-ipad-3b.md, lokit natiiviseppa-palikka-ipad3b-190448df6, alkaa 15.12 jälkeen, tallessa olevalla käännöksellä lokit/julkaisija-laite-218-190448df6). Tulos tulee viestinä tälle session-id:lle, älä pyydä uudelleen.
- Laitteelle jää v9-talot (351 Mt, Documents/talopalat) ja palikka-korvaus: devicectl ei poista kansioita, JU ei poista sovellusta ilman PT:n sanaa, rungossa d092f48cc ei JU:n mukaan ole viittausta niihin. KERTOMATTA PT:lle ja KK:lle, kerro seuraavassa tulosrivissä.

## Mitattu tähän asti
- iPad 1–3 mitattiin ilman nykyisiä taloja: Documents/talopalat puuttui (loki "aineisto puuttuu"), KA0 = A0 (kolmiot samat). Korvauksen hintaa ei ole. PT:llä ja KK:lla.
- iPad 3 keskeytyi 14.56 JU:n ehtovirheeseen ("korvattuja 0" osui riviin "korvaus pois, korvattuja 0"). Koodia 3, josta KK kysyi, ei ole todennettu itse. Tallessa A0|A0, jälki r4-ipad, KA0 kesken: lokit/natiiviseppa-palikka-ipad3-190448df6.
- TÄRINÄ, omistaja 14.48, iPad 3, r4, palikat pois: kehysaika tasainen siihen aikaan (ruutu p95 16,85 ms, GPU 12 ms). r3:n zoomiraja ei lauennut (0 varoitusta). Vanha jälki lukee kaksoistarkkuuden laskuarvot eikä näe floatia, joten Macin sileä jälki ei todista kameraa. iPad 3:n r4-jälki otettu GPU:n noustua: 35 % kehyksistä 25 ms, nykäys p95 0,58 m, mutta tasaisella dt:llä 0,08 m. Kylmää jälkeä ja piirretyn kameran arvoja ei ole.
- EPÄILY, EI TULOS: Pallo.unity TrueOrigin, skaala 1, PalloKierto.cs:2421–2422 pyöristää silmän ja katsepisteen float3:ksi (KK huomasi katsepisteen). Float-askel Pariisissa 0,5 m kahdella akselilla. P/float-malli.py on laskelma. Vaikutus kuvaan mittaamatta.
- GPU ILMAN PALIKOITA, oma löydös (PT), ei palikkakokeen hinta: A0 8 min GPU 12 → 32 ms porrastaen (jakso 16 noin 15, jakso 20 noin 31), ruutu p95 16,9 → 25,3, 60 → 53 kuvaa/s, thermal 0 kaikilla 23 lampo-rivillä, kolmiot ennallaan. Loki kertoo vain lämpötason, ei GPU:n kelloa; Normaali ei sulje rajoitusta pois (PT).

## SEURAAVA TYÖ, järjestyksessä
1. MAC-11B: aja V/jalki2.py palikkajalki-r4-2.csv:lle ja vedoille. Tarkista, että sarakkeet täsmäävät (kx ja m00–m23 eivät tyhjiä, kameran |p| noin 6,37 milj. m varmistaisi origon). Tämä on koestus, ei tärinän tulos. Jos kelpaa, päivitä V/ajopyynto-ipad-4.md:n kärki 4d81046e3 → 2bfb126b0 ja pyydä iPad 4 JU:lta iPad 3b:n jälkeen, lokit natiiviseppa-tarina-ipad4-2bfb126b0.
2. IPAD 3B -TULOS (kuten -1440:n kohta 1): KK:lle todellinen hinta A0|KA0, A0|KB2, Forward+ A0|A1, Tripo-puu B2L|B2T, täysikokoinen p3-puut; jos kuva ei osunut, sano se. PT 14.4x: vain kokonaisluvut, ei väitteitä lopullisesta hinnasta ennen kuin nykyiset talot on rajattu pois. Kerro palikkakoe-riveiltä, missä jaksossa GPU-porras tuli, koska parit sen jälkeen ovat vain keskenään vertailukelpoisia. Uusi jälki r4-ipad-b on kylmä: vertaa dt:tä ja nykäystä iPad 3:een.
3. IPAD 4 -TULOS, yksi rivi PT:lle ja KK:lle:
   - Tärinä: kameran liike, kehysaika ja piirron väre eroteltuina: jalki2.py (float-askel, nykäys, kierto, HEITTO px kameran omalla matriisilla), ero paikka-2 ja paikka-v0 seisovalla kameralla, r4 ja pelin oma veto itään ja pohjoiseen (KK: koskeeko pelaajaa).
   - Nähty kuvista (KK 15.00, omistaja "muutaman sekunnin pätkä näyttää"): V/sarja.py <kansio> <gif> kaukaisen kohdan paikka ruudulta toiselle; säädä ala kohtaan, jossa on kaukaista kuvaa. Pätkä KK:lle, EI omistajalle (ei videoita 6.11. 09.28).
   - GPU, osa 2: paikka vs aika. Kasvaa paikallaan = kertymä; seuraa paikkaa = rata; palautuu 10 min:n tauolla sovellus auki = viittaa lämpöön tai laitteen rajoitukseen (KK 14.57). Lue myös lampo-rivit ja muistivahti.log.
4. EI KORJAUKSIA ennen näitä tuloksia (PT 14.5x). Jos origo osuu: ehdotus PT:lle, ei omaa toteutusta.
5. C1 ja D2 -1247:n kohdan 6 mukaan, jos PT ei toisin sano.

## Opit
- Eräajossa ei ole automaattista kameran piirtoa eikä WaitForEndOfFrame-paluuta: piirtoon sidottu mittari on koestettava laitteella. JU ei aja ikkunatilaa.
- Ajopyynnön keskeytysehdoissa nimeä täsmärivi: "korvattuja 0" osui normaaliin paluuriviin.
- Tarkista lokista, että kokeen edellyttämä aineisto on laitteella, ennen kuin luet parieroja.

## Huomiot
- Komennot ja kansiot: V/ajopyynto-ipad-4.md alkaa komennolla talot 0, koska v9-talot jäävät laitteelle ja omistajan havainto oli ilman taloja. Kuvasarjat jäävät myös laitteelle.
- Sarja vie muistia ja taustasäikeitä, joten kuvasarjan aikainen dt voi poiketa: vertaa saman jäljen dt:tä ilman sarjaa (r4-ipad-b).
