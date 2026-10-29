# Pelikoodari: luovutus 29.10.2026 klo 13.31 (uusi tili; PT: konteksti 27–30 %, nollaus)

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-1011.
Proto-haarat peilissä natiivi-backup peili/proto/pelikoodari/<haara> (drone-214 8289a55fe, rikotut-214 c71caf75d, pk7-214 20c32559f).
Lokien kameratiivistys: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/parkour-20261027/kamerarivit.py <konsoli-stdout.log>`.

## Valmista
- LAUTASPÖYDÄN POLKU (siirtoprompti): jo korjattu 1414ce73e (aarteet799-v4) ja junassa 214 (⊂ runko ed61246ba). Ei tehtävää.
- LR:N KYSYMYS t-portti-120:n materiaalinimistä: vastattu LR:lle (vanhan tilin viesti ei tullut perille, vastaus koodista):
  peli teksturoi nimen mukaan maailman koordinaateissa (JuoksuV4Maailma.Lattia.cs LattiaLaji): V4_lattia → pihan kivilaatta,
  V4_marmori → marmori (kaukaa harmaa), V4_kivireunus → reunakivi, V4_sokkeli/V4_jalkakivi → kivijalka, V4_vesi → vesi.
  tportti_lattia.py:n V4_marmori → V4_lattia riittää, koodimuutosta ei tarvita. Jos LR kysyi muuta, LR kirjoittaa uudelleen.
- DRONE m 284cfe49e ajettu (lokit/todistus-drone214m-284cfe49e-20261029-1308): KATTO/SEINÄ KATOSI 0 (l: 46), nostot = l,
  283/0, väläyksiä 0; Sonnet puhdas. PT kuittasi → KK palautti 13.24 (ei vielä omistajalle) kaksi korjausta omistajan sanaa
  "mahdollisimman pehmeästi" vasten:
  1) lähtölaskenta video 46,0–48,4 s: katse seinässä ~1,5 s ja nopea kääntö keisariin (kuva
     /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/tarkistukset-20261029/drone-m-lahtolaskenta-458-486s.jpg);
  2) nosto t 95→96: kamerarata "pysty 427 cm, nopeus 541 cm/s" (> 2,5 m/s; myös t 92: 490 cm/s).
- DRONE n 8289a55fe (peilissä; peli 764/764, unity 0) korjaa molemmat:
  1) SYY: kaarto keisarin taakse alkoi 1,0 s huudosta eunukin lähikuvan aikana (k³) → lähikuvan jälkeen ~180° 2 s:ssa,
     90 °/s:n raja jätti katseen jälkeen (malli: 189 °/s). KORJAUS: kaarto alkaa keisarin repliikin lopussa (huuto + 2,69 s),
     PorttiKaartoS 4,8 → 6,4, KaariKulmaPotenssi 1 → kaaren kulma enintään 51 °/s (testi Taso1PortiltaNopeaKaartoJaLaskenta ≤ 55);
     AvausKaantoMax 90 → 60 (vain varmistus). SIVUVAIKUTUS: avaus +3,3 s (ohjaus 38,7 s, S 60 m) – kerro PT:lle/KK:lle.
  2) SYY: räystäsnoston lasku 2,5 m/s + keisarin terassiportaat 1,85 m summautuivat. KORJAUS: kPaikka.y omalla SmoothDampilla
     enintään DroneNosto.PystyNopeusMax 2,5 m/s (myöhäinen räystäs raystasNostoV:llä, alle 1,2 m lattiasta nousu vapaa).
  Mallisimulaatio: scratchpadin sim/avaus.py (ei repossa; kaava kommentissa JuoksuAvaus.PorttiAikajana).

## Odottaa
- JU: drone n -käännös + simu (pyydetty 13.3x): skriptit parkour-20261027/kaanna|aja-drone214n-8289a55fe.zsh, skenaario
  simu-drone214n.txt (video drone214n 150 s). TARKISTA lokista:
  - `grep -c "KATTO/SEINÄ KATOSI"` = 0; "ladattu 283 glb:tä, puuttuu 0".
  - avaus: `grep 'kameraväli t [0-9.]* avaus'` → sarake "kääntö" ≤ ~55 koko avauksen (m:ssä 74–88 t 33,6–35,4 ja 76 heti ohjauksessa);
    ei 60:n kattoa pitkään (= katse jäljessä).
  - nostot: `grep 'kamerarata t'` → "nopeus" ≤ ~250 cm/s kaikkialla paitsi U-käännöksen portti (t ≈ 72–74, ≤ 4 m/s PT:n hyväksymä).
    m:ssä yli: t 92 490, t 96 541, t 93 456. HUOM: pelin t-arvot siirtyvät avauksen +3,3 s:n verran (s.Aika alkaa ohjauksesta? tarkista).
  - väläykset: `python3 -I tools/valahdys-yavg.py <video> 4` (Matkakirja-pelikoodari).
  Sitten Sonnet tarkistaa videon (lähtölaskenta 3–2–1: keisari kuvassa koko ajan, ei seinää; 2. portin nousu ja lasku pehmeät)
  → uusi video PT:lle (PT pyysi: "uusi video minulle"). Junaan 214 omana eränä vasta omistajan OK:n jälkeen.
- LR v66 (ei vielä _valmiit): sitten juuri-pk7-v66, TaustaKansio/RakennusKansio pk7-214:ään juna-214:n päälle, pari → PT → KK → JU.

- UUSI (LR 13.3x, omistaja 11.02/11.04, LR-luovutuksen lisäykset 70–71): JuoksuLattia.shaderin kuviot PK:n haaraan (PK on
  varjostimen ainoa kirjoittaja; LR tekee reunuskiven korkeuden ja leveyden geometriaan). KK:n mittaus: laji 2 PIHA rivi 1,2 → ~1,7 m,
  laatat 1,4–2,6 → ~2,4–4,6 m (vaihtelu 1:2, limittäin); kivijalan lohko rivi 0,38 m → ~0,4× korkeus (k21 vastaavasti) ja ~2,2× pituus;
  ReunusRaja 0,7 → ~1,4 m. Kuvat docs/raportit/kaappaukset/omistaja-20261029/ (lattia-reunakivi-vertailu-kk-1102.png,
  kivijalka-vertailu-kk-1106.png). Haara juna-214:n päälle; pari kuja 02 yhdessä LR:n geometrian kanssa → PT → KK → omistaja.

## Jatko keskeytyksestä
- Taustaajoja ei ole (JU ajaa drone n:n). Worktree wt/proto-pelikoodari-kaapu-213 (drone-214 8289a55fe) puhdas.
- Keskustelukanavan uusi id local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe (omistaja 13.11).
