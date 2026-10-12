# Pelikoodarin luovutus 12.10.2026 ilta (~19.2x, tilinvaihto)

Kaikki alla on junaa 184 (omistaja 15.0x: "tee kaikki junaan 184. kerron kun se julkaistaan"). Julkaisu vain omistajan pyynnöstä.

## Kuitattu junaan 184 (PT) ja välitetty NS:lle

- **Pallokisa** (proto pelikoodari/pallokisa-184, worktree /Users/Shared/Claude/wt/proto-pelikoodari-lautapeliopas):
  7ed08d802 (äänet + tulostaulu), 528ec19c0 (KehittajaKoe, NUI cherry-pickasi), 9d2567502 (Pulun selostus lipun takana,
  pallohuone joka ruutu UiKerros.JokaRuutu, kisan rivit peli-lokiin), 037029f84 (yhteislähtö: KisaKello.Lahto kirjaa palvelinajan
  ennen muunnosta, rajaus 0–30 s). NS yhdisti 9d2567502:n (juna-184 873b9461c); 037029f84 välitetty 19.2x.
  NS yhdisti 037029f84:n (juna-184 f03911def). LT ajaa uusinnan 2 kahdella laitteella (A/B, retkikunta). Uusinnassa 1 verkko toimi ja huone aukesi, mutta lähtö oli rikki
  (korjattu 037029f84:ssä).
- **Kipin soittolista** cc49cbc1d / 23e810949 (juna-184 fe6e13e3b), PT kuittasi 19.1x simuluvuilla
  (lokit/pelikoodari-kippi-184-1908c: väistö 0,06 → 0,02 puheen ajaksi, kappale vaihtuu, kaupungin maisema palaa).

## Odottaa simukuvia ja PT:n kuittausta

- **Pulun vastausrepliikit + aarteen jäljen piste** (proto pelikoodari/pulu-vastaukset-184, worktree
  /Users/Shared/Claude/wt/proto-pelikoodari-pulu-vastaukset, juna-184 873b9461c:n päällä):
  be540aba0 (Peli/PuluVastaukset: arvonta ilman peräkkäistä toistoa; Kysely.Vastaa/AikaLoppui + Kaupat.Minitehtava ilmoittavat,
  ei pallokisan palkintoa; UI/Pulu/PuluVastausAani 0,7 s viiveellä Pulu.Sano naytaAina, ohitetaan jos kertoja/Pulu puhuu;
  tekstit ui.fi.json ui.pulu.vastaus.*; komento `pulu vastaus oikea|vaara|jalki`), 17dea8461 (Karttapisteet.Aseta(...,
  vaistaaKaupunkia): piste kaupunkimerkin viereen, napautettava; syttyessä Jalki-repliikki, joka voittaa oikea-repliikin),
  38a945444 (rivit peli-lokiin). Testit Peli 550, Kartta 481, tarkista 0.
  KÄÄNNÖS + SIMU NYT saatiin 19.1x (linja 2): käännös proto-kaanna.sh, loki
  proto-3d/lokit/pelikoodari-pulu-vastaukset-kaannos-1917.log, sitten todisteajo
  proto-3d/tyokalut/pelikoodari-ajot/pulu-vastaukset-todiste.zsh pelikoodari-iPad13 <app> <ulos> (appi asentuu
  käännöksessä simuun; .app-polku käännöslokin lopusta). Kuvat (piste Ateenan vieressä, kupla,
  ääni) PT:lle. Ilmoita Julkaisijalle LUKKO VAPAA ja SIMU VAPAA.
- **Raha-animaatio**: NUI teki (natiivi-ui/raha-animaatio-184 dc05200b4), NUI lähettää ennen | jälkeen -tallenteen PT:lle.

## Äänet (kaikki viety ämpäriin vie-paketti.sh:lla, ääniportti 0 hylättyä)

- Shakki: 8 Williamin puhetta → aanet/pelit/shakki-v1 (94 kr); kytketään #4504:ään (juna 185+). Äänisivun Odottaa-osiossa.
- Pulun kisaselostus: 74 leikettä → aanet/pulu/kisa-v1 (254 kr), kytketty (9d2567502). 25 näytettä äänisivulla.
- Pulun vastausrepliikit (SK #4526): 23 → aanet/pulu/vastaukset-v1 (113 kr), kytketty (be540aba0). Äänisivulla.
- Generaattorit: proto-3d/tyokalut/pelikoodari-ajot/{shakki-puhe,pulu-kisa-selostus,pulu-vastaukset}.py.

## Selvitetyt

- ISS-radio Sojuz 2013 on jo listalla (235b230ba, juna 182).
- #4514 (Rita): tervehdysluennalla ei ole ääntä → merge sellaisenaan.
- Aikaleimat: kaikki 47 täsmäävät webin versioituihin Horatio-äänitteisiin (js/media.js VERSIOIDUT_HORATIO_AANET).
  Ämpärin perusavain audio/<nimi>.mp3 on vanha 45 luennassa. **Kun #4516:n Kuuntele-tehtävät kytketään, liitteeksi täysi
  versioitu osoite** (Aarretehtavakortti hyväksyy http-liitteen). Kysymykset ovat sellaisenaan oikein (SK:lle kerrottu).

## Jono

1. pulu-vastaukset-184:n simukuvat PT:lle (yllä) → kuittaus → SHA NS:lle.
2. aarre-lajit-184 (wt/proto-pelikoodari-aarre-kayttoon, 99c8a1a17 + f2ca205b3): palkkiot × 0,4 ja Kartta-laji, SHA NS:lle
   kun PT kuittaa (NUI tekee Kartta-kuvat).
3. linna-aanet-184 0c361ebeb: linnahaaraan, kun PT sanoo, että se on vapaa.
4. #4516 erä 4 kytkentä (versioidut osoitteet), kun SK:n PR on hyväksytty.
5. LT:n pallokisa-uusinta 2:n tulos → korjaukset.

## Työtilat

Web-checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-yo), web-worktree
wt/pelikoodari-kultaiset-184 (pushaamaton muutos tiivisteet.json, ei kiirettä). Proto-worktreet: lautapeliopas (pallokisa-184),
pulu-vastaukset, aarre-kayttoon, linna-aanet. Levysiivous 18.2x: 12 poistettu.
