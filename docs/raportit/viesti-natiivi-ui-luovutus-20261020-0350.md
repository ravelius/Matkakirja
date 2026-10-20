# Natiivi-UI: luovutus 20.10.2026 klo 03.50 (Postivahti: kova raja 38 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -20261020-0050:n (sen "Opit" ja simupolut yhä voimassa; lue sieltä vain Opit).
Id:t /Users/Shared/Claude/osoitekirja.md (PT local_8d8ebf72-…, JU local_24e63224-…, NS local_fcc10552-5810-49bf-b0cf-188456f1231c,
KK local_8e4fcfed-…, LT local_36a45147-…, PK local_11aca9cd-…). Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen SIMU VAPAA JU:lle.
Ajoskriptit ja skenaariot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ajo-*-207.zsh, sk-*-207*.txt).

## ENSIN (järjestyksessä)
1. **SIMU NYT JU:lta (arvio ~03.57, ~16 min): näkyvä lasi ennen 207:n lukitusta (PT 03.3x).** Lasihaku b8198b4e3 on JO junassa 207.
   Aja `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-lasi-nakyva-207.zsh` (iPhone + iPad × ennen/jälkeen;
   ennen = _tyo/julkaisija/sokkelo-yhteinen14-207-app b9348d05, jälkeen = _tyo/natiivi-ui/lasihaku-207-app 8a541e27; skenaario
   sk-lasi-nakyva-207.txt: G1 oppaan Kysy-ikkuna `ui opasvalikko kysy`, G2 museon i-kortti `tap-teksti i`; `ui lasi tila` → lasilla ≥ 1).
   Tarkista kuvaparit G1/G2 täysikokoisina → KK + kopio PT. Jos lasi PUUTTUU jälkeen-ajossa (lasilla 0 tai kuva ilman sumeaa lasia)
   → HETI NS + PT. Skenaariota ei ole vielä ajettu: jos `tap-teksti i` tai `ui opasvalikko kysy` ei toimi, korjaa skenaario ja aja uudelleen.
   Lopuksi SIMU VAPAA JU:lle.
2. **ISS-207 KK:n kolme korjausta VALMIS KOODI natiivi-ui/iss-207 ee86e4fdd** (Opus-agentti 03.59; unity-tarkistus 0, kielivahti ok,
   IssPimeanKautta 3/3, Astronautti/Kyyti/Kupoli-testit läpi; EI simua). KÄÄNNÖSPYYNTÖ JU:lle 03.59 → _tyo/natiivi-ui/iss-207b-app.
   1) katse revontulten verhoihin saavuttaessa (Revontulet.cs:509, AstronauttiKerros.cs:1159/1308, AstronauttiLinssi.cs:321; loki
   "kupoli: katse revontulten verhoihin …"; musta odottaa käännön + 0,3 s); 2) pienoispallon napautus tarkistaa ensin taivaskohteen
   (Sijaintipallo.cs:455, AstronautinNakyma.cs:201; loki "→ skanneri (pienoispallon edeltä)"); 3) mustan aikana LCD vain määränpää
   (AstronauttiLinssi.cs:1223, IssOhjaamo.cs:1085) + aikahyppy ja aluksen siirto mustan takana HETI (kuten vähennetty liike;
   AstronauttiLinssi.cs:310/395, IssKohdevalikko.cs:970) → musta lyhyempi. SIVUVAIKUTUS (kerro KK:lle kuvien kanssa): pienoispallo ei
   näytä aikahyppyä mustan aikana, kertojan saapumisrepliikki tulee heti. Katse jää verhoihin seuraavaan kohteeseen (omistajan 14.10.
   sääntö; tuplanapautus palauttaa). Aluksen ollessa soikion päällä katse voi osoittaa alas → katso kuvista.
   SIMU NYT:sta: `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-museo-iss-207.zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/iss-207b-app iss`
   (skenaario päivitetty: katse-oleta, "nimelle ruudulla", Jupiter pienoispallon kautta). Vertaa "pimennys häivyy NNNN ms" aiempiin
   7535/6537/4268 ms. → KK + PT; OMISTAJALLE AAMULLA (KK): valikkopari (B) + ISS:n iPhone-video (musta siirtymä + salama).
   KK:n OK:n jälkeen NS:lle junaan 207: natiivi-ui/iss-207 ee86e4fdd (+ myöhemmät).

- JU 04.0x: iss-207b ee86e4fdd jonossa L2:lla (~04.10) → _tyo/natiivi-ui/iss-207b-app (loki julkaisija-tyokalut/nui-iss-207b.log).
  Simujono: PK → LS video → NUI: lasi (~16 min) + iss (~10 min) SAMALLA vuorolla → VS → KS. SIMU NYT tulee tälle (seuraavalle) sessiolle.

## VALMIIT TÄNÄÄN (20.10.)
- **B museo-valikot-207 7a45cff6f**: KK OK 03.5x → NS:lle junaan 207 lähetetty 03.5x (museossa ei ⚙:ta, ☰:ssä Tekstitys + Mikseri kehittäjälle).
- **lasihaku-207 b8198b4e3** (LT:n BUILD 206 iPad 25–42 ms ~2×/s): Lasipohja.Etsi + KehysNapit.Hae/PidaNakyvissa ilman Querya ja
  0,5 s ajastinta → Rakenne.Seuraa/Luokka (AttachToPanelEvent); vartija Linssit-testit/Testit/UiSeuratutLuokatTestit.cs 4/4.
  LT iPad Pro 13 (laiteäppi NS): nykäys POISTUI (A1 41 → 2 pitkää ruutua, p99 33,2 → 16,9; jäädytetty 21 → 0). NS:n rungossa 207.
  Simu: kehysnapit 22/11 ryhmää, lasipaneeleja 30, himmennys toimii; näkyvä lasi = kohta ENSIN 1.
- Kehote "Kiinni! Napauta nopeasti": PT 02.0x jätetään ennalleen (omistajan 14.10. 21.42 lausesääntö).
- E simu 03.3x: iPad kaikki OK (todistus-iss-207-ipad-20261020-0334), iPhone OK paitsi korjauskohdat 1–2.

## Worktreet (proto)
museo-valikot-207 (NS:lle lähetetty), iss-207 (työn alla), lasihaku-207 (junassa 207 → poista 207:n lukituksen jälkeen),
lisäksi -0050:n listan vanhat (palsta-haku, varjostimet, logo-aani-206, aarnin-kolme: poista 206:n/207:n lukituksen jälkeen
`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`), aarrevideo (odottaa Codexin videota päivällä), uni-smaragdi-204.

## Opit (uudet)
- zsh ei pilko `${2:-a b}`-oletusta sanoiksi silmukassa → `${=${2:-a b}}` (1. ajo meni väärällä parametrilla).
- Kehysnappien himmennys nielee simun napautuksen (omistajan 17.10. sääntö) → skenaarioon `ui kehysnapit 0` ennen napautustestejä.
- Lasipohjaa ei tule koko ruudun sivuille (mk-opas-aloitus) eikä peruskartalle (omistaja 17.10.) → todista lasi linssin kortilla/paneelilla.
- Simu ei näytä iPadin CPU-piikkejä (LT:n iPhone-simu 0 pitkää ruutua) → ruutuaikamittaus laitteella LT:llä (NS tekee laiteäpin).
- `ruutuaika-analyysi.py nimi=mittaus.txt …` antaa p99, >25 ms ja pitkien ruutujen välin (0,50 s = jaksollinen ajastin).
