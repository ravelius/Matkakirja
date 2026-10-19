# Natiivi-UI: luovutus 20.10.2026 klo 00.50 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -20261019-2050:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_8d8ebf72-…, JU local_24e63224-…, SK local_b9ca71c7-…, NS local_fcc10552-5810-49bf-b0cf-188456f1231c, KK local_8e4fcfed-…).
Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen SIMU VAPAA JU:lle. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad
F7513985-C8BC-4E97-8D29-9C9BD420E962. Simulaattorit ovat levyllä "/Volumes/T7 4TB/Simulaattorit/Sarja" (EI ~/Library/Developer/CoreSimulator).
Skriptit: SP=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/be0b3271-7275-4871-a066-0f3e2ff0600e/scratchpad
(ketju6.sh <tila> <kaannos-sha>; uudet tilat varjo2; cupola-pisin.py <konsoli-stdout.log> = Cupolan avauksen pisin ruutu).

## JONO (PT 00.4x: omistajan pyynnöt 00.40, junaan 207, JUOKSUPELIN JÄLKEEN – simuvuorot vasta juoksupelin jälkeen)
Pyyntö sanatarkasti: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/omistajan-pyynnot-20261020-0040.md (NUI:lle B ja E).
Kuvaparit/videot KK:lle (local_8e4fcfed-…), kopio PT:lle. Olemassa olevat pohjat; puuttuva pohja → PT.
1. **B natiivi-ui/museo-valikot-207 7a45cff6f** (pohja juna-206 dfa04d37f; proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-museo-valikot-207)
   VALMIS KOODI, EI VIELÄ KÄÄNNETTY: museossa ei ⚙:ta; ☰:ssä Tekstitys (kaikille) + Mikseri (vain kehittäjä, LinssiValikko.LisaaKomento);
   ☰-sivu auki → nimikyltti/kortit/i-kohdat/tekstitys piiloon. tarkista.sh ok. → KÄÄNNÄ JU:lta → simu skenaariolla
   tyokalut/todistusajo/skenaariot/museo-valikot-207.txt (iPhone + iPad; huom. Development-build = Kehittaja aina true, `ui pelaaja 1`
   pakottaa pelaajan) → kuvat mv1–mv3 täysikokoisina → KK + PT → NS.
2. **E natiivi-ui/iss-207** (pohja juna-206 dfa04d37f; worktree /Users/Shared/Claude/wt/proto-natiivi-ui-iss-207): Opus-agentti teki
   00.45– (siirtymä mustan kautta, revontulet + ukkonen, kohteen ja tekstin napautusalue). TARKISTA agentin commit `git -C … log -3`
   ja raportti (alla Tila); skenaario tyokalut/todistusajo/skenaariot/iss-207.txt. Sitten käännös → simu → video (musta siirtymä) +
   kuvat → KK + PT → NS.

## Tila 00.50
- E VALMIS KOODI **natiivi-ui/iss-207 81be0b791** (tarkista.sh ok, EI simua): juurisyyt 1) musta oli vain kohderuudukon napautuksessa –
  nyt kaikki paikanvaihdot (kohokohtakortit, tähtitaivas, ilmiöt, oma sijainti, ISS nyt, pienoispallon lukitus) mustan kautta;
  2) revontulten 3D-verhot olivat kytkimen takana pois + valitulla hetkellä ennuste väärässä kohdassa → verhot päälle, valitulla hetkellä
  soikio lasketaan auringosta Kp 5:llä (oikea data oikealla ajalla); ukkonen: Salama.shader/Salamat.cs kirkkaus 3,2→4,6, hehku
  0,35→0,5, kanava 2,2→3,0, tiheys 0,5→0,7; 3) taivaskohteen nimi kohteen alla mutta skannerin viiva alkoi 27 pt yläpuolelta →
  viiva kohteesta, osuma-ala nimi + kohde (≥ 44 pt), revontulissa verhoon. Skenaario tyokalut/todistusajo/skenaariot/iss-207.txt.
  PT 01.0x OK: verhot oletuksena päällä + valitun hetken Kp 5 (koodissa jo näin, ei muutoksia; simukuvat KK:lle, kopio PT). Yhä auki: ukkoskortti voi olla vaakarivin
  ulkopuolella (skenaario avaa komennolla); pimennys ilman sallittua lentoa = hetken musta (ei pohjaa).
- Käännöspyyntö molemmista (7a45cff6f ja 81be0b791) lähetetty JU:lle 01.0x; simut juoksupelin jälkeen.
- JU 01.1x: yhdistelmäkäännös 7a45cff6f + 81be0b791 L2:lla → /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/museo-iss-207-app (~01.20);
  SIMU NYT jonon lopussa (VS → KS → PK → NUI). Skenaariot museo-valikot-207.txt ja iss-207.txt (aja kummankin haaran worktreestä).

## VALMIIT TÄNÄÄN (19.–20.10., PT kuittasi, NS:lle)
- palsta-haku 03deb7b16 + SK #5015 tekstit e4c33a4fe → juna 206.
- varjostimet 28ef55f1e (kokoelma 53 varianttia/57 tilaa, Cupolan pisin ruutu 1200 → 500 ms) → juna 206 (lokit/todistus-varjostimet2-b3-ipad-…/TULOS-NUI.md).
- aloituslogo + siipisuhina e0f534e5a → juna 206 (mergetty dfa04d37f). Todiste lokit/logo-aani-ennen-jalkeen-20261019/ (video + LUE.md).
- PT:n kysymys juoksupelin loppukortin koosta iPadilla: vastattu (UI on pisteinä, kuten kaikki KORTTI-pohjan kortit; isompi = pohjan muutos → omistaja).

## ODOTTAA
- aarrevideo 73cbdc576: Codexin video siirtyi päivälle (omistaja 22.37) – EI aamulla. uni-smaragdi-204 51f326738: PT:n pyynnöstä.

## Worktreet (proto)
palsta-haku, varjostimet, logo-aani-206 (kaikki mergetty 206:een → poista 206:n lukituksen jälkeen `git -C
/Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`), aarnin-kolme (sama), aarrevideo, uni-smaragdi-204, museo-valikot-207, iss-207.

## Opit (uudet)
- **Käynnistyksen ääni + kuva samasta käynnistyksestä**: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-logo-aani-206.zsh
  <app-kansio> <nimi>: uusi bundle-id, `linssi-komento.txt` ("kaappaa 34 kaynnistys") Documentsiin ENNEN launchia (peli-komento.txt EI
  tunne kaappaa-komentoa), recordVideo + Unity-wav kohdistus seinäkellosta → video-aani.mp4. Natiivi-wav jää tyhjäksi (ok).
- Simu ei piirrä ruutuja pääsäikeen ollessa varattu (verhon loppuhäivytys näkyy äkillisenä) → häivytyksen todistus laitteella.
- Logoalueen kirkkaus videosta: ffmpeg crop + signalstats YAVG (proto-3d/tyokalut/natiivi-ui-ajot/logo-aani-aikajana.py <lokikansio>; kokoaja logo-aani-kokoa.py).
- Väärä id ei mene perille: ota id AINA osoitekirjasta (NS = local_fcc10552-5810-49bf-b0cf-188456f1231c).
