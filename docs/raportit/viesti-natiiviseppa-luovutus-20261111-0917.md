# Natiivisepän luovutus 11.11.2026 klo 09.17

Edellinen: -0857 (49eedfd2b, lisäyksineen) VOIMASSA paitsi alla päivitetyt. Syy: kontekstivahti 26 % (7.37).
Cron (klo 9.04 unity-julkaisut.py) ja vahti sessiokohtaisia: LUO UUDELLEEN. Vahti: Monitor
`bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (kuviot sisältävät natiiviseppa-saapuminen-* ja -laattalataus-*).

## 1. SAAPUMISKOE 2 (KK:n palaute mac-1:stä kohdat 1–4 KORJATTU, kohta 5 vastattu KK:lle) – kärki
Wt /Users/Shared/Claude/wt/proto-natiiviseppa-saapuminen, haara natiiviseppa/saapuminen-pariisi, 1c92f7cea (pushattu natiivi-backup), unity 0. EI junaan.
- K1: peitteen alla kamera kierron alkunäkymään (45°, KorkeusKaarelle(0.0335)); häivytys kun SaapumisTerava + !LahinakymaKesken + KaupunkiValmius.Valmis
  (uusi static class TaloKerros.cs:n lopussa; talot = palaPuuttuu/lataus/näkyvyys, OhjelmaKohteet ja Nahtavyysalue = luotu + näkyvyys) + puhe ja nimi ohi;
  katto KoeValmiusKattoS 25. Sitten kamera 1,35× ylemmäs 20°:een (odota terävä ≤ 2 s), häivytys ja AjaKeskustaanKiertaen 4 s.
- K2: Introesitys.Aloita(pehmeaKartta: true) (NUI:n tiedosto, parametri): sumea pysäytyskuva, TraileriTausta.PehmeaPeitto 0,4 (oli 0,9), kuvat 84 %.
- K3: nimi + iskulause + William ensimmäisen kuvan aikana (iskulause oli datassa; mac-1:ssä näkyi vain ~1,5 s).
- K4: lähestyminen MitoitaMatka-kestolla korkeuden mukaan (lokirivi "lähestyminen X s … perillä|katkaistu").
- K5 (KK:lle vastattu 09.1x): 56–58 s kuva = Pulun tarinakuva matkakirja-pariisi-p1-…-tarina-v1.jpg luennan jälkeen skenaarion loitonnuksessa, ei saapumisessa.
AJOT JU:lla (lähetetty 09.1x): _tyo/natiiviseppa/saapuminen/ajopyynto-mac-2.md (sk-taysi/natiiviseppa-saapuminen-mac-2.txt) → lokit/natiiviseppa-saapuminen-mac-2;
sitten ajopyynto-ipad-muisti-1.md (sk-ipad-saapuminen-muisti-1.txt, 2× kylmä, muisti-tarkka) → lokit/natiiviseppa-saapuminen-ipad-muisti-{1,2}.
SEURAAVAKSI: mac-2: unity.log "saapumiskoe"-rivit (häivytys: "lopullinen näkymä valmis|EI valmis (katto)", kesken-lista), kuvat s1 (ei mustaa), s2 (nimi+iskulause
ensimmäisessä kuvassa), s4 (valmis kaupunki, talot+nähtävyydet), n1 (peite lähellä). Riski: muiden UI-kerrosten sumennus 2,5 s viiveellä → terävä yläpalkki/Pulu hetken
kevyen peitteen läpi (KK:lle kerrottu). Sitten LEIKKAAMATON tallenne KK:lle (kopio PT), ≥ 10 s kiertoa; iPadin muistihuippu KK:lle (verrattuna katto 3940).
Äänittäjän William-otot (61 nimeä + iskulausetta) → KoeWilliamUrl / kaupunkikohtainen, kun vienti tehty.

## 2. SSE-MITTAUS (laattalataus) JU:lla käynnissä: lokit/natiiviseppa-laattalataus-sse-1 (luenta kuten -0857 lisäys 09.0x). Kaukoraja-QA-komento ennallaan avoin.

## 3. JUOKSUPELIN PIIRTO: ajo 2 luettu → _tyo/natiiviseppa/juoksu-piirto/tulos-2.md. kopio0 = sama kuva (−3 ms), jalki0:n +ms = mittausharha
(JalkiPois palauttaa renderScale 1). Seuraavaksi korjaukset wt proto-natiiviseppa-juoksupiirto (fb62178af): kopio pois oletuksena, heijastuksen rajaus,
PaivitaKappaleet vain uusille → pari + ruutuaika PT:lle. Varjo leivotuille vain lähelle PT:n sanalla.

## 4. Muut ennallaan (-0857 kohta 4).

## VIESTIT TÄLLÄ VUOROLLA
JU: mac-2 + ipad-muisti ajopyynnöt. KK: korjaukset 1–4 + vastaus 5 + UI-sumennusriski. PT: 3 riviä (saapumiskoe 2 jonossa).

## LISÄYS 09.2x
JU: mac-2 (1c92f7cea) jonossa Macilla, video koko ajosta. iPad-muisti-1/-2 siirtyi seuraavalle JU-sessiolle (JU:n luovutus 09.15), ajetaan mac-2:n jälkeen.
