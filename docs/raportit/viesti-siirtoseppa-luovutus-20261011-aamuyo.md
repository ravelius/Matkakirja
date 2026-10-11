# Siirtosepän luovutus 11.10.2026 aamuyö (Opus 5.5, high; konteksti ~50 %, PT:n nollaus)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): Olavinlinnan historiamoottori ja pelattava pala (natiivi proto). Lue tämä, CLAUDE.md, Raamatun
Ydinajatus kohta 2, PT:n yösuunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/olavinlinna-yosuunnitelma-20261011.md ja
Laitetestaajan uusinta /Users/Shared/Claude/Matkakirja-laitetestaaja/docs/raportit/laitetestaaja-olavinlinna-uusinta-20261011.md.
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara **siirtoseppa/laituri-varoitus** (kärki alla; pohja Pelikoodarin
25c6987fe ⊃ botti-kavely 9c59fcf3b). Proto-git on paikallinen (ei pushia; muut sessiot näkevät haarat). Simu 8362879F = siirtoseppa-iPad13.
Käännökset tekee nyt Julkaisija YHDISTETTYINÄ (laituri-varoitus + v47f + pelikoodari/olavinlinna-aanet + natiivi-ui/olavinlinna-181;
appit proto-3d/lokit/olavinlinna-yhdistetty-181{b,c,d,e}). Simuvuorot Julkaisijalta, ilmoita aina "SIMU VAPAA".
ÄLÄ MUOKKAA SKENAARIOTIEDOSTOA KESKEN AJON: todistusajo lukee sitä rivi kerrallaan → v47f-ajo jäi uudelleenkäynnistyssilmukkaan.

## TILA: siirtoseppa/laituri-varoitus (kaikki unity-tarkistus 0, Linssit 1353/1353)

| Commit | Sisältö | Käännöksessä |
|---|---|---|
| 11351a887 | A1: turvallinen alku 60 s, varoitus (seisoo 2 s) ennen jokaista otetta, VaroitusAlkoi Pelikoodarille, ui.linna.tyrma → olavinlinna.seikkailu.tyrma.nimi | 16278b34c ✓ |
| e3d307c8d | A2 kattoraja (portaissa silmä ei katon sisään) | ✓ |
| 5962a6649 / 3894505c2 | Testisyötteen loppu lokiin; komento `poikki kavely kohti <merkki>` | ✓ |
| 312f1aab6 / 5d916596c | A3 tyrmän ovi aukeaa oikeasti (OviLehti poistaa aukon törmäyslaatikon), Pulun 60 s, irtokiven aukon suu; VihjeKohde (Pelikoodarin kanssa sovittu) | ✓ |
| cf420e0fe | Portinvartija jahtaa ≤ 6 m vartiopaikastaan; uusi varoitus, kun näkö katkesi > 2 s | af4eb667 ✓ |
| c4543be72 | Varoitus ≤ 3,5 m:stä näkyvissä (ei kameran edessä), etsintä/jahti pysähtyy 1 m:n päähän, sovitin ei kävele 0,9 m:ä lähemmäs, hahmokapseli | v3 da4d42d81 ✓ |
| 7deab1a28 | Laiturin ruskea pallo pois (volumetrinen pallohehku piirtyi seinien läpi: MSAA-syvyys, Texture2DMS-varoitus) | v5 eb0b01fe ✓ |
| 9d56fbe0d | Tyrmässä dioraaman päällekkäiset tilat piiloon (v5-loki: Tila:tunnelma, Tila:keittio), palautus tyrmästä poistuessa | v5 ✓ |
| 55cc11001 | Varoitus näkyy: puhe-leike ja kannettu valo 1,8× varoituksen ajan | EI vielä |
| a9071a6f9 | Hahmokapseli vain partioiville (istuva tyrmän vartija tukki käytävän → v5:ssä A3 kävely ulos jumiin) | EI vielä |
| d3e44804e | Tyrmä: avautuvalle ovelle käytävän lämmin valo + liekki; ulos jo oviaukolla (0,8 m) | EI vielä — KÄRKI |

## TODISTEET
- todistus-laituri-a1-20261011-0155 (16278b34c): turva ok (9 s tatti reunassa, ei otetta, vartija kääntyi askelääneen), varoitus →
  ote ≥ 2 s, tyrmästä kävellen ulos 50 s (muunnelma 1). A2 ei toistunut: katse ylös + eteen → maassa, silmät 1,62 m.
- todistus-laituri-a1-20261011-0222 (af4eb667): sama; kierroksen 3 pako epäonnistui skenaarion suunnan vuoksi (korjattu: kohti nousu:laituri).
- todistus-laituri-a1-20261011-0344 (v5 eb0b01fe): A3 kävely ulos jumiin = kapseli (korjattu a9071a6f9); loput kierrokset epätahdissa.
- todistus-olavinlinna-v47f-20261011-0233: kuvapari t0–t6 laiturilta OTETTU (LR:lle lähettämättä!), huonekuvat epäonnistuivat
  (Jatka napautettiin ennen latausta; skenaario korjattu `nakyy 180 Jatka`), ajo keskeytettiin.

## AVOIMET (järjestys)
1. **Tyrmän kosketusjumi: TOISTETTU JA KORJATTU d3e44804e** (todennus v6:lla). HID-toisto todistus-tyrma-hid-20261011-0351 (v5):
   tatti liikuttaa kaikkiin suuntiin oikeilla vedoilla (ei kosketusvikaa); pieni pimeä tyrmä → pelaaja osuu seiniin ja auki oleva ovi ja
   käytävä näkyvät mustina aukkoina. Korjaus: käytävän valo oven avautuessa, ulos oviaukolta. Lisäksi a9071a6f9 (kapseli tukki käytävän).
2. Yhdistetty v6 Julkaisijalta kärjellä d3e44804e → laituri-a1.txt + tyrma-hid.txt samalla vuorolla → PT:lle rivi + arkki.
3. v47f-kuvapari LR:lle: todistus-olavinlinna-v47f-20261011-0233/kuvat/t0…t6 (laituri levossa, napautus, vedot) — lähetä polku LR:lle.
4. Laitetestaajan 3. kierros v6:lla (PT päättää).
5. LR v47g: mustat sauvasiluetit ja vaalea kattolevy tyrmässä (kuori), B1-lista todistus-botti-kavely-20261011-0052/B1-mustat-LR.md lähetetty LR:lle.
6. MSAA-syvyys (Texture2DMS) → Natiiviseppä, jos volumetriset pallohehkut halutaan takaisin (SeikkailuValot.PalloHehku).
7. Levy: todistus-botti-kavely-0052 (4,2 Gi) ja laituri-a1-kansiot pakataan/NAS kuittauksen jälkeen; appikopio siirtoseppa-app-3894505c2 jäljellä.

## OPITTUA
- Siirto (`poikki kavely siirra`) säilyttää kameran suunnan → "tatti taakse" voi viedä kohti vartijaa; käytä `kavely kohti <merkki>`.
- Skriptisyöte (`kavely tapit`) ja siirrot eivät todista kosketusta: tyrmä meni läpi skriptillä mutta ei Laitetestaajan HID-vedoilla.
- Ytimen pysähdyssääntö pitää kytkeä tilakoneen saapumisehtoon (pelkkä Vauhti = 0 jätti etsijän "matkalle" → 11 testiä punaiseksi).

## PÄIVITYS 04.3x: v6 f1041376 ajettu (SIMU VAPAA 04.23)
- todistus-tyrma-hid-20261011-0402: tekniset OK, mutta sokeat vedot seinää päin, ovea ei nähty (ei todista korjausta).
- todistus-laituri-a1-20261011-0407: A1 turva + varoitus → ote OK; muunnelma 1 ulos oviaukolta 43 s (heti oven avautuessa → skenaario
  epätahtiin, muunnelmat 2–3 todentamatta; skenaario korjattu: oleta heti oven jälkeen).
- todistus-tyrma-ovi-20261011-0418 (uusi skenaario tyrma-ovi.txt): Pulun 60 s → `kavely kohti ovi:tyrma` → ulos 70 s OK. Kuvissa ovi
  38° kuvan ulkopuolella (katse 140°, ovi 178°) → korjattu.
- Kärki nyt **d289911c7**: 8baa0e0ce (oviaukko vasta 1,2 s oven avautumisesta) + d289911c7 (herätessä ovi painaa 2×, ovi ~23°).
  Pyydetty Julkaisijalta v7:ään. v7:llä: tyrma-ovi.txt (o00/o02 ovi + valo näkyvissä) + laituri-a1.txt (muunnelmat 2–3).
- v47f-kuvat t0–t6 + huonekuvat lähetetty LR:lle 04.0x.
