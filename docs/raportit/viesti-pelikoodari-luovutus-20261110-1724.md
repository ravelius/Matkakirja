# Pelikoodari: luovutus 10.11.2026 klo 17.24 (konteksti 25 %, pehmeä raja)

Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, NYT haarassa pelikoodari/osa9-kulku-v129 (pohja juna-224 5f8780605).
Edellinen: viesti-pelikoodari-luovutus-20261110-1633.md (kohta 1 PJ6 ja 3 Lyon yhä voimassa; Pekingin esihaku peruttu).

## 0. ODOTTAA MUILTA
- PJ6 (c62818943, pieni iPad) JU:lla. Sk:hon lisätty peukalorenkaiden kuvat i1-renkaat-a/-b (PT 16.5x; md5 nyt 08f98f629198, 40 r), JU:lle kerrottu.
  Tulos lokit/pk-latausruutu-d57afd0c3-ipad → katso latausruutu + renkaat → valmis-rivi PT:lle (c62818943) + renkaiden pari PT:lle.
- Lyon-PC (pk-lisakaupunki-c-2997f7c80) JU:n jonossa (ks. 1633 kohta 3).
- Pariisin aloituslento Louvre + Riemukaari: kytke vasta, kun KS:n korostuskertoimen K 2 (3c3c12be6) iPad-pari on tullut (PT).
- VALMIS ja ilmoitettu PT:lle: sauvan kierto keskikohteen ympäri 8841fd32f junassa 224, iPhone-ajo NAS lokit-20261110/pk-tappi-kierto-iphone-8841fd32f
  (kiertopiste Eiffel-torni, pysyi 265), arkki proto-3d/_tyo/pelikoodari/tappi-kierto/.

## 1. JUOKSUPELI = KÄRKI (PT 17.0x, omistajan kortit 17.04). Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/
   suunnitelmat/20261110-juoksupeli-linjat-ja-tarkastus.md (+ -tarkastus-logiikka.md). Järjestys PT:ltä: 1) osa 9, 2) osat 1–3 yhtenä eränä
   (linjat kujan seinistä, omenat linjoille, 90° käännös linjalle; omenat: juostavat linjoilla + myöhemmin korkealla erottuvat hyppyomenat, tasolla 1
   alussa vain juostavat), 3) osa 8 ovet kiinni tasolla 1 (arvioi koko → rivi PT:lle), 4) osa 6 pienet logiikkaviat, 5) osa 10 tavoitepalkki,
   6) osa 11 opastettu alku vasta KK:n opastetekstien jälkeen. Osa 5 aukiot kokeena 1–3 jälkeen. Näyttö: pelivideo isolta iPadilta PT → KK.
   Erät erikseen haaroihin, valmis-rivi per erä. TIEDOSTOJAKO NS:n kanssa (osa 7 piirto): NS koskee vain JuoksuV4Maailma.Heijastus/.Jalki/.Valo.cs,
   Kartta/Valopohja.cs, uusi JuoksuPiirtoMittaus.cs – älä muokkaa niitä.

## 2. OSA 9 KESKEN (PT kuittasi 17.0x "jatka a:ta"; KK 17.09: tekstejä EI vaihdeta ennen omistajan vastausta)
- Omistajan viesti ennen kiinniottoa oli "Sisälle pääsee seuraavalla tasolla." (ui.fi.json ui.juoksupeli.kynnys; JuoksupeliNakyma.KynnysViesti →
  JuoksuKulkuKartta.RajaEdessa). KK:lle kerrottu (rivi lähetetty).
- SYY (todettu ajossa v129, proto-3d/_tyo/pelikoodari/kulkukartta/v129/rajakohdat.json): v128→v129 EI muuttanut kulkua (0 ruutua). Tason 1
  rajaus (tyokalut/kulkukartta.py taso1_rajaus) estää KAIKKI pohja.json:n talojen pohjat; 52 rajakohtaa on talopohjalla avoimen taivaan alla
  (aukko jopa 46 m, esim. (-96.3; 218.6), (-2.6; 77.2) 27,5 m) = talo pohjassa, ei pelissä → näkymätön seinä + kynnysviesti + seis → takaa-ajaja.
- KORJAUS KESKEN, commit f5d604a34 (haara pelikoodari/osa9-kulku-v129, natiivi-backup; Resources ENNALLAAN, ei junaan):
  tyokalut/kulkukartta.py taso1_rajaus suodattaa talopohjat ennen rasterointia (TALO_AVOIN_MAX). SÄÄNTÖ VIELÄ VÄÄRÄ:
  v129b (kate ≥ 0,5) → 22/286 piirrettyä, v129c ((A != 0) & ~katettu < 0,5) → 27/286 – katot ovat seisottavia pintoja (A != 0), ja umpinaisen
  talon sisä ei ole kuljettava. TEE: lattiatason ehto, esim. talo puuttuu, jos sen alasta ≥ 50 % on kuljettavaa NIIN, että alin seisottava pinta
  (kk.alin_bitti(A)) on ±0,5 m ympäröivän piha-/lattiatason korkeudella ja yläpuolella vapaata > 40 m (ei katetta); tai vertaa talon pohjaa
  tausta/rakennukset-glb:n kolmioiden xz-peittoon (onko pohjan alueella yhtään > 2 m korkeaa kolmiota). Tavoite: valtaosa 286:sta piirrettyjä,
  rajakohdissa "talo > 0,5 ja kate ≤ 0,5" ~0 (v129c:ssä yhä 11, mm. (-2.6; 77.2) 27,5 m). Tarkistusajo: kulkukartta_ajo.py <ulos>
  proto-3d/_tyo/pelikoodari/kulkukartta/v129/osasarja-v15.bin (osasarja jo viety), sitten kulkukartta-rajat.py <ulos> <tmp> <ulos>/rajakohdat.json.
  Kun kelpaa: --vie (tai kopio peliin/*), Peli-testit ./kaanna.sh, commit, push.
- YLEINEN VARMISTUS (samassa f5d604a34): tyokalut/kulkukartta_ajo.py kirjoittaa peliin/JuoksuKulkuVersiot.json (pelin_versiot() ilman katet
  + osasarja) ja vie sen; kulkukartta.py: uusi pelin_versiot(); uusi testi Peli-testit/Testit/JuoksuKulkuVersiotTestit.cs (kaatuu, jos kartan
  malliversio ≠ pelin vakio). Testi kaatuu, kunnes JuoksuKulkuVersiot.json on Resourcesissa.
- Huom: esineet 109 → 105/106 arvonnassa (10e9b6c4a:ssa esineet säilytettiin vanhoina, koska arvonta sekoitti kaikki) → harkitse vanhan
  JuoksuEsineet.json:n säilyttämistä (kopioi vain Kulku, Rajat, Ovet?, Kierros?, Versiot); tarkista vertailun ovet-erot ennen.
- Näyttö: iPad-video aukiolta (KK:n kuvaus: aukio, vasen matala harmaa muuri + punainen seinä, edessä keltakattoiset hallit) → PT → KK.
- Valmis-rivi PT:lle + yksi rivi KK:lle (local_d5f31591-…, pyysi "tarkka teksti, mikä laukaisi, korjaus").

## 3. OSA 10 SOVITTU NUI:n kanssa
NUI:n haara natiivi-ui/juoksu-tavoitepalkki fb3f19f31 (V4Kierros.TasoOsuus = S.Aika / TasoAikaS, maalissa 1). Minulle: lisää JuoksuV4.cs:ään
S.TasoAika (kasvaa vain kun !Pidetty && !Esittelyssa; ÄLÄ pysäytä Aikaa, animaatiot), tason ehto rivillä ~2007 TasoAikaan, TasoOsuus käyttämään
TasoAikaa ja IJuoksuKierros.TasoOsuus. Tee fb3f19f31:n päälle omaan haaraan, sha NUI:lle (local_4b84cd90-…).
