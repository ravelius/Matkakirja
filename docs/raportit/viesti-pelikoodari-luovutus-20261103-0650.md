# Pelikoodari: luovutus 3.11.2026 klo 06.50 – juna 218

Edellinen: -20261103-0605 (0141662ba) – voimassa, ellei alla toisin. Syy: konteksti (hook 26 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **06aa319bc**.
Runko **pelikoodari/sali-218x 4e7874b8b** (= 06aa319bc + piirtajat-218 b51e69a8b, merge-tree + commit-tree). unity-tarkistus 0 virhettä,
peli-testit 803/803 (bash Peli-testit/kaanna.sh – EI zsh).

## PT:n linja (SITOVA, PT 06.5x)
218x KOKO sarjana. Selvitä yk 76:n ja cx:n reunojen 570:n syy, korjaus samaan runkoon. Taulukko **218r / 218v / 218x** PT:lle (≤ 3 riviä + polku).

## Tehty tässä vuorossa
- Taulukko 218r/218t/218v valmis ja PT:lle: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/taulukko-218v.md
  (massassa/piilossa 264/596 → 485/807 → 190/466; th 0, xf 0; taso1b-218v 7/59/0/27, eteläoven 1,8 m:n hyppy poissa).
- xf/th:n alun ovipalkki (avoin 1): kaksi korjausta
  - bf0e08217: polun ollessa lyhyt ja suoran paikan tukossa kamera suoraan lähemmäs (DroneNosto.PolkuSuoraMin 1,2 / PolkuSuoraVara 0,5),
    1. ruudussa polkupaino suoraan. xf-218w (546572ce9) EI riittänyt: alussa sisäkamera ("sali 1.0").
  - **06aa319bc (juurisyy):** JuoksuSokkeloMaailma.SaliKatonAlla vaati vain katon rajauksen (sisältää räystään) → keisari räystään alla 2 m
    seinän ulkopuolella = "salissa" → sisäkamera vei kameran salin sisään seinän ja ovipalkin taakse. Nyt vaatii AvoimessaHuoneessa(puyi,
    −SaliSeinaVara 0,5). HUOM: koskee kaikkia saleja (sisäkamera alkaa ovella, ei räystään reunalla) → koko sarja tarpeen.
- mittari-taulukko.py tuntee -218w ja -218x. sali-218x/ketju-x.zsh lukee myös taso-ajon juoksu-kansion.

## PT 06.5x (SITOVA, lisäys)
1. Mittari EI laske kiinni → uudestaan -odotuksen ruutuja peliin – korjaa ENNEN 218x-taulukkoa (muuten cx harhaa); PT:n hyväksyntä
   saatu (avoin 3 alla on näin hyväksytty).
2. yk s ~35: seuraava korjaus a31589350:n epäilyllä (runko 218y).

## Selvitetty (PT:n kysymys)
- **cx reunassa 570 / vetoja 1046 = mittarin ajoitusartefakti, ei kameramuutos:** "kiinni TakaaAjaja 36 s" -jälkeinen odotus ennen
  `uudestaan` oli 218v:ssä ~30 s (218t ~5 s); kiinniruudut lasketaan peliin. 218v: reuna 96 ennen kiinniä → 556 uudestaan-hetkellä → 570.
  Ehdotus: mittari-taulukko.py (tai pelin mittari) erottaa kiinni → uudestaan -jakson kuten maalikuvan. Ei tehty.
- **yk 76 (218r 44):** 249,7 s (44) = s ~66 portin edusta (98,3, 4,1, -773,5), ruutu huippu 4,95 ala 0,54 = sama kuin 218r:n 239,7 s (44)
  ja 218t:n 240,0 s (45) → vanha. UUSI 243,7 s (32) = s ~35 työhuoneen (halli 11) eteläpää: kamera (113,3, 3,7, -784,6), Puyi
  (110,8, -784,4) länteen, ruudut "huoneessa huippu 3,95". 218t:ssä sama 234,2 s (61), 218r:ssä ei → tuli 218r→218t-muutoksista:
  9655e4bae (polkukamera myös läpikulussa) tai **a31589350 (läpikulun katto avoimen oven aukosta, kamera oven yläreunan alle)** –
  todennäköisin a31589350 (paikka työhuoneen end_door18:n vieressä, sarana (116,1, -784,5)). EI varmistettu eikä korjattu.

## Ajot (JU)
- L1: sali-218x/ketju-x.zsh xf th (alkoi ~06.47), sitten samalla linjalla ketju-x.zsh yk cx tj ty cc ys (pyydetty 06.49).
- 218w-kansio: vain xf (061632); th 062341 kaatui alussa (exit 138, Unity Task-säie) – ei uusintaa.

## Avoimet
1. 218x-sarjan jälkeen: `cd sali-218b; python3 -I mittari-taulukko.py yk-218r yk-218v yk-218x cx-218r cx-218v cx-218x tj-218r tj-218v tj-218x
   ty-218r ty-218v ty-218x th-218r th-218v th-218x xf-218r xf-218v xf-218x cc-218r cc-218v cc-218x ys-218r ys-218v ys-218x` → taulukko-218x.md
   + PT:lle ≤ 3 riviä. Tarkista xf-218x ja th-218x v3 0–1 s kuvina (ffmpeg tile, kuten scratchpadissa): palkki/räystäs poissa?
2. yk s 35: vahvista a31589350 vs 9655e4bae (kameraloki 218t/218v yk, OviAukonYla-loki) → korjaus seuraavaan runkoon (218y).
3. cx: kiinni-jakso erilleen mittarissa – PT hyväksyi 06.5x, tehdään ennen taulukkoa (ks. PT 06.5x).
4. th s 7 kapea ovi (114,2, -784,2): th-218v massassa 0 → poistunut; reunat 127 jäljellä.
5. Ennallaan: ty s 13,4 räystäsnosto, ys 1.2 räystään parrut, seinähäivytys pois (omistaja 10.43), KK:n paketti vasta puhtaana.
6. Havainnot: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/salit-218l-havainnot.md (loppu).
7. xf-218x (064724, 4e7874b8b) valmis: 2/89/113/42 (218v 0/94/94/64). Alun kuvat (sali-218x/xf-218x-alku-kooste.png) EI vielä katsottu.
8. LAV 3.11. ~07.2x KYTKENTÄ (kun JU on vienyt): kielletty-rakennukset-v118 (v117 + 42 palatsin pronssia ryhminä pr-*, vanhat leijonat
   pois f-taihemen/l-malleista) + palatsi-esto-v38 (+567 ruutua, korvaa v37); tausta v114 ja osamallit ennallaan; LAV:n juoksu 151/151.
   Vesiastiat vedenkantajan täyttöpaikoiksi (10 kpl, reuna 1,1 m): /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/pronssit-esi/vesiastiat-pk.json.
   Järjestys: mittarikorjaus + 218x-taulukko ensin (PT), kytkentä samaan seuraavaan runkoon (218y) yk-korjauksen kanssa.

## Jatko 07.4x (PT: ei nollausta, jatka avoimista 1–2)
- mittari-taulukko.py: kiinni → uudestaan -odotus pois (sarake "kiinni-odotus pois m/r/p/v"; vanha .ennen-kiinni). cx-218v reunat 570 → 110.
- Taulukko 218r/218v/218x PT:lle: sali-218b/taulukko-218x.md. Summat massassa/reunassa/piilossa/vetoja 218r 264/≥499/596/792,
  218v 190/863/466/901, 218x 259/925/517/899. **06aa319bc huononsi** (th 0 → 39 @ 148,3 s, yk 76 → 106 @ 234,3 + 240,2 s) eikä korjannut
  xf:n alkua: kamera 1. ruudussa yhä (135,27, 4,25, -805,92) salin sisällä. Ehdotettu PT:lle: 06aa319bc pois, pohjaksi 218v + bf0e08217.
- SEURAAVA: selvitä, mikä asettaa kameran 1. ruudun paikan `uudestaan`-komennon jälkeen (JuoksuV4Maailma rivi ~403 nollaus, alustettu,
  droneAlussa, rivi ~2084 kPaikka = kohde): polkukamera-loki alkoi vasta t 0,10–0,15, joten 1. ruudun kohde ei kulje polkulohkon kautta
  tai Tukossa(kohde) on silloin false. Lisää loki 1. ruutuun (kohde, AvausT, tunnelissa, katonAlitus, Tukossa) ennen uutta korjausta.
- HUOM: checkout /Users/Shared/Claude/Matkakirja-pelikoodari oli 07.4x vaihdettu haaraan koti/Matkakirja-pelikoodari (origin/main);
  palautettu koti/pelikoodari-20261103-0540:aan (PR 6085 auki).

## Jatko 08.0x – UUSIN TILA (korvaa yllä olevat runko- ja ajotiedot)
- Proto kapea-reitti-218 kärki **61fc14d04**: d91bab3ce peruu 06aa319bc:n; 1a7c390e2 = juoksun alun napsautus (SYY: kohde kulkee
  pohjajousen pohjaKohde läpi → vaikka suora lähennys alkoi t 0,10, kamera liukui 1,3 s salin seinän läpi; nyt s < PolkuSuoraAlkuS 0,5 s
  ja suoran lähennyksen alkaessa kPaikka + pohjaKohde = kohde, alkuNapsautus) – HUOM: sama commit sisältää myös palatsi-esto-v38-vaihdon;
  61fc14d04 = rakennukset-v118 (LAV 07.49, viety _valmiit/…-v118-vienti-20261103). Runko **pelikoodari/sali-218y cf40ca767**.
  unity-tarkistus 0, peli-testit 803/803.
- JU:lle pyydetty 08.0x: sali-218y/ketju-y.zsh xf th yk cx tj ty cc ys taso1b (taso1b:n kansio korjattu ketjussa).
- mittari-taulukko.py tuntee -218y. Seuraavaksi taulukko 218r/218v/218y (sama komento, -218x → -218y) + xf/th alku kameralokista
  (1. ruutu < 2 m keisarista eikä z < -803,3?) → PT:lle ≤ 3 riviä.
- Ei tehty: vesiastiat vedenkantajan täyttöpaikoiksi (LAV: pronssit-esi/vesiastiat-pk.json), yk s ~35 (a31589350-epäily).

