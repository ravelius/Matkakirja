# BUILD 142 huoneet, Mylly, Jatka matkaa, dB — 5.10.2026 klo 11.29–11.34

Laitetestaaja (Sonnet 5.5, high). iPhone 18 Pro 1572C658, `juna-1.1.142-b42c04de`, linnan osoitin 22968114. Käännökset
käynnissä samaan aikaan: toimintatesti, A/V-ajoitusta ei mitattu. Testimykistys oli päällä (`ääni: testimykistys päällä`).
Konsoliloki `kuvat/peli-loki-142-360c.txt` (1158 riviä), **0 Exception**. Simu sammutettu 11.34.

## Tulokset
| Kohta | Tulos | Todiste |
|---|---|---|
| Huoneet-valikko vaakana, 7 riviä, oikeilla napautuksilla (≡ → Huoneet → huone) | PASS | Laituri, Fatabuuri, Kierreportaat, Muurinharja, Kappeli, Keskushalli, Keittiö: jokainen `poikki: kuunnelma <huone> alkaa (edellinen -)` täsmälleen kerran (k1), ei paluuta edelliseen |
| Huonekortti (osoitinviiva, initiaali) | PASS (Laituri, Keittiö) | `linna-laituri-kortti-142`, `linna-keittio-kortti-142` |
| Mylly: avaus, nappulan asetus napautuksella, botin vastaus | PASS | 9/0 → 8 kädessä · 1 laudalla molemmilla, "Botti · helppo" |
| Mylly: Luovuta → häviökortti | PASS | "Luovutit tämän pelin … Tulos kirjattiin matkakirjaan" (`mylly-luovutus-142`), loki `mylly: luovutit … 2 siirrossa` |
| Mylly: Jatka matkaa (kortti) | PASS | Mylly sulkeutuu, kartta + Liiku takaisin |
| Mylly: Poistu-nappi | PASS | uusi peli → Poistu napautuksella → MYLLY pois, kartta |
| dB (huoneen kuunnelma, Keittiö) | MITATTU | `aani mittaa 6`: rms 0,057 (−24,9 dBFS), huippu 0,451 (−6,9 dB), soivia 1 [DioraamaKertaaanet @0,71], 24 kHz stereo |

## EI TESTATTU
- ISS-taulu vaakana (Pulun taulu pystynä testattu aiemmin PASS).
- Lukijalista (todennettu aiemmin `savukierros-142-lukija-20261005.md` kohta 3).
- Kreikka/Ateena-kortti + lipputanko: `ui kaupunki ateena` → ok mutta kortti ei tullut näkyviin (nostokortti Pompeji jäi päälle,
  `ui nosto kiinni/pois` ei sulkenut), `matka ateena lento` → "Sinne ei ole lentoa" Marseillesta. Tarvitsee matkan Ateenaan.
- Ääniraidallinen tallenne (A/V): ei, koska kone kuormassa ja A/V-ajoitusta ei haluttu; vain dB-taso mitattu.
- Huomio: `ui nosto kiinni` palauttaa "ok" mutta nostokortti jäi auki (mahdollinen komentovika, ei tutkittu).

## Menetelmä (napautukset linnan valikossa, simussa kierrettynä)
≡ (374,784) → Huoneet (317,650) → huonerivi y=682: Laituri x=264, Fatabuuri 232, Kierreportaat 199, Muurinharja 168,
Kappeli 135, Keskushalli 105, Keittiö 74 (portrait-pisteitä; valikko avautuu uudelleen jokaisen huoneen jälkeen).
Mylly: `ui mylly peli helppo`, solmu (46,264), Luovuta (249,787), Jatka matkaa (302,500), Poistu (337,787).
