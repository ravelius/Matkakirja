# Julkaisija: luovutus 3.11.2026 klo 07.20 (Macin kello) – konteksti 26 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-0352.md.

## Käynnissä JU:n taustalla (nollaus tappaa ne – seuraaja tarkistaa ensin)
1. **PT KIIRE: delta-perus 2026-09-30-pohja-20261015 palautus ämpäriin** (poistettu 31.10. säästöpaketissa → julkaistun TF 217:n
   ja junan 218 muuttumattomat pallolaatat z6–z10 404). Raportti: `git show a94a2e9e1:docs/raportit/karttaseppa-delta-perus-puuttuu-20261103.md`.
   - Skripti `julkaisija-tyokalut/palauta-perus-20261015.zsh`, loki `palauta-perus-20261015.log` (alkoi 07.02, 577 838 jpg, 64 rinn.).
   - Lähde T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/ruudukko-20261015/pohja` tarkistettu: 577 838 = perus-20261015.json.gz 1:1 (0 eroa).
   - Jatko katkenneena: aja sama skripti uudelleen (lippu `palauta-perus-20261015.aloitettu` ohittaa tyhjyystarkistuksen, sync ohittaa viedyt).
   - Valmis = "PALAUTUS VALMIS" + curl 6/2/30, 7/5/60, 8/10/120 perussa → 200. **Sitten rivi PT:lle (local_5df52e10) + KS + NS.**
   - Perus-laatat.json: ei tallessa; natiivi (juna-217/-218 Laattapalvelin.OnDeltaKansio) EI hae sitä (vain SileaUrl/PohjaPolku-kansio).
     PT:lle kerrottu 07.2x; tee vain, jos NS/PT näyttää 404-lokirivin (deltaton laatat.json = täysi sarja).
2. **L1: PK 218x-sarja** `PROTO_LINJA=1 zsh …/pelikoodari/sali-218x/ketju-x.zsh th yk cx tj ty cc ys` (th/yk/cx valmiit 07.11 mennessä).
   Jos kuoli: aja jäljellä olevat koodit uudelleen samalla komennolla. PK nollautui → tulokset luetaan kansiosta sali-218x/; rivi PK:lle.

## Linjat ja vuorot luovutushetkellä
- L2 vapaa 07.15 (VS tl5 valmis), ei jonoa. Iso iPad: runko 08aa2aa61 (NS palautti 05.05; JU asensi 04.56).
- Levy 83 Gi (PT siirsi lokit T7:lle).

## Tehty 03.52 jälkeen
- KS välitaso → `julisteet/pallo/laatat/2026-11-03-pohja-valitaso/` 06.08 (324 939 = KS:n julkaisukansio 1:1; palvelinkopio
  2026-10-26 + 28 212 sarja/ + laatat.json viimeisenä). Skripti vie-valitaso-20261103.zsh. KS + NS kuitattu.
- PR 6079 (KS valitaso-työkalut) mergetty 278afa13a, kun reitti + testit vihreät.
- Iso iPad runkoon 08aa2aa61 (devicectl install, ipad-lukolla).
- PK:n ketjut 218q/r/s/t/u/v/w/x L1+L2, VS pim2–pim8, hur3, tl1–tl5, s1; NS intron kuvapari (iPad), välitasokäännös + saapumisvideo (simu).

## OPIT
- Esikatseluketjun pysäytys: tapa koko prosessipuu (esikatselu.sh → Unity), muuten Unity jää orvoksi samaan projektiin (ppid 1).
- zsh: `echo ===` kaatuu (==-laajennus) → ketjutettu toinen komento jäi ajamatta; käytä `echo "---"`.
- zsh: `"$r:A…"` syö A:n (modifier) → `"${r}:polku"`.
- Kun toinen linja vapautuu, aja odottava PK-ketju siellä (L1/L2 sama skripti, PROTO_LINJA).
- R2 ListObjects ajon aikana voi antaa ServiceUnavailable (rinnakkaisuus 64) → ei vika, lopputarkistus laskee uudelleen.

## LISÄYS 08.10 (nollaushetki) – tämä korvaa yllä olevan "Käynnissä"-osion
- **Perus-palautus VALMIS 08.05** (577 838/577 838, curl 200); kuitattu PT, KS, NS. Ei jatkotoimia.
- **L1: PK 218y-sarja käynnissä** (alkoi 07.59): `PROTO_LINJA=1 zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218y/ketju-y.zsh xf th yk cx tj ty cc ys taso1b`.
  xf valmis 08.0x. Jos kuoli: tarkista sali-218y/*-v3.mp4 ja aja puuttuvat koodit samalla komennolla; tulosrivi PK:lle (local_91a1bc27).
- **L2: NS** (bf15af5a6 käännös + saapumisvideo, yhteinen iPad13-simu) käynnissä 08.0x → VAPAA tulee NS:ltä.
- **L2-jono NS:n jälkeen:** 1) NUI (local_43962c89) "KÄÄNNÖS NYT": PROTO_LINJA=2 proto-kaanna.sh 2d9ed2d93 + kuvat (~20 min, iPad13-simu),
  2) VS pim11 (bd3daf198, ~5 min) – tai L1:lle, jos se vapautuu ensin.
- Viety 07.29/07.40: LAV palatsi-esto-v38 ja kielletty-rakennukset-v118 (vie-paketti.sh). PR:t 6093 ja 6100 mergetty (ei checkejä docs-poluilla).
