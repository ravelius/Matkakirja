# Natiivisepän luovutus 15.10.2026 klo 22.1x (Postivahdin KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna196/jono-196.txt, juna195/jono-195.txt.
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (PT = local_5df52e10-…, Julkaisija = local_5cb16c00-…, KK = local_dfa7296a-…).
PT:lle ≤ 3 riviä. Asemataulu: https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (talo/eteneminen, nyt v23 "Juna 195 2/5" – Julkaisija päivittää TF-vaiheet).

## TILA

- **BUILD 195 LUKITTU 21.46** (omistaja pyysi julkaisua 21.35 "Junan voi julkaista heti kun kaikki valmiina. Ei testejä"):
  proto master **64e1efcd1f6f6d697edf33ed4d75590f4bfdf06f** (juna/b23 = runko c84f140ef, L1 be183a634, Unity **6000.7.0b5**), muutosloki #4662 M **1a60554b1**.
  iOS TF Julkaisijalla (tf-kaynnista.sh 195). **Mac 1.1 (195) TF 38789113677 SUCCESS 22.02.** Muistiajo OHITETTU (julkaisija-tyokalut/muistiajo-195.txt).
  Lukituksesta ja TF:stä rivi lähetetty PT:lle ja KK:lle.
- **Unity b5**: asennettu /Applications/Unity/Hub/Editor/6000.7.0b5 (symlinkki /Users/Shared/Claude/unity/6000.7.0b5), unity-polku.sh tuntee b5:n.
  kirjastot-6000.7.0b5 → wt/proto-natiiviseppa-unity-b5/Library (T7; EI poisteta, unity-tarkistus käyttää). b4 siirretty T7:lle symlinkin taakse
  (/Applications/…/6000.7.0b4 ja unity/6000.7.0b4 → /Volumes/T7 4TB/koodaus/Unity/6000.7.0b4). Unity-beetaseuranta: CronCreate "4 9 * * *" on
  istuntokohtainen → luo uudelleen ja aja unity-julkaisut.py kerran.
- **Juna 196 -runko** natiiviseppa/juna-196 (wt/proto-natiiviseppa-ehdokas) = **6708dfa92**, testit 1892/586/494 vihreät, tarkista 0, PT kuittasi.
  Sisältö BUILD 195:n päälle: LS1 ce4492460 (yötaivas + Black Marble -yövalot), Siirtoseppä e776bb186 (⊃ NUI f3ae6d32e), Valoseppä 8d7f26d05 (revontulet,
  Revontulet.Uudet pois), NUI 572050cf6, KS 57db72c6d, PK 30e07d6f1, PK 5dfbe9f22 (⊃ ba2778726 – PT:n "osa 2" on jo mukana), LS1 c846d5e90,
  Valoseppä 240357565 (CupolaAurinko = true, PT: jää päälle), NUI 7f4f91fb6 (tulivuoret mukana, Tulivuoret.Kaytossa = false).
  Testiajo: `zsh juna196/testit196.sh` run_in_backgroundilla.

## SEURAAVA ASKEL (heti)

**OMISTAJAN PÄÄTÖS 22.05 (PT välitti kahdesti): avaa rungossa 196 kytkimet PÄÄLLE:** NIMET-nappi (IssKohdevalikko.NimetNappi, nyt `static bool nimetNappi` = false),
kohdevalikon uusi ulkoasu (21.03/21.07 – tarkista onko sille oma kytkin NUI 7f4f91fb6:ssa; jos ei, se on jo päällä), skannerin taivastila
(AstronauttiKerros.TaivasSkanneri, nyt false), paras hetki (IssParasHetki.Kaytossa – tarkista oletus) ja nimen korostus (KupoliNimet.Valittu, Siirtosepän
asetus). **Kohokohdat (IssKohokohdat.Kaytossa) ja tulivuoret pysyvät kiinni.** Tee yksi NS-commit rungon päälle ("Juna 196: omistajan 22.05 kytkimet päälle"),
aja testit196, rivi PT:lle. Odottaa: Valosepän tulivuoret/salamat vasta ilmoituksesta; juna 196:n lukitus vasta omistajan pyynnöstä.

## OPITUT 15.10. ILTA

- Toisen roolin "PT kuittasi" → vahvista PT:ltä (toimi taas: 79fe06d98, 06072c1c0, 7bca41c41, 473d566ca, ce4492460).
- Haarojen kärjet sisältävät usein muiden rooleja (NUI-kärki toi Valosepän tulivuoret) → `git log HEAD..<kärki>` ennen yhdistystä, poikkeamat PT:lle.
- AsetteluTesti.cs:n nimilista ja LinssiOhjain.cs:n komentoketju ristiriitaavat lähes joka yhdistyksessä: säilytä molemmat (lista unionina, else-if-haarat
  peräkkäin, sulje aaltosulut oikein).
- Muutoslokityökalu laskee "?"+välilyönnin lauseen lopuksi → napin nimi lainausmerkkeihin ”Mikä tämä on?”.
- lukitse-b:n peilipush voi hylkäytyä, jos peili/proto/master on jo päivittynyt (hook) → pushaa juna/b23-refit erikseen.
- Cupolan ennakkotesti oli kelloriippuvainen (korjattu LS1 6f27c5ad6).

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-196 6708dfa92, puhdas), wt/proto-natiiviseppa-unity-b5 (T7; natiiviseppa/unity-b5 df4ba730b, kirjastot-b5 – ei poisteta),
wt/proto-natiiviseppa-tyokalut (YHTEINEN – ei poisteta), wt/proto-natiiviseppa-unity67 (kirjastot-b4). Haara natiiviseppa/juna-195 = BUILD 195.
