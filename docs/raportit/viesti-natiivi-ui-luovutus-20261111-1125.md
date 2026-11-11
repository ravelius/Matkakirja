# Natiivi-UI: luovutus 11.11.2026 klo 11.25 (kontekstivahti 27 %; korvaa -1027:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. TYÖTAPA: näkyvät suoraan KK:lle, PT kopiona.
Taustat (testikomennot, A–E): -1027, -0951, -0910 (haarat natiivi-ui/luovutus-20261111-*). Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo
(remote natiivi-backup; push `git push natiivi-backup HEAD:refs/heads/<haara>`), nyt haarassa natiivi-ui/pallo-mittaus.
Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null`. Odotus: bash-skripti, until loki.txt "valmis N s" (zsh-glob kaataa).

## 0. ESIKATSELUN TALLENNEVIKA (löydetty 11.1x, JU korjaa Esikatselu.cs:ää)
- Mac-esikatselussa ENSIMMÄISEN tallenteen jälkeen pelin ruutu jää 321×531:een (ennen 640×480) → kaikki sen jälkeiset kuvat ja tallenteet
  näyttävät UI:n väärässä paikassa. Tarkista aina loki.txt:n "kuva … pelin ruutu 640×480". JU:n lista: /Users/Shared/Claude/julkaisija-tyokalut/tallenne-ruutuvika-20261111.txt
- Epäluotettavat NUI-ajot tänään: napautus-lento-1/2, lento-3 (b, c), sauva-1 c5, katse-1/2 b-osa (b1–b5, tallenne b-eiffel), pallo-maa-1/2 (j).
  KK:n "A+B kunnossa" perustui osin näihin → AJA UUDELLEEN katse-2 (2c75bcf22) ja lento-3, kun JU ilmoittaa korjauksen; KK:lle ja PT:lle luvattu.
  Kunnes korjattu: yksi tallenne per ajo, tallenteen jälkeiset kuvat eivät kelpaa.

## 1. PALLOVIKA – RATKAISTU, KK:lla
- pallo-maa-1/-2:n "Grand Palais" -siirtymä (~343 pt) = tallennevika (j kuvattiin e:n tallenteen jälkeen), EI koodivika.
- Mittaukset (haara natiivi-ui/pallo-mittaus 6ab7d27b0 = 27ef4dd78 + `ui kaupunkipallot tila` -rivin MITTAUS; vain mittausajoon, EI junaan):
  mittaus-1 (lokit/nui-pallo-mittaus-1-6ab7d27b0) ja mittaus-2 (…-mittaus-2-6ab7d27b0, liikesarja): napin ankkuri = RuutuPiste(pinta) joka
  liikkeessä; pinta 90 m siirtää vain 9 px pystyyn.
- pallo-maa-3 (lokit/nui-pallo-maa-3-6ab7d27b0, j ensimmäisenä tallenteena): köyden pää pysyy Tuileries'n puutarhan pohjoisreunalla kaikissa
  liikkeissä → oma OK, viety KK:lle (j-jalkeen.mp4, arkki-j-k000-740.jpg, parit). KK OK → 27ef4dd78 (natiivi-ui/pallo-maa) junaan JU:n kautta.
- 3D-pallo 8923f43b9 (natiivi-ui/pallo-3d) KS:n KJ37:ssä: tarkista, onko KJ37:n kuvat tallennevian jälkeen.

## 2. Matkaopas-2 – viety KK:lle 11.0x (m2b = juttu, m3 = avattu sivu). Odottaa KK:n palautetta.

## 3. kohteet-arkki-1 (17ddd9e1c) – JU:lla käynnissä 11.15 alkaen → lokit/nui-kohteet-arkki-1-17ddd9e1c (60 kuvaa, ei tallenteita → kelpaa)
- Tee arkit: montage 5 saraketta (alku/90/180/270/lähin) × 12 riviä, sips -Z 1000 -kopiot → KK:lle ja KS:lle, PT kopio.
  Orsay: tarkista lokista, avautuiko esitys (`ui kohdenostot napauta Orsayn taidemuseo`). Sitten KK:n kohta 3 (kohdekohtainen lähin, jos tarve).

## 4. NS:n pyyntö (11.2x): saapumiskokeen kohta 6 = asettelu (kuvat lokit/natiiviseppa-saapuminen-mac-3/s6-luenta.png, s7-luennan-jalkeen.png; kelpaavat, 640×480)
- (a) Ohita Turisti-infon päällä (s7): DIAGNOOSI VALMIS. Luentakuvasarja.AsetaPaikka käyttää Kaistale = Matkakirjakortti.Rajat; kaupunkinäkymässä
  MNappina → Rajat = MRajat() (kirjaikoninen M-nappi vasemmassa yläkulmassa) → yla = M.yMax + 12 ≈ yläreuna → Ohita (right 28, top yla) nousee
  oikeaan yläkulmaan Lehti/Turisti-info-rivin päälle. KORJAUSEHDOTUS: Kaistaleeksi vain auki oleva lappu (ei M: Rajat ilman MNappina-haaraa tai uusi
  KaistaleRajat), muuten p.height × 0,28; lisäksi yla ≥ oikean yläkulman nappien (UiNakymat.Hae().Karttaselite: Lehti/Turisti-info, kompassi) ala + Vali.S.
  Koodi NS:n haarassa d7a60539d (Assets/Matkakirja/UI/Pulu/Luentakuvasarja.cs ~204–237, Matkakirjakortti.cs 90, 251–300). Tee NS:n haaran päälle tai sovi NS:n kanssa.
- (b) "luentapalkki ylävasemmalla jää valkoisen napin alle": valkoinen nappi = matkakirjan M-nappi (Ikonit.Viiva["kirja"], harmaa-kuulto). Lappu ja M
  jakavat vasemman yläkulman (lappu top = Ylapalkki.Varaus + 8; M = lapun vasen reuna). Lokissa luennan aikana vaihtoja: 4025 M-nappi, 4111 "lappu palaa"
  (isoisän luenta), 4310 M-nappi → lappu ja sulkeutuva/avautuva M päällekkäin. Videonäytteissä (saapuminen-koko k-2440…2680) EI vielä näkynyt; etsi
  kehykset 2700–2900 tai pyydä NS:n mac-4:n s5b-kuva. Ratkaisu todennäköisesti: kaupunkinäkymässä luennan lappu M:n viereen/alle tai M piiloon lapun ajaksi.
- NS korjasi itse peitteen aikaisen näkyvyyden (SaapumisPiilo).

## 5. Tiedoksi: KS:n koehaara karttaseppa/sc-osm-paikka 35c1dd1a1 muuttaa NahtavyysEsittely.KiinteatKierrot-rivin SC-keskipisteen (48.85539, 2.34503).

## JU:n jono (NUI): kohteet-arkki-1 (ajossa). SEURAAVA: 1) kohteet-arkki → KK + KS. 2) NS kohta 6 (a) korjaus + (b) selvitys. 3) Tallennevian korjauksen jälkeen katse-2 + lento-3 uudelleen → KK. 4) KK:n pallo-OK → JU junaan 27ef4dd78.
