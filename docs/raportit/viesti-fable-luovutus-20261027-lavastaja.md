# Lavastajan luovutus 27.10.2026 klo 12.1x (konteksti ~70 %)

Kansio K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/linnanrakentaja/havainne-kuja40.
Juoksupeliä johtaa KK (omistaja 26.10. 21.11): raportit ja kysymykset KK:lle ≤ 3 riviä. Viestit: SendMessage-raja täyttyy → mcp__ccd_session_mgmt__send_message.

## OMISTAJAN PÄÄTÖS 27.10. 10.56 (sitova nyt)
Valon leivonta SEIS. Ensin rakennukset ja elementit havainnekuvien mukaisiksi alue kerrallaan: kujat 01/02/05 → aukio 03/03b → juhlasali 04 →
Meridiaaniportti 06 ja yleiskuva 07. Mitat ja paikat pysyvät. Valo (aurinko, VS:n ehdotus 345°/30°, AURINKO:TAIVAS 3:1) mietitään myöhemmin KK:n kanssa.

## Tila
- Erolista kohdittain (havainne | peli, kuka tekee, Codex C1–C5): H/EROLISTA-20261027.md (KK:lla).
- Muoto valmiina, LEIPOMATTA: K/yksikerros-v71/kielletty-tausta-v57 (ketju K/tyokalut/aja_ketju_v71.zsh ilman leivontaa: vinot tasoon, lattia yhtenä
  kerroksena vain vaakasuorille [kattosirukorjaus], marmoripystyt > 1,5 m kivikerroiksi, kujapalat kk-tausta-kuja-0-3 / kuja-1-3 / aukio-1-1,
  kujan 02/05 reunakivi V4_kivireunus 0,5 × 0,20, kujan 01 suorakaidelattia + suora reunakivi).
- Avoimet: K/leivottu-sali/avoimet-v54 (kuunportti pois, ovikynnykset 0,55 m V4_kivireunus [avoimet_ovikynnys.py], sali leivottu 172,1).
- Rakennukset: K/rakennukset-v51/kielletty-rakennukset-v51 (kaikki 52 leivottu AZ 170; kujaporttien pariovet 45° auki; p-kujaportti-3:ssa
  ovisolmut ovi_V/ovi_O kiinni, origo saranassa, saranat …-ovet.json:ssa – tason 1 alku PK:lla, toimii pelissä).
- Viimeisin leivottu: tausta-v70 (AZ 170, VS: kujien valo PUHDAS). Ei viety; vienti vasta muodon ja KK:n parien jälkeen.
- Esikatselujuuri: H/juuri-v71m (tausta = yksikerros-v71 leipomaton, avoimet-v54, rakennukset-v51, aarteet799-v4 + lautaspöytä). Editoriajot:
  cd H; MALLIT=file://H/juuri-v71m/ REF=natiivi-ui/havainne-valo-kamera zsh ./portti-lr.sh 01 02 05 (NUI:n haara: tasainen vertailuvalo + kamera).

## Seuraavaksi (järjestyksessä)
1. Kujan 01 reunakivi seuraamaan huoneiden sokkelilinjaa (nyt suora x −139,2/−132,4 jää kujan keskelle leveillä kohdilla; tee kuten
   kuja_reunakivi2.py mutta sokkelit avointen huoneiden glb:istä sijoituksen kautta) → juuren polku NUI:lle pareiksi (NUI odottaa).
2. VS 12.0x: Codexin pinnat 1068–1071 valmiit (/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupinnat-v1/, SHA OK) avoimiin ja rakennuksiin:
   V4_ovi ← 1070-ristikko-pariovi.jpg (koko ovi yhdellä UV-ruudulla), V4_ristikko ← 1071-ristikkoikkuna.jpg OPAQUE (toisto ~0,9 m),
   uusi V4_kannatin (MASK 0,5) räystään alle pystynauha ~0,55 m (kuva = 4 kannatinta ≈ 2,4 m), uusi V4_paatytiili (MASK 0,5) räystään reunaan
   ~0,3 m (kuva = 4 tiiltä ≈ 1,6 m). Pelikoodia ei tarvita (JUOKSU_ALFA). Ilmoita VS:lle juuri-v7x.
3. T-risteys (−134; 294, pala 1-3): harmaa marmorijalusta y 0,4–0,6 z 286–292, vaalea kaistale, katon kulma (puutarha/varasto-räystäät).
4. VS:n v70-korjauslista (aukio: rako z −192,75…−192,5 x 1,75…9,25 + 27 ruutua + 6 T-liitosta; kuja01-pala porttiin + palan 1-4 lattia):
   /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tarkistus-v70-20261027/.
5. Aukio 03: Taihedianin jalustan kerrokset, portaat, kaiteet (C2), sivuhallit, horisontin modernit kerrostalot pois (KK 12.1x, EROLISTA lopussa). Sitten 04, 06, 07.

## Opit
- Lattian "läikkä" pientiilikuviolla = REIKÄ (pelin täyte −0,08). Peittokoe: kaikkien ylöspäin osoittavien kasvojen ruudukko.
- vaaka_yksi_kerros vain n.z > 0,9995 (loivat katot tekivät nousevia siruja). leivo_malli pudottaa solmun translationin → ovisolmut_sarana.py.
- Python, joka tarvitsee numpya: /opt/homebrew/bin/python3 ILMAN -I:tä.
