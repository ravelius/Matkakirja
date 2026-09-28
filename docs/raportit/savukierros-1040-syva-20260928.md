# 1.0.40-juna syväsavuke A/B/C (Laitetestaaja, 28.9.2026 klo 23.0x)

Käännös 1ad1c538 (juna/b13 b3001497), laite 1572C658 (iPhone 18 Pro). Natiiviseppän ohjeiden
mukainen kierros. FB234D08 (Natiivi-UI) käynnissä samaan aikaan — vain oma laite bootattu.

## A) Thessalia + Maapallon vuosi -linssi (aa203879): PASS + 1 UUSI LÖYDÖS
1–4 PASS: karttaselite auki (`mk-seliteNappi` 372,98 pt), maakunnat-tila oletuksena päällä,
   napautus Thessaliaan (120,340 pt) värjäsi VAIN Thessalian ja näytti Meteora-tekstin oikein.
   `linssi maapallon-vuosi` (kehittäjätilassa) avautui **ilman** nostomerkkejä ja ilman hehkua —
   puhdas NASA Blue Marble -pallo, kuten piti. `linssi pois` ei jättänyt irrallista hehkua kartalle.
   Korjaus aa203879 toimii tältä osin.
5. **FAIL (uusi löydös)**: kun maakuntakartta oli päällä (Thessalia valittuna) ja ajoin
   `uusi-peli 1 ateena`, maakuntakartta **EI sulkeutunut** — `mk-selite--maakunnat mk-auki` jäi
   päälle, vihje "Napauta maakuntaa kartalla." näkyi edelleen, ja tavalliset nostomerkit
   (kaupungit/nähtävyydet) EIVÄT palautuneet (`ui puu`: 0 `nosto-merkki`-elementtiä). Kuva:
   selite-paneeli peittää kartan yläosan, kartalla ei nimiä eikä merkkejä paitsi matkalaukkupinni.
   Karttaselite.Nollaa() ei siis nollaudu `uusi-peli`-komennolla silloin kun maakuntakartta oli
   auki ennen sitä. Linssiseppä 2:lle/Natiiviseppälle tarkistettavaksi.

## B) ISS-kyyti Cupola (616dd193) + terävät pilvet (cc513896): PASS (visuaalinen, ei täydellistä LIVE-vertailua)
`linssi satelliitti` + `astro kyyti` → "Seuranta" tila saavutettiin. "Lennä kohteen ylle…" →
Santorini → Cupola-ikkuna avautui, pilvet terävinä/selkeäreunaisina ikkunan läpi, metallikehyksen
syväterävyys/sumennus näytti tarkoituksenmukaiselta (etuala pehmeä, kaukomaisema terävä) — ei
enää raskasta koko-kuvan sumennusta kuten 1.0.37:ssä kuvailtiin. LIVE-nopeudella osui yöpuolelle
(pimeä), joten suoraa päiväpuolen LIVE-vertailukuvaa ei saatu — nopeutetun (5600×) näkymän
kuvakaappaus riittää kuitenkin osoittamaan pilvien terävyyden. `astro kyyti pois` + `linssi pois`
sulki siististi.

## C) Ateena-aloituslento (v3f4): EI TODENNETTU — kaupunkivalinnan napautusta ei löytynyt
`lento v3 aloitusrata 1` asetettu, sovellus käynnistetty uudelleen, "Uusi matka" → avausteksti
eteni oikein (Livia/Pulu-dialogi). Kaupunkivalintakartalla (Moskova/Istanbul/Ateena/Kairo-ympyrät)
**`ui puu` ei näytä näitä elementtejä lainkaan** (sama tunnettu rajoitus kuin "UITK-napit eivät
näy ui-puussa" -muistiossa) — jouduin arvioimaan napautuskoordinaatit kuvakaappauksesta. Kolme
yritystä eri kohtiin (myös selvästi erillinen Kairo-ympyrä, iso kohde) eivät osuneet mihinkään —
kello vain tikitti eteenpäin reaaliajassa riippumatta napautuksista. Napautusalue on ilmeisesti
paljon pienempi kuin näkyvä ympyrä, tai vaatii eri interaktion. **Tarvitsen Natiiviseppältä
tarkat pisteet iPhone 18 Prolle (402×874 pt) tai debug-komennon suoraan kaupungin valintaan** —
en jatkanut arvailua turhan ajan haaskaamisen välttämiseksi.

## Ei testattu
Nostokortin lukijabugin uusinta — odottaa Natiivi-UI:n kaiutinkorjausta 42dacd5c junaan.

## Laite
1572C658 terminate+shutdown siististi. Ei uusia poikkeuksia lokeissa (vanhat VIRHE-rivit ovat
edelliseltä ajolta samassa containerissa, eivät tästä kierroksesta).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
