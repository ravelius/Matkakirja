# Natiivisepän luovutus 5.11.2026 klo 18.32 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa -1820:n tilan. Sen mittaukset ja PT:n ehdot pätevät yhä (lasku 8,5 s ja kerronta 6,0 s vain Pariisin pallokierrokselle, raja 10 m/s² ennallaan muualla, väliaikainen 6 s, viennin jälkeen kesto klipistä). Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Remote päälle. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; tilinvaihto.md kohta 2).

## Tila
Haara natiiviseppa/pallo-aloitus-219, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Kärki 6fc1cda8b. Ei junaan, ei iPad-ajoja.
- AVOIN 2 korjattu: tervehdyksen aikana (silmukka.TervehdysKesken) OpasSovitin.Silta palauttaa false ennen pelaajanToimi-ajastinta. "Kohta ollaan siellä." tuli ajastimesta, jonka Silta(Aloitus, true) käynnisti; ajastin olisi käynnistynyt myös äänipolulla.
- Ruutulokiin puhe= ja silta= (AudioSource.time, "-" kun ei soi). Mittari: python3 -I _tyo/natiiviseppa/pallo-aloitus/puhe.py <unity.log>.
- Testi PalloAvausTestit.TervehdysEiMuitaLauseita (lukee lähdekoodia, sovitin ei käänny testeissä): FAIL ennen korjausta, läpi sen jälkeen. kaanna.sh "Pallo|Opas|Pysahdys|LahtoLaatat|Kierros|Museo" 520/520, unity-tarkistus 0 virhettä. Koko testisarjaa ei ajettu.

## Ajo lokit/natiiviseppa-pallo-lauseet-6fc1cda8b (PUUTE 0, 77 s, 1 kuva)
- Siltalauseita lähdön jälkeen 0 (ajossa 7d719ae76 kaksi samalla mittarilla).
- Kerronnan ääni alkaa 6,08 s lähdöstä, puhe.time etenee 6,11 s (0,00 → 0,02 → 0,06). Ennen tekstitys 8,3 s.
- Perillä 12,72 s: saapumisportti 4,2 s (tasanne), AVOIN 1 ennallaan.
- a3-saapui katsottu 2000 px leveänä (alkuperä 2420): napit ja kori kohdallaan tässä yhdessä ruudussa. Notre-Dame ja rakennukset valkoisina, kuten ajoissa 9e064504d ja 7d719ae76; syytä ei selvitetty, ei tästä erästä.
- Ajo kulki tekstipolkua (tervehdyksen ääni 404): tervehdyksen äänipolkua ei ole todennettu. Kerronnan ääni on todellinen klippi.

## Odottaa
1. PT: tulos viety 18.3x, AVOIN 1:n ratkaisu (portti odottaa laattoja; Macin luku, iPadilla mittaamatta) ja valkoisten rakennusten vastuu.
2. Valoseppä: opas/esittely-v1/aanet/pariisi-tervehdys.mp3 + .ajat.json, vienti vasta KK:n kuittauksella. Sen jälkeen tarkista äänipolku samalla puhe.py:llä.

## Ei tehty
Korin ja nappirivin suhdetta liikkeessä ei tarkistettu tässä ajossa (yksi kuva). Vanhojen kuvien pari ei ole samasta hetkestä (-1820), joten ennen/jälkeen-paria ei tehty.

Lyhyet Mac-ajot: 10.5 (mitä tämä ratkaisee, kuvia enintään noin 5).
