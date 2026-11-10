# Pelikoodari: luovutus 10.11.2026 klo 22.22 (konteksti 27 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-1925.md (haara pelikoodari-luovutus-20261110-1724; LISÄYKSET 21.11–22.09).
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu haarassa pelikoodari/osa5-aukiot (b744c680b, puhdas).

## 0. TEHTY TÄLLÄ VUOROLLA
- OSA 5 AUKIOT valmis: Mac-pari v3 (lähtö -68,-368 itään; v1/v2 hylätty sk-virheinä), PT 224.44.pt-ok kärjelle 6+11+8+5 b744c680b,
  JU vei linkkiin 224.44 (22.09, juna d428ae14d), kokeiltava KK:lle. Pari: proto-3d/_tyo/pelikoodari/osa5-aukiot/pari-v3/.
- Renkaat-rivi suljettu (KK: vanha, omistaja kelpuutti 6.11.). Worktreet natiivi-nimiaanet-yhd ja natiivi-pulu-v4 poistettu.
- UUSI TYÖ (PT 22.1x, KK:n rivi "Juoksupeli: puuttuvat seinät ja rakenteet (omistaja 17.30)"): KARTOITUS 1 tehty
  proto-3d/_tyo/pelikoodari/seinat-taso1/kartoitus/LISTA.txt (ajo lokit/pk-seinat-taso1-reitti-b744c680b, sk sk-mac-taso1-reitti.txt md5 638663ac6426).
  PT:lle ja LAV:lle (local_f12c9179) lähetetty 22.2x: M1–M8 LAV:lle, P1–P2 minulle.

## 1. SEURAAVAKSI
1. LAV:n vastaus: mitkä M-kohdat jo sen jonossa; jos jokin onkin pelin kokoonpanon vika → minulle.
2. P1 ovikehys irti seinästä r49 (−232,0; 509,9): ovien sijoitus JuoksuSokkeloMaailma.Ovet (osa 8). Selvitä `ui juoksupeli mika x z` / ovien lista.
3. P2 puut ilman latvusta r55 (−283,6; 524,5): lähipuut/kaukopuut-kokoonpano vai puupaketti.
4. KARTOITUS 2: eteläosa (maalin aukio 6,4; −190,7 ja reitti sinne) – botti kiersi pohjoiskujia. Esim. lahto -134,294 e tai botti + useampi siemen.
   Järjestelmällinen aukkomittaus: `ui juoksupeli tarkastelu kierros 40 400 20` (JuoksuTarkastelu; LAV käyttää, kansio-komento lokeihin).
5. Lista + kuvat PT:lle ensin, sitten korjaukset; ennen|jälkeen-arkki KK:lle tiedoksi.
6. Huomenna isolla iPadilla: aukiovideo (lähtö -68,-368 i), renkaiden uusinta (191aaeaf2).
