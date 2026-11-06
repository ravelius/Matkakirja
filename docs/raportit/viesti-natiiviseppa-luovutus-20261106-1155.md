# Natiivisepän luovutus 6.11.2026 klo 11.55 (konteksti 31 %, pehmeä raja, 7.37)

Korvaa -1145:n SEURAAVA TYÖ:n kokonaan ja -1140:n kohdat 2 (Mac-ajo) ja 3. Muu -1140 pätee (haara natiiviseppa-luovutus-1140: mitä koodissa on, avoimet, opit, huomiot). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
1. PALIKKAKOE MAC-2 ODOTTAA JU:TA. Haara natiiviseppa/palikka-koe 783d4c86c (peilissä), skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe/sk-mac-2.txt, lokit lokit/natiiviseppa-palikka-mac2-783d4c86c. Tulos tulee NS:lle viestinä; älä pyydä uudelleen.
   - Mac-1 (lokit/natiiviseppa-palikka-mac1-2aa245334) kääntyi, 0 shader- ja C#-virhettä, mutta kuvissa EI ole palikoita: c-* ovat tavulleen samat, m-nyt | m-b2 eroaa vain kyyhkyissä (palikkakoe/ero-mac1.py, selvitys-mac1/).
   - Korjaus 783d4c86c, kääntämättä ja näkemättä: (a) PalikkaKerros piirtää beginCameraRendering-kutsussa, koska Esikatselu.cs:n kuva kutsuu kamera.Render() EditorApplication.updatessa LateUpdaten jonon jälkeen. Mekanismi päätelty koodista, EI mitattu. (b) TaloKerros vapauttaa ladatut palat kansion vaihtuessa (kerros ei poistanut niitä); kesken oleva lataus hylätään. (c) Concorden väri 61e6bdcfe:stä, vain se rivi. (d) FindAnyObjectByType.
   - Kun tulos tulee: loki (palikat tila, ruudunpaivitys Taysi), m-* ja c-* täysikokoisina; pari nykyinen | palikka, kohde kokonaan. KK katsoo ensin, tiivistys PT:lle. Jos palikat eivät vieläkään näy, kysymys on auki: tarkista worldBounds, kerros 0 ja kameran cullingMask ennen uutta ajoa.
   - TARKISTA MITTARI: mac-1:n jaksorivillä kutsut 16,9 ja kolmiot 3 182, mutta omatKutsut 74,8 ja omatKolmiot 932 043. Kokonaismittari ei voi pitää paikkaansa, syy auki. PT:lle kerrottu. Korjaa ennen iPad-ajoa, jos sama toistuu; suurinP95Ero ei riipu siitä. Mac-1:n aikaero B3−B2 ei ole tulos, koska piirtoa ei ole todennettu.
   - Sitten -1140 kohta 2: iPad vasta Mac-kuvien jälkeen, isolla iPadilla, lukolla, JU:n vuorolla. Omistaja (PT 11.4x): nopeusmittaus isolla riittää, pieni vain kahteen rinnakkaiseen ajoon; kirjasto alkaa Euroopasta ja moskeijasta.
2. PALAT-V10 ON TEHTY: _tyo/natiiviseppa/pariisi-talot/palat-v10-louvre-halles, kansio-sha 3013995533fc3106, tee-palat.py 00addcdf24cf78e2 (uudet valinnaiset avaimet _taloksi, _pois, _leikkaa siisti-jsonissa; oletus ennallaan). Syötteet palat-v10-syote/, skriptit tee-palat-v10-*.
   - Sha viety KS:lle (viesti jonossa, KS nollautui: tarkista list_eventsistä, että seuraaja sai sen) ja KK:lle. Ei omaa ajoa, ei junaan. KS:n ajo 9b ja 10 käyttävät vielä v9:ää; v10 tulee seuraavaan yhteiseen.
   - Voimassa KK 11.43: puiston 6 palaa pois samassa versiossa. KS:n viesti "jäävät v10:ssä" oli vanhempaa tietoa; oikaistu KS:lle.
   - Palais-Royal relation/3300400: kokonaisena lävisti mallin (1 567 px eli noin 2 450 m²). Leikattu suoraksi mallin pohjoisreuna + 8 m:n linjasta, 14 337 → 10 549 m², OMA RATKAISU, KK:lle kerrottu, odottaa kuvaa. Jos muoto ei kelpaa, jäljelle jää paluu maskiin.
   - Tarkistus selvitys-yhteinen/v10-tarkistus.py: lävistäviä 0, lähin talo 6,2 m, Palais-Royal 6,7 m rasterilla; talot +2, −6; muuttuneet palat vain 15_16596_11272 ja 15_16597_11272; tarkista-palat 0 virhettä.
   - Katso KS:n ajosta: Palais-Royal'n etelämuuri; Forum; Canopée ja way/630213860 sama kattotaso 14,9 m ja noin 104 m²:n päällekkäisyys, välkkyykö.
   - Louvren pohjan alfa (KS) peittää yhä aukon; KS päättää. Mallia koskevat muut talot (Ministère de la Culture, Hôtel du Louvre ym.) jäävät maskiin.

## Opit
- Ennen maskin avaamista mittaa koko talon lävistys: keskipistetesti palauttaa koko talon, ei vain avattua osaa.
- Graphics.RenderMesh* LateUpdatessa ei tule kuvaan, joka otetaan kehyksen ulkopuolisella kamera.Render():lla (päätelty). KaupunkiPuut piirtää myös LateUpdatessa: sen näkyminen KS:n kuvissa on tarkistamatta, ei tehty.
- Kuvatiedostojen sha ja pikseliero ensin: se paljasti mac-1:n heti, ennen kuvien arviointia.
- list_events ei näytä lähetettyjä viestejä; ne löytyvät toisen session .jsonl:stä (skripti: selvitys-yhteinen/-kansiossa ei ole, kirjoita tarvittaessa uudelleen: etsi input.session_id = oma id).

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja (-1140).
