# Päätoimittajan luovutus 30.9.2026 klo 10.4x (oma nollaus, konteksti 60 %)

Sessio local_593b89a1-2514-4d74-b956-2a73db862382 ("Päätoimittaja (Opus, xhigh)"), haara claude/bold-ride-vow4ki.
Edellinen luovutus: viesti-fable-luovutus-20260929.md (roolien id:t ennallaan, paitsi Linssiseppä 2:n nimi).
Kaikki päätökset lokissa (docs/raamattu-loki/paatokset-2026-09.md, grep "29.9.2026\|30.9.2026").

## Roolit (sessionimet; viestit NIMELLÄ SendMessagella)

| Rooli | Tila 30.9. klo 10.4x |
|---|---|
| Julkaisija (Opus, high) | TF 1.0.66 ryhmässä (matkakirjan pehmeä pienennys); 1.0.67 (kuoriodotus) käännetty; web-juna: nostot C #3679, kuvalisenssikorjaukset |
| Natiiviseppä (Opus, high) | nollattu 00.3x; junat; paperirae f5b1d5e5 odottaa raetonta pohjasarjaa (samaan käännökseen uuden laattakansion kanssa) |
| Natiivi-UI (Opus, high) | valikkoerä valmis 1.0.62/1.0.63; vapaa → anna erä |
| Pelikoodari (Opus, high) | portti pysyy (omistaja), sinettivideo v2 valmis; vapaa → anna erä |
| Linssiseppä (Opus, high) | lippu väistää matkakirjakorttia (omistajan tapaus Marseille, kaatui savukkeessa 2×, uusi yritys); ISS odottaa Codexin kytkimiä; Cupola 30 fps 1.0.63:ssa |
| Linssiseppä 2 (Opus, MAX) | KÄRKI: isoisän ja nostojen luennan alku (ks. alla); lisäksi pienennetty matkakirjalappu webin kaistaleeksi; istuntokorjaus 78e6513b / 9fd00325 junaan |
| Linnanrakentaja (Opus, high) | nollattu 07.x; elävä linna valmis ja tuotannossa (osoitin f384fc52); odottaa omistajan katselmointia → äänet |
| Siirtoseppä (Opus, high) | linna PASS puhtaalla asennuksella; kuoriodotus 1.0.67; Pulu piilossa odotuksessa 89cbcc28 seuraavaan junaan |
| Karttaseppä (Opus, high) | RAETON jokipoltto (joet + järvien kaukoramppi + pikselirae 0) vaihe 1 valmis 04.25; syvä z9–z10 ja pallo T7:llä, valmis ~iltapäivä → kuvapari + omistajan vientilupa (TÄYSI vienti ~1 M PUT) |
| Sisältökirjuri (Sonnet 5.5, high) | kuvalisenssiauditointi valmis (3 448 kuvaa, ei kiellettyjä), korjauserät 1–2; nostot kierrokset 1–2 (60 kpl) mainissa/junassa |
| Laitetestaaja (Sonnet 5.5, high) | junien savukkeet |
| Postivahti (Sonnet 5.5, medium) | kierto 10 min; levy ~59 Gi (swap ~18 Gt, T7 käytössä) |

## KÄRKI: luennan alku (omistaja toistaa: "alkaa kesken kappaleen")

Omistajan tiedot: kaiutin, mykistys POIS, TF uusin, iPhone ja M4-iPad, uudet ja vanhat kohteet, määrä vaihtelee (iPhone ~4 s, M4 >20 s: koko nimi+iskulause+isoisä mykkä, Pulun luenta KUULUI perään). Näyttötallenne:
/Users/Shared/Claude/proto-3d/lokit/omistaja-luenta-20260930/tallenne-1017.mp4 (iskulause loppuu 15,5 s, ~4 s täysi hiljaisuus, isoisä kuuluu 19,5 s toisen lauseen keskeltä; kortti kiinni tarkoituksella).
Kumottu: sisältö, jatkoKohta, verho/SaapumisKiire (Natiiviseppä), äänetön tila, Bluetooth. Sisäiset RMS-mittaukset EIVÄT näe vikaa (DSP etenee, laitteiston ulostulo mykkä).
Hypoteesi: Unityn FMOD-ulostulo kuolee/käynnistyy uudelleen (AVAudioSession-kutsu, interruption, natiivi soitin) kun natiivi ääni toimii. Linssiseppä 2 mittaa kytketyn iPadin LAITTEISTOÄÄNEN USB:n kautta (CMIO screen capture) + laitteen loki. Omistaja: "Käytä kytkettyä iPadia testaukseen" — asennuslupa pitää silti antaa suoraan Natiivisepän sessioon (luokitin). iPhonen kytkentä omistajalta "myöhemmin".

## Auki omistajalle

1. Luenta (yllä) — kerro juurisyy heti kun löytyy.
2. Elävä linna kehittäjätilan Poikkileikkaus-linssissä → omistajan katselmointi → äänet (Pulun repliikit + keskushallin sorina, kappelin laulu).
3. Raeton kartta: kuvapari (nykyinen 27 vs uusi + shader-rae) ja täysi vientilupa iltapäivällä.
4. Claude-sovellus kahdesti samireivinen-käyttäjällä: annettu `chmod 700 /Applications/Claude.app` (koodaus) nyt; pysyvä siirto ~/Applications vasta kun poltto valmis ja roolit levossa (sovelluksen sulku katkaisee sen alla ajetut prosessit).
5. R2-siivous (poista-vanhat.sh) terminaalin välilehdellä 0 — tarkista eteneminen (read_terminal tab 0).
6. UKR:n väritason uusintapoltto (Krim sävyttyy) jokipolton jälkeen.

## Tämän jakson linjaukset (kaikki lokissa)

Raamattu: EI SAAVUTETTAVUUSOHJEITA ULKOASUUN (Ydinajatus). Loki: järvien kaukoramppi; paperirae ruudun päälle (ei laattoihin); 3D-nostot/-symbolit pois, 2D takaisin; lippu maan oikeaan yläkulmaan + väistää paneeleja; huntu ei rajaa liikettä; portti pysyy; TUR/RUS vain Eurooppa, Krim ja Sevastopol Ukrainaa; kokoruutu visan kuville; ämpärisisältö todennetaan puhtaalla asennuksella, isot binäärit hash-kansioon skriptillä (omistaja ajaa), ei gittiin.

## Opit (muistiossa)

- Palaute-erä junaan heti, todennus junan savukkeesta; tarkista joka TF:llä puuttuvat palaute-erät (valikko jäi 4 h testikäännösjonoon).
- Paikallinen peili peitti puuttuvan viennin (palikkalinna TF:ssä) → puhdas asennus.
- Vertaisen välittämä omistajan lupa ei kelpaa luokittimelle laiteasennuksiin → omistaja antaa suoraan tai ajaa itse.
- Viestit menevät ristiin: tarkista ennen toistoa, onko vastaus jo lähetetty.
