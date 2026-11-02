# Natiivi-UI: luovutus 2.11.2026 klo 12.51 (9 tähteä, info+kioski, aarteen ydin ja haamu2 todistettu; PT:n kuittausta)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1000.md (PR 5966). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).
Aarre-commitit a9568fc20 + 586222bc5 ovat rungossa (natiiviseppa/juna-218 = 52ba93dea), joten edellisen jonon kohta 1 on tehty.

## Proto-haara natiivi-ui/piirros-tahdet-218 (wt/proto-natiivi-ui-piirros-tahti, rungon 52ba93dea päällä)
- **bab2834c5 tähdet (C)**: PiirrosKerros.Tahdet.cs (partial): KS:n paketti _valmiit/pariisi-tahdet-20261102 (Codex f84dfb5b4, omistaja 10.48).
  72 ruutua 12/s, tähti i alkaa ruudusta i·8, hehku alle, 48 lähitason px (~48 m) kiinteä, sama varjostin/häivytys; Kadonneet pois →
  ei tähtiä; Joutosykkeen kello (levossa pysähtyy kuten veneet). Kuvat `<kansio>tahti-20261102/`. Napautus: PiirrosKerros.Napautettavat →
  NostotKartalla.PiirrosKohdeOsuma → Kohdenostot.Avaa("kohdekartta:pariisi:<nimi>"). Testikomento `komento tahdet [on|pois|nayta i [k]]`.
  Merkittavat.json: Forum des Halles (Q939893, 48.8622 2.3461; Wikidatassa 7 kieliversiota eikä fi-nimeä → sl 8 = alaraja; PT 08.5x).
- **e100c991e info + kioski (G)**: PiirrosKerros.Leikkeet = turistiinfo + lehtikioski (napautus-kenttä; näkyvät kytkimestä riippumatta),
  kuvat `leikkeet-20261102/`; napautus → turistiopas (LehtiSisalto.HaeOpas → Nahtavyydet.AvaaOpas) / kaupunkilehti (PeliOhjain.LueLehti).
- **1fd576f02 aarteen ydin**: Valopiste.shader: piirroksella (_Reunus) ytimen vaalennus pois, kylläisyys ×1,6.
- **d6331330e TasoVersio = "haamu2-20261102"** (PT 12.4x; korvaa aukio- ja haamu-20261102:n; JU vei 12.47).

## Todistus (yhteinen-iPad13, simu-lukko.sh kaari, käännös 1fd576f02 linja 2)
proto-3d/lokit/todistus-tahdet-a-1fd576f02-20261102-1245: OK, 0 poikkeusta. Tähdet 72/72 + hehku ladattu, pyörivät (video
tahti-pyorii.mp4), napautukset: tähti → Palais d'Orsayn nosto, info → Matkailijan Pariisi, kioski → kaupunkilehti; Kadonneet pois → ei
tähteä; aarre auki kuvassa 8. Paikallinen kansio proto-3d/_tyo/natiivi-ui/tahdet-testi-20261102/ (symlinkit: haamu-laatat + veneet +
leikkeet + tähdet; SIMCTL_CHILD_MATKAKIRJA_PIIRROS). Skriptit kopioitu todistuskansioon (kaanna-tahdet-a.zsh, tahdet-a.txt).
Kuvat PT:lle 12.5x: kuva-arkki.png + pari-tahdet-lahella.png. Huomiot PT:lle: tähti 48 m → 4–6 km:stä vain piste; Orsayn taidemuseon ja
Palais d'Orsayn kyltit päällekkäin; tähdet pysähtyvät levossa.

## SEURAAJAN JONO
1. PT:n kuittaus tahdet-a:lle → merge-pyyntö NS:lle: natiivi-ui/piirros-tahdet-218 d6331330e rungon 52ba93dea päälle (4 committia);
   JU:lle tähtien PNG:t (_valmiit/pariisi-tahdet-20261102/tahti-20261102 → piirroskartta/pariisi/tahti-20261102/) ja leikkeet
   (_valmiit/pariisi-info-kioski-20261102/leikkeet-20261102 → piirroskartta/pariisi/leikkeet-20261102/): ämpärissä 404 klo 12.3x.
   PT voi pyytää isompaa tähteä kaukaa tai kylttien väistöä (Orsay).
2. PT:n järjestys jatkuu: B nostot lajimerkein piirrokselle, F Avauskortti + kutsuminiatyyri pois, E saapumiszoomaus (ks. luovutus 0930 kohdat 2–4).
3. Jos jono tyhjä: rivi PT:lle "JONO TYHJÄ: Natiivi-UI".

## LISÄYS 12.5x: PT:n kaksi korjausta ennen kuittausta (tähti pisteenä kaukaa ja levossa pysähtyminen OK)
1. Orsayn taidemuseo (Merkittavat) ja Palais d'Orsay (kadonnut ★-kyltti, Kohdenostot) päällekkäin (kuva 2b) → kadonneen ihmeen kyltti
   väistää tai eri kyljelle (NostotKartalla: kyltin kylki/väistö, Kohdenostot.Kadonnut; vrt. Kohdelaatikot-kalusteet).
2. Temple-tornin kyltissä pieni tyhjä laatta ★:llä ja nimi laatan ulkopuolella (pari-tahdet-lahella.png oikea) → nimi laatan sisään
   kuten muissa (NostotKartalla ~rivi 1719 `kadonnut = kyltti && nimi.Length > 0`, tähti 3d093444a; tarkista nimiön leveys/tyhjä nimi).
Tee samaan haaraan natiivi-ui/piirros-tahdet-218 d6331330e:n päälle, uusi simuajo (kaanna-tahdet-a.zsh + tahdet-a.txt todistuskansiossa,
vaihda SHA), uusi pari PT:lle → PT kuittaa NS:lle ja JU:lle.
