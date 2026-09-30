# Päätoimittajan luovutus 30.9.2026 klo 18.5x (oma nollaus, konteksti 86 %)

Sessio local_593b89a1-2514-4d74-b956-2a73db862382 ("Päätoimittaja (Opus, xhigh)"), haara claude/bold-ride-vow4ki, RC päällä.
Edellinen luovutus: viesti-fable-luovutus-20260930.md. Kaikki päätökset lokissa: docs/raamattu-loki/paatokset-2026-09.md
(grep "30.9.2026"). OPPI: nollaa ITSE 65 %:ssa (tarkista get_usage joka ~10. vuoro); tällä kertaa 86 % ennen huomiota.

## Omistajan odottavat asiat

1. **Ohjeet annettavaksi, kun TF:ssä:** docs/raportit/omistajalle-odottavat-ohjeet-20260930.md
   (1 omistajalinkki ANNETTU; 2 ElevenLabs v4 Turbo -luenta: kehittäjäkoodi → Moottori, kun natiivi 09d681d3 + worker #3710 ovat TF:ssä;
   3 linnan kuori AJETTU 9168ff62). Linnan äänet (26) viety 18.4x.
2. **Omistajan tekstilupa:** Olavinlinnan kertoja (4 jaksoa) + Pulun 7 huonetta v2 (docs/raportit/olavinlinna-kertoja-pulu-tekstit-20260930.md)
   ja kuunnelmat v2 (docs/raportit/olavinlinna-kuunnelmat-20260930.md) – omistaja kokeilee linnaa ensin. Ääninäytteet (11 hahmoa × 2,
   eleven_v4) LUVALLA: Pelikoodari, CI-työnkulku #3703 (generoi-hahmonaytteet.yml) → kooste omistajalle.
3. **Päätös:** EOX-viesti (Sentinel-2) – EI tarvita, jos Karttasepän Copernicus-koe onnistuu (avoin data, kaupallinen OK); kamerakuvaus-
   toiminto (pelaaja ottaa ISS-kuvia, Sentinel kuvauspaikoille) ehdotettu, odottaa omistajaa.
4. **Päätös:** roolien viennit CI:hin (työnkulku tällä Macilla, avaimet salaisuuksina) – ehdotettu, odottaa. Päätoimittajalla omistajan lupa
   ämpärivienteihin (loki 18.54).
5. Linnan tavoitekuvat v2: ilmehyväksyntä kysytty (vastausta ei tullut, työ etenee).
6. Kytkinpaneeli v2 + Cupolan horisontti/päivänvalo/pilvet 30 %: omistajan OK kuvaparista (Linssiseppä kuvaa).
7. Aloituksesta ensimmäiseen luentaan 49 s – kysytty, onko liian pitkä.

## Roolit (sessionimet; SendMessage NIMELLÄ)

| Rooli | Nyt |
|---|---|
| Julkaisija | TF 1.1 (75) sisäisessä; 1.1 (73–75) ulkoiseen Arvioijat-ryhmään kun arviojono vapautuu (omistajan lupa vanhentaa 1.0.67–72 annettu? tarkista); web-juna: #3703, #3714, #3701, #3702, #3710, #3717 (blender 9168ff62); vie-dioraama osoitin vain dispatchilla (omistajan lupateksti annettu) |
| Natiiviseppä | nollattu 16.3x; juna 76 (d3b3a4dd + 128dc29b) kääntyy (siivous tehty 18.5x omistajan käskystä) |
| Natiivi-UI | kuunnelmien tekstitys linnaan; Mac-syöte 01c42c3d valmis (rullan herkkyys omistajan palautteen mukaan) |
| Pelikoodari | ääninäytteet CI:llä; testimykistys ja --mute-audio valmiit |
| Linssiseppä | ISS: paneeli v2 + horisontti + päivänvalo (11405a49) kuvaparit → omistaja; sitten fotorealismi (sävytys, Hillaire-ilmakehä, sunglint, DEM, pilvet, yö; NASA-vertailut ISS067-E-286475 ja ISS037-E-18864) |
| Linssiseppä 2 | arvioijapolku 1.1 (75) tehty; ElevenLabs-lukija valmis; vapaa → anna erä |
| Linnanrakentaja | Olavinlinna ykkösprioriteetti: vaihe 4 hämärälightmapit + soihdut, työmaaromun siivous, seuraava vienti niputettuna; linnakirjasto (docs/raportit/linnakirjasto-20260930.md) |
| Siirtoseppä | linnan Unity-puoli (kertoja, infotaulut, kuorivarjostin, vesi odottaa); #3701/#3702/#3714/#3717 puhtaan asennuksen todennukset ennen osoitinta |
| Karttaseppä | raeton poltto taustalla (ei kiirettä, väistää linnaa ja simulaattoreita); Copernicus Sentinel-2 -koe 3 kohteella |
| Sisältökirjuri | luennat 5 kaupunkiin VAIN TEKSTINÄ (ei generointia ilman omistajan tekstilupaa) |
| Laitetestaaja | savukkeet; ei koske Macin oletusulostuloon |
| Postivahti | kierto; kävijälaskurin tarkistus tunnin välein (ULKOPUOLISIA KÄVIJÖITÄ) |

## Tämän päivän sitovat linjaukset (lokissa)

Uusia ääniä ei generoida ilman omistajan etukäteislupaa; lupapyynnössä tekstit sanatarkasti (Raamattu PR #3699). Hyväksyttävät tekstit
omistajalle VUORON VIIMEISEEN VIESTIIN chattiin (ei korttiin, ei md-tiedostoon). Simulaattoreita yksi kerrallaan (SpringBoard-kaatumiset
16.29), muistia ≥ 50 % vapaana, ei epäonnistuneen käynnistyksen uusintaa, testimykistys oletuksena. Kevyt tila: /tmp/matkakirja-kevyt +
ajastettu rm + KIIREELLINEN kaikille; omistaja voi ajaa "!"-komentoja tähän sessioon (pitkät rivit katkeavat → lyhyet rivit).
TF-versio 1.1 (build = juokseva). Apurahakortti: 4 kuvaa, ei videota. Olavinlinna: kertoja + infotaulut + Pulu-nappi + kuunnelmat,
laatu täysi paitsi ≤ iPhone 15 Pro, hybridi B+C, linnakirjasto. Cupola horisonttiin, pilvet 30 %, yöllä päivänvaloon. ElevenLabs:
striimi eleven_v4_turbo, säilötyt eleven_v4. Musiikki ja maisema kerran läpi, alusta. Luennan aikana matkakirja auki, ei pehmennystä.
Dialogi: asia-anakronismit korjataan, sanojen ensiesiintymiä ei.
