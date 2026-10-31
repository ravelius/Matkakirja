# Valosepän luovutus 31.10.2026 klo 18.48

Syy: kontekstivahti 30 %. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 16.06–18.47). Proto-repo on vain paikallinen. Edellinen: viesti-valoseppa-luovutus-20261031-1603.md (sen työtavat voimassa).

## VETOVASTUU: KOEKOHTAUS PIHA 06 (omistaja 18.28 ja 18.31 PT:n kautta)
Meridiaaniportin piha 06 mahdollisimman hienoksi **Macin Unity-editorissa**, suorituskyvystä välittämättä, EI iPad-ajoja eikä fps-mittausta. Tulos kuvina/videona + sovitettu havainnepari KK:lle → omistajalle. Muut kohtaukset vasta hyväksynnän jälkeen. Osasarja-v6:a ei keskeytetä.

### Tila
- **Aurinko (KK hyväksyi):** havainteen aurinko 45°/318° (pohja 40°) yhtenä aurinkona peliin ja leivontaan. Commit `linssiseppa2/piha06-aurinko` **f4df529a6** (proto, worktree `wt/proto-linssiseppa2-piha06`) = NS:n `natiiviseppa/koe67-piha06` 364abe650 + `JuoksuK22 = true` + `LeivontaAurinko* = K22` + `tyylikirja/leivonta-aurinko.json` (45° / pohja 39,97°). NS:lle merge-pyyntö lähetetty. tarkista.sh: 5 virhettä + valovahti vain NS:n Koe67.cs:ssä (FogVolumeComponent tarkistimen viitteissä) → NS.
- **LAV:** pyydetty 06:n leivonta uudella auringolla (polvi v3 0,65/0,3 pohjana). ODOTTAA.
- **Leivonnat tähän asti (vanha aurinko 30°/188°):** v2 01af37c39009 → juuri `_tyo/linssiseppa2/juuri-l2`; v3 79b448a1d5f3 → `juuri-l3` (juuri-k3:n symlinkit + LAV:n kansiot vanhoilla nimillä tausta-v81 / rakennukset-v85 / muurikate-v29). v2 paras: puhki 06 8,3 % (v1 26,1), 03 5,3 %; lattian mediaani 202 vs havainne 200.
- **KÄYNNISSÄ:** paras-ajo v3 06+03 (_tyo/linssiseppa2/skriptit-20261031/paras-06-v3.zsh, käynnistyi 18.4x; tulos uusimpaan `proto-3d/lokit/havainne-editori-*`). Mittaa puhki ja lähetä luvut LAV:lle. Huom: vanha aurinko → vain kirkkausvertailuun.
- **NS:n 6.7-koehaara** 364abe650: STP + CAS (`valo terava`), volumetrinen sumu (`valo sumu`), GTAO (`valo ssao`, oletus päällä – leivottu AO tuplana, arvioi kuvasta), SSR (`valo ssr`, `valo kiilto`), Surface Cache GI (`valo gi`, vain editori), varjo 4096/8192 (`valo kaskadit`). APV ei käytännössä. AgX hylätty (PT). NS:n editoriajo k06 a–g tulossa; pyydetty myös "kaikki ilman GTAO:ta".

### Paras ulkoasu = QA-komennot (ei koodimuutosta)
`valo vertailu 0` (leivottu + varjot + räystäs), `valo leivonta 1 1`, `valo kaskadit 2 4096`, `valo stp 1`, `valo skaala 1`, `valo heijastus 1`, `valo hehku 1` (+ NS:n sumu/gi/ssr kun koehaarassa). Skriptipohja: _tyo/linssiseppa2/skriptit-20261031/paras-06-v2.zsh (ESIKOM editori.sh:lle). HUOM: vertailuvalon oletus pitää varjot pois; `valo leivonta 1` yksin EI kytke varjoja.

### Keisarin varjo – SELVÄ, ei vika
Vanhalla auringolla (kameran takana) varjo osui hahmon eteen vartalon taakse (kärki 18°, pää 15°, jalat 24° vaakatason alla). Sivuaurinkokoe 184101 (ei leivontaa, 15°/98°): pitkä varjo oikealle → heitto toimii. Uudella auringolla (edessä oikealla) varjon pitäisi näkyä vasemmalle-taakse kuten havainteessa → **varmista KK:n parissa** (PT:n ehto).

## AVOIMET
1. LAV:n 06-leivonta (45°/pohja 40°) → juuri (kopioi juuri-l3:n tapa) → paras-pari 06 koehaarasta (REF NS:n merge f4df529a6:n jälkeen; editori.sh REF=<sha>) → puhki + keisarin varjo + muurin varjo → KK.
2. **06:n kameran rajaus poikkeaa havainteesta** (keisari 0,20 vs 0,12, sivusiivet ja oikea muuri puuttuvat kuvasta) → korjaa ennen KK:n paria (editori.sh PAIKKA 06 / testikamera).
3. Havainteet 01–07: aurinko yhteisesti EDESSÄ OIKEALLA (04, 06 selvät; 02, 05 19.42:n mukaan; 01/03 epäselvät) = koillinen ~40°/45°, Pekingissä mahdoton → PT vie KK:lle ennen laajennusta (kuva `_tyo/linssiseppa2/havainteet-aurinko-0107.png`).
4. NS:n 6.7-kuvat k06 a–g → arvio (GTAO-tuplaus, sumun keilat, SSR, GI) → mitkä pariin.
5. Edelliseltä: LT:n valon kokonaiskulu (ei tullut), LAV:n kujan 0-3 T-liitos osasarja-v6:n jälkeen.

## TYÖTAVAT
- PYSYVÄ SÄÄNTÖ (PT 30.10.): ennen paria/korttia automaattinen värimittaus havainteeseen (proto-3d/_tyo/linssiseppa2/tyokalut/varimittaus.py, auringossa ja varjossa) + lähikuvat; luvut viestiin/lokiin.
- Valovahdin taukolippu `/tmp/matkakirja-valovahti-tauko` päällä.
- Editoriajot jonottavat itse (`while pgrep -f havainne/editori.sh`), levyraja 82 Gi. Ajopuu `wt/proto-linssiseppa2-p11`. Pintatarkistuksen V4_yulu-VIKA ajopuussa (vanha tyylikirja) ei estä kuvia.
- Puhki-mittari = koko peli.png, jokin kanava ≥ 250 (_tyo/linssiseppa2/skriptit-20261031/puhki3.py; täsmää aiempiin lukuihin).

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LT local_ede7e965-02ff-40a0-a77d-44f3218ca146, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, Postivahti local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5.
