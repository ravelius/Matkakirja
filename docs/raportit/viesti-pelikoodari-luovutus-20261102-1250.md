# Pelikoodari: luovutus 2.11.2026 klo 12.50 – juna 218

Edellinen: -20261102-1225 (PR 5976). Syy: konteksti 25 % (pehmeä raja). Runko 218 = d85660f03.

## Valmista (proto, haara pelikoodari/kapea-reitti-218, wt/proto-pelikoodari-tausta-v99)
Ketju: d85660f03 → 5ae1b4a1f (kapea reitti) → 9d1e9a8a7 (eunukkikorjaus, v95) → **b0ea927c8** → **76ef8082c**.
- **b0ea927c8 kapea reitti verkkoon ylhäälläkin** (PT KUITTASI 12.4x). Salitallenteen JUMIN koodiosa:
  1) "ylhäällä ei käännytä" (Kokoa) piti PakotettuJatko-tyngän ja katkaisi reitin oman alle 3,5 m:n sivuaskeleen → hallin
     lattialla ketju katkesi. Nyt reitin omaa linjaa kulkevat kujat säilyvät (ReitinLinkki, vain kapeat ei-avoimet reitit).
  2) Kapean reitin alku/loppu jatketaan vapaata tilaa pitkin enintään KapeaPaaM 12 m (Pakotetut), jotta ne kohtaavat aukion linjan.
  Testi JuoksuPalatsiTestit.KapeaReittiKaantyyYlhaalla (kaatuu kummankin korjauksen ilman).
- **76ef8082c eunukkien tahti (omistaja 12.13, Raamattu 2.177)**: JuoksuV4Reitti.EunukkiKerroin(taso, S) kertoo osuudet
  VartijaSivultaOsuus/VartijaEdestaOsuus: 0,3 lähdössä → 1,0 900 m → 1,4 1 800 m; ×(1 + 0,35·(taso−1)); max 2,0. Sisätilat
  (profiilireitit, KevytSisalto) ennallaan ilman eunukkeja (taso 1 vain ulkona; taso 2/3 eivät vielä ole olemassa – sisätilaeunukit
  tehdään vasta tason 2 kanssa). Testi EunukkejaUseamminAjanJaTasonMyota. PT:lle ilmoitettu 12.47.
- Testit: 792/792 ilman juurta; v95-juurella 791/792 (ainoa = juuresta puuttuva palatsi-esto-v12, ympäristö). unity-tarkistus ei ajettu
  (vain Peli/-puhdasta koodia).

## Salitallenne – odottaa LAV:ia (PT:n päätös 12.4x)
- Diagnoosi (rasteri tulostettu): koko 养心殿-piha on suljettu saareke → karsinta poistaa koko hallin. Esipiha (kierretty x −112…−57,
  z 237–250) suljettu: 遵义门 (kierretty x −57…−54, z 248–250,5) rasterissa pohjan rakennus + muuri; takajalustan kaista (kierretty
  z 285,5–287,5, x −126…−61) seinien välissä, pohjoisessa takarakennus (taustan v99 seinät; esto-v24-koe tausta-v99 + v95 sama).
- PT päätti: LAV avaa 遵义门:n ja takapihan ulospääsyn (rakennukset v96 / esto-v25). LAV:lle lähetetty 12.4x tavoitepisteet pohjan
  kehyksessä: S-pää (−118,2; 244,9) → 遵义门 keski (−78,9; 246,3) → kadun linja (−74,4; 246,4); takakaista (−150,4; 281,0)…
  (−85,9; 283,3), lähin verkko lännessä (−161,2; 280,6) / solmu (−161,0; 275,5).
- JU vei kielletty-rakennukset-v96 12.44 (EI runkoon ennen salitallenteen kuittausta). Tarkista, sisältääkö v96 jo liitokset.
- SEURAAVAKSI: LAV:n ilmoitus → juuren linkit v96 (+ esto-v25) → diagnoosi (alla) → solmut hallissa → salitallenne JU:n vuorolla
  (HALLI_ALKU=-118.2,226 HALLI_MAALI=-119.1,300 pohjan kehys) → PT kuittaa 214 + kapea reitti + eunukit NS:lle.
- Diagnoosi: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/f9eec268-692c-4c2a-ae57-ca7ccad2c64e/scratchpad/ZZDiagHalli2.cs
  (kopioi Peli-testit/Testit/:iin, EI committoida): rasterikartta (. vapaa # rakennus M muuri E esto), reitit alueella, pakotetut linjat
  ja solmut naapureineen ilman karsintaa. Ajo: saman kansion aja2.sh <testi> <tulos> [esto] (juuri2 = juuri + palatsi-esto-v24-koe);
  aja.sh vanhalla juurella. Kierretty ↔ pohja: KanoninenKierto −2,0335°, keskus (16,56; −403,52).

## Jono
1. Salitallenne (yllä), LAV:n ilmoitus.
2. Bugi 2: aja korjaus-218/aja-218p.zsh vasta JU:n ESIKATSELU NYT -viestillä → piirtajat.txt LAV:lle (86f9a7201, wt/proto-pelikoodari-kivi-216).
3. Kapea reitti + eunukit: PT kuittaa yhdessä 1:n kanssa.

## Huomiot
- Proto-repolla ei ole originia (vain natiivi-backup-peili) → commitit jäävät paikallisiksi, kuten ennenkin.
- Worktreet: tausta-v99 = kapea-reitti-218 (76ef8082c), kivi-216 = piirtajat-218 (86f9a7201), muut kuten edellisessä luovutuksessa.
