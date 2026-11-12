# Natiivisepän luovutus 12.11.2026 klo 11.00 (tiivis, Raamattu 7.37: ≤ 8 kt)

Korvaa luovutuksen -1025; vanhoja EI tarvitse lukea. Sessio local_0f7f169f, checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja.
Syy: kontekstivahti 28 %. Viestit mcp__ccd_session_mgmt__send_message TÄYDELLÄ session-id:llä:
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
KELLO: aja `date` ennen jokaista aikaleimaa. Viesteissäni 10.3x–11.4x olivat liian myöhäisiä (todellinen 10.3x–11.00).

## AVOIMET: JÄRJESTYS PT 11.05 / KK 11.04 = kohta 4 (kujavarjo, estää v134:n; täysikokoinen A/B-pari + kujan toinen pää KK:lle,
## EI junaan ennen KK:n sanaa) → kohta 1 (Peitto-bitit) → kohta 2 (Metal-vaihe 6). Kohta 3 ei vaadi työtä.
Metal-koeajot (kohta 2) voivat katketa nollauksessa: aja tarvittaessa uudelleen worktreessä metal-vaihe:
`METAL_TARKISTUS=1 zsh tyokalut/ennen-junaa.sh --nyt` ja `zsh tyokalut/ennen-junaa.sh --nyt` (taustalla, tulos lokit/ennen-junaa-*/JUNATARKISTUS.md).

1. MONON KEKO, KK:n PÄÄTÖS 10.57 KYLLÄ: Peitto bitteihin + reunalista säiekohtaiseksi, ILMAN allasta. Tee nyt (mittaus tuoreena).
   - Worktree luotu: /Users/Shared/Claude/wt/proto-natiiviseppa-elava-bitit (haara natiiviseppa/elava-bitit juna-224:n 2f62c309e:n päältä), ei muutoksia vielä.
   - Koodi: Assets/Matkakirja/Kartta/ElavaPiirto.cs (250 riviä, puhdas C#). Peitto = byte[N*N] (N = 1024 → 1 Mt). Käyttö: Tayta (rivit 122–123
     täyttää välin xa..xb), Pienenna (187: SS×SS-summa), Renkaat (208–209), Etaisyys (227) ja ULKOINEN ElavaTyyli.cs:903 (`varattu.Peitto[iy*n+ix] == 0`).
     Ehdotus: ulong[] rivinleveydellä W = (N+63)/64; välin täyttö sanamaskeilla, Pienenna popcountilla (BitOperations.PopCount), Peittaa(i)-apu.
     Vuokraa<byte>(N*N) → Vuokraa<ulong>(N*W) (huom. Vuokraa-avain erottaa byte/muut etumerkillä: lisää ulong omaksi avaimekseen).
     Reunalista `readonly List<Reuna> reunat` per maski → [ThreadStatic] säiekohtainen (Tayta tyhjentää aina; Viiva kutsuu Tayta lopuksi;
     tarkista, ettei kahta maskia täytetä lomittain samassa säikeessä: Alue/Viiva-kutsut ElavaTyyli.cs ~430–700).
   - EHDOT (KK): (1) kuvat ennen/jälkeen TAVULLEEN samat, Pariisi + yksi muu kaupunki, elävä kartta päällä; (2) mono-5: GC.Alloc yhteensä + 3 suurinta;
     (3) maskin tuotantoaika ei kasva (ms/maski mediaani + pahin, ennen vs jälkeen) eikä muistin huippu nouse. Täyttyvät → pt-ok PT:ltä riittää,
     KK:lle yksi rivi luvuista. Jos kuvat eroavat tai aika kasvaa: EI junaan, kerro ero.
   - Testit: Kartta-testit/ (ElavaKarttaTestit, ElavaSumeaTestit, ElavaEsilatausTestit …), kääntäjä kuten Linssit-testit/kaanna.sh (dotnet + csc,
     ilman editoria). Tavuvertailu kannattaa tehdä harnessilla: sama joukko oikeita MVT-paloja ElavaTyyli.Piirra:lla vanha vs uusi → tiivisteet + kesto.
   - Mittaus: skenaario _tyo/natiiviseppa/mono/sk-mono-pariisi.txt (komennot `mono-varaajat 20 ennen|valmis`), lokit proto-3d/lokit/ns-mono-<n>.
     Lähtötaso mono-4 (nykytila, e09a3694f): valmis-vaihe GC.Alloc 125,5 Mt / 20 s; 1) ElavaMaski.Peitto 34,2 Mt / 36 kpl (27 %),
     2) Laattapalvelin.Lataa 7,6 Mt (6 %), 3) ElavaMaski.LisaaRengas 3,6 Mt / 211 kpl (3 %); mono 937 → 743 Mt.
     Maskiallas (65ff16870, elava-maski) HYLÄTTY, ei junaan.
2. METAL-VAIHE 6 (KK:n SANA 10.57): toteutettu c7bbff1d5, haara natiiviseppa/ennen-junaa-metal (wt /Users/Shared/Claude/wt/proto-natiiviseppa-metal-vaihe):
   tyokalut/ennen-junaa.sh vaihe 6 = metal-tarkistus.sh käännöspalvelun kopiossa (Matkakirja-proto-kaannos) lukon alla, kun varjostintiedostot
   muuttuivat linkin versiosta (SHA jako/matkakirja-*-<SHA>.ipa:n nimestä tai --linkki), --tf:llä ja METAL_TARKISTUS=1:llä aina; muuten OHITETTU syyllä.
   Koeajot käynnistetty 11.0x taustalla: tulokset scratchpadissa ej-ajo1.txt (METAL_TARKISTUS=1) ja ej-ajo2.txt (oletus → ohitusrivi) +
   proto-3d/lokit/ennen-junaa-20261112-*/JUNATARKISTUS.md (kaksi uusinta). TEE: lue molemmat; jos vaihe 6 OK (kesto + ohjelmien määrä) ja
   ohitusrivi näkyy → näyttö PT:lle (pt-ok riittää) ja haara JU:lle junaan; KK:lle vain valmis-rivi. Huom: METAL_ETULIITE=Matkakirja/ (kaikki
   projektin varjostimet, ennen vain Juoksupeli/): jos kesto liian pitkä, kerro PT:lle. Vaiheet 1–5 voivat olla HYLÄTTY/KESKEN omista syistään
   (simuvaiheet EI AJETTU) – arvioi vain vaihetta 6.
3. [0] LATAUS JÄÄ LATAUSKUVAAN: NS:n osuus TEHTY (palkki-6/7 128ae58ba linkissä 224.101; Mac hidas verkko 13,1 s ≤ 15 s, 439/439, VIRHE 0).
   Jäljellä vain KK:n iPad-erän luku; KK:lle kerrottu 11.0x. Ei NS-työtä.

4. KUJAVARJO TAKAISIN NS:LLE (LAV 11.00, KORJAA alla olevan "valmiit"-kohdan): varjo ON atlaksessa. V4_kujakivi_lattian itäkaista
   x −134…−132, z 375–440 tumma (L 0–0,2 vs länsi 0,65) kaikissa atlaksissa; sen UV1 u 0,05–0,16 (oma profiilini katsoi vain u 0–0,02 =
   valoisa länsisarake → väärä johtopäätös). Pelissä (lod-g G0, oikea reuna oven puolella) kaista ei ole tumma → vika PELIN PUOLELLA.
   Epäillyt: (a) JuoksuV4Maailma.cs ~770–806: uv1t lisätään kärjittäin `alku`-indeksiin, mutta JaaKolmiot/JaaAlusta (lattiat, laji 10,
   varjostin Matkakirja/Juoksupeli/Lattia) voivat järjestää/monistaa kärjet → UV1 ei vastaa kärkeä; (b) JuoksuLattia.shader: leivottu
   näyte uv1:llä vs. _LeivottuST; (c) materiaali: kujakivi-lattia ei saa _ValoAtlasta (leivottu-ehto ru1.Count == r.p.Count).
   Koe: QA-tulostus kujan lattiaryhmästä (kärkiä, UV1-min/max, onko _ValoAtlas) + kuva, jossa lattia näyttää pelkän atlaksen (debug).
   LAV:n yläkuva: proto-3d/_tyo/linnanrakentaja/leivonta-v5-tyo/koe-b/kuja13-lattia-ylhaalta-atlas.png. KK:lle korjaus vasta A/B-parina.
   ENSIN (LAV 11.1x): tarkista KATSESUUNTA. Atlaksessa itäkaista on tumma vasta z 375–440; z 345–370 (kameran z 364 vieressä) valoisa
   myös leivonnassa. `valo sijoita -136 360 180`: jos 180 = katse −z:aan, varjoa EI kuulukaan näkyä → ei ajonaikaista vikaa. Aja kuva
   katse +z:aan (kaista ~10 m edessä oikealla/vasemmalla) ennen vianhakua. Leivonnan aurinko 40°/45° (+x,+z; peli 318°/45°), elävä
   aurinko voi erota → vertaa K1:n varjon puolta.

## VALMIIT TÄNÄÄN (tämä vuoro)

- PR 6603 yhdistetty (CI vihreä).
- Kujan lattian varjo: LOD-G/LOD-H (ed93fb0df, QA `valo uv1kaanto`, oletus ennallaan, ei junaan). Pelin UV1-luenta OIKEIN (rasterikoe:
  proto-3d/lokit/natiiviseppa-juoksu-pala3-lod-h/kuja-uv1-saaret-gltf-vs-kaannetty.png); kujan atlaksessa ei seinävarjoa → LAV:n leivonta
  (seinät 1-3 varjon heittäjiksi). KK perui päätöksen 10.48 klo 10.55. LAV:n seuraaja jatkaa; ehto (2) A/B-pari + kujan toinen pää uudesta
  leivonnasta → KK. NS:llä ei tekemistä ennen LAV:n uutta leivontaa (silloin skenaario lod-h:n kaltainen ajo JU:lla).
- Testit-kortti tarkistettu (KK korjasi PR 6609).
- Monon kolme suurinta raportoitu KK:lle → päätös kohta 1.

## MUUT

- Työkopiot: elava-bitit (uusi), metal-vaihe (uusi), pala3 (ed93fb0df QA-kytkin), elava-maski (hylätty), elava-sumea (junassa), aanitysjono-ci
  (PR yhdistetty → voi poistaa), tyokalu3, latausjono, kaupunkitaulu, kertoja-esilataus, tyokalut, natiiviseppa-luovutus.
- Natiivirepon `master` on jäänyt 9.11. tilaan; nykyinen juna = julkaisija/juna-224. Natiivihaaroilla ei originia (JU kääntää samasta reposta).
