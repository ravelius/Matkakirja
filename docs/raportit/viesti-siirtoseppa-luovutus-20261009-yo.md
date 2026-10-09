# Siirtosepän luovutus 9.10.2026 yö (Opus 5.5, high; konteksti ~70 %, PT:n nollausohje)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (ensimmäinen pelattava pala, historia-animaatio "kuin elokuva",
linnan äänet ja Final IK). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain automaattisin; simuajot vain liikkuvien
kohtausten kuva-arkkeihin ja PT:n pyytämiin äänikaappauksiin Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla, oma simu
8362879F-30B9-4625-9F42-57326EBC3439, lopuksi "simu vapaa". Viestit vertaisille: SendMessage-raja (~10/vuoro) → varakanava
mcp__ccd_session_mgmt__send_message (hookin ohje).

**Ensimmäinen tehtävä:** PT:n pyytämä äänitarkistus ja sen jälkeen junan 174 kuittausrivi PT:lle (alla "AUKI 1"). Kaksi ajoa epäonnistui
(22.28: pala avattiin linssin sisältä → maailmankartta; 23.00: pala jäi alun valintaan "Pelaa / Linnan historia" → ei pelaajaa). Korjattu
skenaario alla (napautus "Pelaa"); tarkista `tap-teksti`-komento todistusajo.sh:n ohjeesta ennen ajoa. Pyydä Julkaisijalta vuoro: `PROTO_APP_KOPIO=<scratchpad>/app proto-3d/tyokalut/proto-kaanna.sh <koe-174h> 8362879F-…` ja
`tyokalut/todistusajo/todistusajo.sh --era juna174-aani --udid 8362879F-… --app <app> --sha <käännetty> --haara <koe-174h> --skenaario aani-skenaario.txt --nyt`
(skenaario alla), sitten analyysi: `ffmpeg -i <wav> -af ebur128` (LUFS), astats (huiput), askelväli silencedetectillä, ja lokista rivit
`seikkailu: soundly <tunnus> → <klippi>` (pankki soi eikä vain vara).

aani-skenaario.txt (proto-kopio scratchpadiin):
```
ui seikkailutapit pala
oleta 120 alun valinta -- alun valinta (Pelaa / Linnan historia)
odota 2
tap-teksti Pelaa
oleta 300 seikkailu: kamera pelaaja -- pelaaja ohjaimissa
oleta 90 tehosteet [0-9]+ .olavinlinna-soundly-v1 -- Soundly-pankki ladattu
odota 5
linssi poikki seikkailu botti
oleta 30 botti: [0-9]+ pistettä -- botti käynnistyi
odota 6
aani 30 piha
aanitaso 5
oleta 240 botti: pelaaja-2[0-9] -- botti linnan sisällä
aani 30 sisalla
aanitaso 5
```
Huom: Soundly-pankki latautuu vain pelattavassa palassa (DioraamaSovitin.AanetPaalle), ei linssin poikkileikkauksessa.

## HAARAT (proto, worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello; varmuuskopio natiivi-backup peili/proto/siirtoseppa-<haara>)

| Haara | Kärki | Tila |
|---|---|---|
| siirtoseppa/juna173-historia | 98f1c06b4 → 7cfbe6710 → 5a1cfa7c2 | KUITATTU junaan 173 (Natiiviseppä tietää 5a1cfa7c2) |
| siirtoseppa/juna174-historia | d0bbaadd9 | 5a1cfa7c2 + 10 committia (kuva-arkki puhdas, äänikaappaus tekemättä) |
| **siirtoseppa/juna174-silmukat** | **920d1d80e** | juna174-historia + Pelikoodarin pelikoodari/silmukat-ristihaivytys 753609a55 (sis. junan 174 rungon cbef6c66b); konflikti SeikkailuAanet.Silmukka ratkaistu (Muunnelma + SaumatonSilmukka.Kiinnita), pelaajan kertaaskeleet omasta lähteestä (ohjauslähde mykistetty). Linssit 1260/1260, unity 0. TÄMÄ junaan 174 kuittauksen jälkeen; äänitarkistus tällä (koehaara: tee koe-174s = tämä + master) |
| siirtoseppa/koe-174h | e33b648e4 | juna174-historia + koe-173 + master, vain käännöksiin (vanha) |

juna174-historian sisältö (Linssit 1155/1155, unity-tarkistus 0 joka commitissa):
- cda9553d4 + 9cb168bc8 Final IK: kämmenen kierto `kadet[].kierto` (KammenKehys luista: hand, middle_01, index_01, pinky_01; ei kalibrointia),
  "poikki kadet kierto 0|1".
- a8ec83cac kannettava esine (`kanna` + `glb`, kehys "kammen"; esine ladataan hahmojen polulla ja asetetaan IK:n jälkeen); tartu seuraa
  esinettä vain, jos saman hahmon kanna-rivillä on sama esine (hoitajan-pulpetti = maailman paikka).
- 7bfcb9505 PelattavaPala v46l 83b6185bc898d1e7 (LR: kappalaisen rukouskirja; LR:n haara linnanrakentaja-linna-v45d fbffee576 junaan).
- b3ddc20a6 + 46ee501f9 historia: ranta-1499 (1499-täytön "ruskea laatta") piiloon ensimmäisen myöhemmän rakenteen (1745) jälkeen vain
  nykyasuisella kuorella; `ulkokuori.asu: "1499"` (v25) → aina näkyvissä (PT). LR lisää kentän v25-vientiin, märkyys 0,15 ja karheus ≥ 0,8 datassa.
- 09cefdfca + a2e111d06 Soundly-pankki (aanet/olavinlinna-soundly-v1, 205 ääntä, pakattuna ~14 Mt): SeikkailuAanet.Korvaavat (varmat vastineet),
  pelaajan askeleet kertaääninä askelpituuden välein (kivi, porras, olki, sora, vesi, märkä maa; hiivinnässä kahina), äänivahtirekisteröinti,
  lokirivi kun pankki soi.
- 814235c0a + d0bbaadd9 Pelikoodarin korjaukset: keittiön ambienssi keittio-ambienssi-03 (AaniUrl-korvaus), sydan-silmukka-02, hiipiminen-10,
  koira → yo-01/02 (myös SeikkailuSade), askel-porras-1 +2,5 dB.

Kuva-arkki 22.28 (todistus-juna174-kadet-aani-20261009-2228): hoitajan kädet pulpetilla kierron kanssa ja ilman (ero pieni), kappalaisen kirja
oikeassa kädessä rintaa vasten (vasen käsi kirjan edessä, ei vielä reunassa), ranta-1499 näkyy 1550 ja katoaa bastionien kasvaessa.
Aiemmin tänään puhtaat ja kuitatut: arvio 10 (PR #4301), puhujan kasvot (selkäkääntö korjattu), vouti v4/v4b, kasvovalo, vuoronvaihto, saari alla.

## AUKI / SEURAAVAKSI

1. Junan 174 kuittausrivi PT:lle: juna174-historia d0bbaadd9 + äänikaappauksen tulokset (LUFS, huiput, askelväli, soundly-lokirivit).
   Kuittauksen jälkeen SHA Natiivisepälle ja LR:n haara linnanrakentaja-linna-v45d (fbffee576) junaan.
2. Kappalaisen vasen käsi kirjan reunaan: tartu-kohde [0, 0,035, 0,03] kirjan kehyksessä; tarkista kuvasta, osuuko FBBIK (paino 1) ja kierto.
3. mp3-silmukoiden saumat: TEHTY Pelikoodarilla (753609a55, PT kuittasi), yhdistetty haaraan juna174-silmukat. Pankin pakatut silmukat saavat
   ristihäivytyksen vain, jos ≥ 7,5 s.
4. sydan-nopea-01 (100 BPM) on ladattu, ei kutsukohtaa (nopea syke, rivi r125).
5. Jono PT:ltä: detaljikartan lukija + huonekohtainen lataus → äänimaisema mikserin Tausta/Sää-säätimien mukaan.
6. LR:n ulkokuoren laatta (Olavinlinna_vedessa2) ei ole vika: ryhmä A on lounaisbastionin piha (maata).
