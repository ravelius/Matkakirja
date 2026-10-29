# Pelikoodari: luovutus 29.10.2026 klo 23.55 (konteksti 30 %, Postivahti)

Edellinen luovutus -20261029-2230 (733a92a2e). Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN).
Natiivirepon haara pelikoodari/salikamera-215 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214, puhdas, pää b20ecd450;
peili natiivi-backup peili/proto/pelikoodari/salikamera-215). Tällä vuorolla b7ef7f924:n päälle:
617655e48 salikartta ilman katto-/palkistokappaleita, 3ed913184 kameratesti, 69b7233f4 A3/A5-pintasallinta, 72547c31d katon lapset kattoon,
1047596ee + b20ecd450 pintalista (V4_paaharja, V4_keskiovi, V4_nimitaulu, V4_jalusta_lohkokivi; PT 23.3x).

## ENSIMMÄISENÄ: SALIN SISÄKAMERA, PT:n palaute 04-pariin (PT 23.4x, "ei vielä KK:lle")
Tila: kulma 72° → 41° (= peruskulma), salikartta puhdas (loki "salissa 0.0", "salikartta … 42 katto-/palkistokappaletta pois").
Pari: /Users/Shared/Claude/proto-3d/lokit/havainne-editori-20261029-232207/04/vierekkain.png. Oletus DroneNosto.SaliSisakamera = false yhä.
Syyt korjattu: (a) RakennaSolmuittain yhdistää glb-solmut kappaleeksi "v4 palatsi avoin <huone> katto+katto_raystas osa", joten
"katto*"-nimiehto ei osunut → katto/palkisto merkitään nyt LisaaAvoimenKatossa (saliKattoOsat); (b) harjakoristeet (chiwen, eläimet)
ovat glb:ssä katto-solmun lapsia mutta jäivät kuoreen → KatonOsa() kulkee vanhemmat (myös häivytys katon mukana).
PT:n kaksi korjausta, sitten uusi 04-pari PT:lle:
1. Katto ja palkisto näkyviin, kun kamera on salin sisällä katon alapinnan alla (nyt yläreunassa taivas ja ulkokatot = katoton piha).
   Havainteessa ollaan katon alla: palkisto + maalatut kannatinvyöt yläreunassa, sivuilla pylväsrivit. Ei taivasaukkoa: katto näkyviin
   tai rajaus. Huom: avoinSali vaatii nyt sokkeloMaailma.SisakattoAvoin (katto häivytetty) → ehto pitää irrottaa häivytyksestä
   (esim. Puyi AvoimessaHuoneessa) ja KattoHaivytys ei saa häivyttää salin kattoa, kun kamera on sen alla. Koodi: JuoksuV4Maailma.cs
   ~1531 (avoinSali), JuoksuSokkeloMaailma.Palatsi.cs LisaaAvoimenKatto/LisaaPalatsinKatto, KattoHaivytys.
2. Keisari 0,21 → ~0,12: kamera kauemmas/ylemmäs keisarin taakse (nyt PeliEtäisyys 3,7 m, korkeus 2,4 m), käytävä päätyoveen ja
   kaksi pylväsriviä kuvaan; pysyttävä katon alapinnan (juhlasali ~5,1 m) ja palkiston (4,3 m, x ±2,7) alla keskikäytävällä.
Piiloruudut mitattu: botti juhlasalin läpi (skenaario _tyo/pelikoodari/kuja05-pk6-20261029/sk-salibotti-1.txt ja -0.txt, ajaja
aja-salibotti.zsh): sisäkamera päällä piilossa 0, kattoja sisällä 0 (kulma 41–45°); pois 0/0 (72°). Lokit esikatselu-20261029-233122/-235203.
Toista mittaus korjausten jälkeen; oletus päälle vasta kun PT on kuitannut parin.

## Muut
- 06 (A3/A5-portti, v81) = Karttasepän ajo (lokit/havainne-editori-20261029-231732/06), ei PK:lle. KS sai 69b7233f4:n (cherry-pick).
- v81-juuri valmis: _tyo/pelikoodari/kuja05-pk6-20261029/juuri-pk7-v81 (SHA OK). Haaran osoittimet yhä v76 (rakennukset-v61, ulkorengas-v6,
  c1-v6, c2-v10) → vaihda v81:een (rakennukset-v67, ulkorengas-v7, c1-v7, c2-v12), kun sisäkamera on kuitattu. Kaidekansio
  (OsasarjaKaiteetKansio = kielletty-halli-kaiteet-v2/) on NUI:n haarassa natiivi-ui/halli-215, ei tässä.
- PT 23.4x: LR palauttaa v83:ssa f-taihemenin reunamuurit (03/03b) törmäyksineen → leivo esto uudelleen, kun v83 on ämpärissä.
- Codex-portti tehty 23.5x: a2-middle6-v1, a2-last3-v1 (A2 12/12), a4-v1 (A4 kannatinryhmät), a1-v1 (chiwen kahvalla) →
  _tyo/pelikoodari/codex-osat-215/ (zip-SHA = T7, SHA256SUMS 0 vikaa, codex-3d-tarkistus KAIKKI OK); LR:lle ilmoitettu (jonossa).
- 22.28:n taustan 04+06-ajo ei koskaan valmistunut (jäi jonoon, prosessi katosi nollauksessa) → ajettiin uudelleen 22.47.

## Avoinna (ennallaan edellisestä)
- Vanhat pinnat LR:lle, juna 215 NS:lle PT:n kuittauksella (salikamera-215 sisältää osasarja-215:n ja v76:n), NUI:n kaidepaketti.
