# Pelikoodari: luovutus 10.11.2026 klo 16.33 (konteksti 25 %, pehmeä raja)

Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/latausruutu-225 (natiivi-backup), kärki d57afd0c3.
Edellinen: viesti-pelikoodari-luovutus-20261110-1431.md (kohdat 2–4 yhä voimassa, ellei alla toisin). HUOM: viesteissäni klo "14.5x/16.5x" -leimat
olivat arvioita; oikeat ajat ~14.40–16.33.

## 1. JUOKSUPELIN LATAUSJUMI HITAALLA VERKOLLA – ETUSIJA (PT 16.3x, omistaja 16.25 "juuttunut viimeisen keisarin latauskuvaan")
- SYY: omistajan näkemä jumi oli v131-ajo isolla iPadilla (8d22f34e4, pohja 66b550331), jossa EI ole latausruutuketjua (d42a45345 → 87a9d0e69).
  Loki lokit/pelikoodari-tausta-v131/konsoli-jumi-1626.txt: 121 × Request timeout; glb-esihaku 6 + kuvaesihaku 6 + etuala jakoivat hitaan
  kaistan (sama kuin v130:n 113 × curl 28) = hakujen tulva + hidas verkko. Hahmoa ei ohiteta → katkennut puyi.glb = pysyvä jumi.
- KORJAUS d57afd0c3 (87a9d0e69:n päällä, unity 0, pushattu): JuoksuVerkko.HaeOsissa – /hahmot- Range-osina 256 kt–16 Mt (palvelin 206 tarkistettu
  curlilla), katkennut osa uudelleen samasta kohdasta tauolla 1–8 s, kunnes valmis tai Poistu (Peru → Sukupolvi). Hahmon MKAV-kuvat
  JuoksuVerkko.Suojatut: ei ohiteta katkaisussa, epäonnistuneet uusitaan. Latausruudulla 20 s:n jälkeen (hidas/katkaistu/uusintoja) viesti
  palkin alla: JuoksupeliNakyma.HidasTeksti "Yhteys on hidas. Lataus jatkuu siitä, mihin se jäi – voit myös palata kartalle valikosta."
  (KK:n hyväksyttäväksi; PT:lle kerrottu). QA: `ui juoksupeli palatsi verkko katko N` (joka N:s hahmon osa epäonnistuu), `… verkko viesti S`.
  Palkki = valmiit kohteet (ennallaan), seisoo ison hahmon aikana – osien tavuja ei vielä lasketa palkkiin (mahdollinen jatko).
- JU:LLA: Mac-ajo sk julkaisija-tyokalut/sk-taysi/pk-latausruutu-d57afd0c3.txt (55 r, md5 fe1af21cd4b9) → lokit/pk-latausruutu-d57afd0c3.
  Tarkista: "verkko uusinta N … hahmot-", "verkko osissa valmis … uusintoja", "hitaan yhteyden viesti näkyy", l1-viesti-kuvassa teksti,
  l1-maailma Puyi pinnoitettuna, maailma valmis (odota-maailma 240). OK → JU:lle ok pienen iPadin laiteajoon d57afd0c3:lla (korvaa 87a9d0e69:n
  laiteajon; ruutu- ja äänitallenne) → pari PT:lle (ennen omistaja-20261110/juoksupeli-latausruutu-jumi-1247.png), KK:lle kuulonäyte + pari.
- PT kuittasi d57afd0c3:n suunnaksi. HidasTeksti KK:lle hyväksyttäväksi; ODOTA KK:n vastaus ennen junaa.
- iPad-sk valmis: proto-3d/_tyo/pelikoodari/juoksu-lataus/sk-ipad-pieni-latausruutu-d57afd0c3.txt (47 r, md5 3064164605f0; oikea verkko + ajo 2
  katko 3 ja Poistu) → lokit/pk-latausruutu-d57afd0c3-ipad; JU ajaa vasta PK:n ok:lla Mac-ajosta. Ruutu-/äänitallennetta ei fyysiseltä iPadilta.
- SEURAAVA ERÄ (PT 16.3x HYVÄKSYTTY): hahmot (hahmot-v6, 12 glb ~77 Mt + MKAV-kuvat) taustalla välimuistiin, kun pelaaja saapuu Pekingiin
  (JuoksuLeivottu.HaeGlb tausta=true / HaeOsissa; ei sovelluksen mukaan). Tee 87a9d0e69→d57afd0c3-haaran päälle.
- PJ4 (87a9d0e69 Mac) katsottu OK 14.4x: L1-PUUTE = viive 8 s × pakolliset haut (maailma 154 s, 4 s yli odotuksen), ei regressio.

## 2. MONTPARNASSE 20f6e6073 – VALMIS
iPad-kuva katsottu (lokit/pelikoodari-montparnasse-ipad/a1-aloitusnakyma.png), PT ja KK kuittasivat, MR20 JU:lla junaan 224, linkki 224.30 PT:n
pt-ok:n jälkeen. Ei työtä.

## 3. LYON (nimi-zoomaus-224, 2997f7c80)
PA katsottu: Lyon terävä 30 s:ssa, mutta nimiä ruudulla 0 ja pilleri "Iso-Britannia" (KaupunkiNakyma.Nimea → NostoKerros.NykyinenMaa, Lyon ei
pelin kaupunki). Pariisi OK. Syyajo PC (sk pk-lisakaupunki-c-2997f7c80.txt, 33 r, md5 c1ef3e68edb1: nimet ehdokkaat/laske/etsi + ui
kaupunkipilleri) JU:n luovutuksessa 082530785 → lokit/pk-lisakaupunki-c-2997f7c80. Katso syyrivit; pilleriin ehdotus: ZoomaaPaikkaan asettaa
KaupunkiNakyma.Ohita(null, noston nimi) kuten NostonLento.

## 4. TAUSTA v131 (8d22f34e4)
Ajo isolla iPadilla jumittui (yllä); JU:lle sanottu: pysäytä, uusinta kun verkko normaali (taivas-curl < 3 s). Ehdolla: v131 olisi syytä ajaa
käännöksellä, jossa latausruutuketju on mukana (rebase d57afd0c3:n päälle), muuten hidas verkko jumittaa uudelleen – kysy PT:ltä.

## 5. LEVY (PT 16.2x)
_tyo/pelikoodari: paketti-v1–v4, pariisi-nimet-20261109, juoksu-223 (~6 G) siirretty NAS:lle
Matkakirja-arkisto/pelikoodari/_tyo-20261110 (rsync --remove-source-files; kaikki 5550 tiedostoa siirtyivät, lähteeseen jäi 0; NAS:n luvut ~2× = ._-tiedostot). Aktiiviset jäävät (paketti-v5, lahde,
astcm, lontoo*). Omia valmiita worktreejä ei ollut (vain aktiivinen proto-pelikoodari-juoksu). PT 16.3x: levy jo 55 Gi, tavoite täytetty; siirto ajettiin silti loppuun (ei kiire).

## LISÄYS 16.4x (kärki nyt c62818943)
- e429f450f: HidasTeksti OMISTAJAN PÄÄTÖS 16.36 sanatarkasti "Yhteys on hidas. Lataus jatkuu siitä, mihin se jäi. Voit myös palata kartalle
  Poistu-napista." (KK-hyväksyntää ei enää tarvita tekstille).
- PJ5 Mac d57afd0c3 katsottu (lokit/pk-latausruutu-d57afd0c3): Puyin osat jatkuivat kohdasta (7168/8778 kt), viesti näkyi 20 s:n kohdalla (l1-viesti:
  pieni teksti palkin alla taivaalla – luettavuus omistajan kuvasta), maailma valmis, Poistu → kartta. VIKA: JuoksuHahmot.Hae haki myös maailman
  tiedostot (kivi.jpg 22 uusintaa / 195 s, json) osissa → c62818943: osissa vain Valttamaton (/hahmot-). unity 0.
- Avoin: maailma valmistui ennen kuin puyi.glb oli valmis (viimeinen uusinta riviltä 3142 latauksen loputtua 2975) → tarkista, mihin puyi.glb
  vaikuttaa (alkulento ilman Puyita? vai puyi-perus käytössä) laiteajon kuvista.
- JU:lle OK: PJ6 pieni iPad c62818943:lla, sk-ipad-pieni-latausruutu-d57afd0c3.txt → lokit/pk-latausruutu-d57afd0c3-ipad. Tulos → pari PT:lle.
- 16.45: Telian kuituvika (omistaja 16.38), Mac ja iPadit puhelinverkossa. PJ6-sk muutettu pakotetuksi katkoksi (ajo 1: katko 3, viive 2,
  latausraja 30; md5 939c1cdc4b2e, 57 r). PJ6 (c62818943) ja v131-uusinta (8d22f34e4, ei latausjumikorjausta) odottavat JU:n kuitulippua (PT).
- 16.5x OMISTAJAN PÄÄTÖS 16.42 (PT): ei hitaan verkon testejä nyt (ennen kaupallista julkistusta joskus); omistaja pääsi pelaamaan iPadilla →
  jumi oli hidas verkko. c62818943 junaan tavallisilla testeillä. PEKINGIN HAHMOESIHAKU PERUTTU. PJ6-sk tavalliseksi (lämmin, ei katkoa/viivettä/
  tyhjennystä; 34 r, md5 0a8622f3ef4b). PJ6-tulos katsottuna → valmis-rivi PT:lle (c62818943, kuvat) → pt-ok → MR JU:lle junaan.
