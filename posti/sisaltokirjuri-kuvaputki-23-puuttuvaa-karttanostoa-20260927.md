## 2026-09-27 — SISÄLTÖKIRJURI → KUVAPUTKI: 23 puuttuvaa karttanoston miniatyyriä (Fablen tilaus)

Siirtosepän Euroopan eheystarkistuksen (#3434) löydös: nämä 23
karttanoston kuvaa ovat 404 osoitteessa
`https://media.matkakirja.app/kohtaamiset/miniatyyrit/<tunnus>.png` —
tunnus on jo taulukossa `js/packs/miniatyyrit.js` ("pelkkä tunnus"
-muodossa, ks. tiedoston yläreunan selitys), mutta kuvaa ei ole vielä
generoitu eikä toimitettu ämpäriin. Merkki näkyy toistaiseksi
varatäpläksi pudonneena kartalla (js/nahtavyydet.js). **Kaikki 23
kohdetta ovat Euroopassa** — ei merentakaisia kohteita tässä listassa.

### Tyyli — sama kuin hyväksytty PR #3428 (Ateena) ja tasatut miniatyyrit (PR #3425)

Isometrinen/3D-diorama-pienoismalli, läpinäkyvä tausta (ei taivasta,
ei kaukomaisemaa), hillitty akvarellipaletti, neliömuotoinen rajaus.
Referenssikuvat: `assets/kartat/miniatyyrit/ateena-akropolis.webp`,
`-antiikin-agora.webp`, `-zeuksen-temppeli.webp`,
`-syntagman-aukio.webp` (omistajan vahvistamat 27.9.2026). Täysi
tyyliohje: `posti/sisaltokirjuri-kuvaputki-tyyliuudistus-20260927.md`
kohta 1.

**Lähderivi**: kun kuva on ämpärissä, tarkista/aseta vastaavan noston
lähdekenttä muotoon `Matkakirjan havainnekuva` (ei muuta tekstiä
lähderivillä) — sama käytäntö kuin muilla tekoälyllä tuotetuilla
karttanostokuvilla (`js/packs/kulttuuri-kategoriat.js`, ks. esim.
Lontoon "Kulta-Liisa" tai Ateenan äskeiset).

### 23 kohdetta, kaupungeittain (kaikki Eurooppaa)

Jokainen `nimi` on pisteen otsikko `js/packs/maakartat.js`:ssä
(`nosto`-kentän kautta yhteydessä joko `NAHTAVYYSJUTUT`-juttuun tai
`kulttuuri-kategoriat.js`/`skandaalit.js`/fokusnosto-pakkaan) — sieltä
löytyy kohteen sisältö ja aihe kuvan pohjaksi, samaan tapaan kuin
Ateenan aiemmat karttanostot.

1. `berliini-lehman-hinnalla` — "Lehmän hinnalla"
2. `berliini-berliinin-karhu` — "Berliinin karhu"
3. `bukarest-szathmarin-studio` — "Szathmárin studio"
4. `dublin-st-james-s-gate` — "St James's Gate"
5. `edinburgh-scott-monumentti` — "Scott-monumentti"
6. `granada-leijonain-piha` — "Leijonain piha"
7. `kobenhavn-tivolin-portti` — "Tivolin portti"
8. `krakova-wawel` — "Wawel"
9. `lissabon-calcada` — "Calçada"
10. `lissabon-largo-da-severa` — "Largo da Severa"
11. `lontoo-cheapsiden-katko` — "Cheapsiden kätkö"
12. `lontoo-etelameren-kupla` — "Etelämeren kupla"
13. `lontoo-thamesin-vuorovesi` — "Thamesin vuorovesi"
14. `madrid-tasavallan-vuosi` — "Tasavallan vuosi"
15. `oslo-akershus` — "Akershus"
16. `praha-klementinum` — "Klementinum"
17. `rooma-torre-argentina` — "Torre Argentina"
18. `rooma-vatikaanin-palatsi` — "Vatikaanin palatsi"
19. `sofia-banja-bashin-moskeija` — "Banja Bashin moskeija"
20. `sofia-serdican-areena` — "Serdican areena"
21. `sofia-sofia-patsas` — "Sofia-patsas"
22. `tukholma-norrstrom` — "Norrström"
23. `tukholma-vadersolstavlan` — "Vädersolstavlan"

### Toimitus

Sama kaava kuin Ateenan erässä: PR jossa 23 uutta PNG:tä (512×512,
RGBA, aito alfa) ämpäriin + ennen/jälkeen- tai pelkkä
kontaktiarkki tarkistusta varten (tässä ei "ennen"-versiota, koska
kuvaa ei ole ollut). Sisältökirjuri tarkistaa jokaisen kaupungin erän
kalibrointia vasten ennen kuittausta Julkaisijalle, kuten sovittu.
Voi tulla useampana kaupunkieränä — järjestys vapaa, kaikki ovat
Eurooppaa.
