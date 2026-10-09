# Pelikoodarin luovutus 9.10.2026 klo 14.4x (kontekstin nollaus, PT)

Kesken olevat erät, tila ja seuraava askel. Kaikki proto-haarat on peilattu `natiivi-backup/peili/proto/pelikoodari/<haara>`.

## 1. Valmisluentojen generointi (KÄYNNISSÄ, irrotettu)
- Omistajan lupa 9.10. ("Kaikki kerralla", PT:n kortti): Euroopan nostot + kuusi lajia, William `oae6GCCzwoEbfc5FHdEu`, eleven_v4_turbo,
  nopeus 1,15, yksi otto, Valmisluennat-avaimet. 6 903 uniikkia kappaletta, 2 461 225 mrk ≈ 162 400 kr (katto 2,7 milj. koodissa).
- Prosessi: PID 93533 (PGID = PID, PPID 1, perl setsid), 3 rinnakkaista pyyntöä (PT:n lupa). 14.36: 5 275/6 903, ~40/min → valmis ~15.15–15.30.
- Loki: `/Users/Shared/Claude/proto-3d/_tyo/luennat-v1/generointi.log` (rivi `valmis N → <polku>` = valmis; `PYSÄHDYS` = katto ylittyi).
- Syöte: `_tyo/luennat-v1/nostoluennat-20261009-1219.jsonl` (nostot + 5 lajia) ja `…-1317.jsonl` (lehdet; maalehdistä vain `@etusivu`).
- Jatko (jos kuollut): `perl -e 'use POSIX "setsid"; exit if fork; setsid(); open STDIN,"</dev/null"; open STDOUT,">>","/Users/Shared/Claude/proto-3d/_tyo/luennat-v1/generointi.log"; open STDERR,">&STDOUT"; exec "/Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/aja-luennat.sh","/Users/Shared/Claude/proto-3d/_tyo/luennat-v1/nostoluennat-20261009-1219.jsonl","/Users/Shared/Claude/proto-3d/_tyo/luennat-v1/nostoluennat-20261009-1317.jsonl"'`
  — jatkaa `manifest-kesken.json`:sta ja T7:n raaka-PCM:istä (ei uusia ottoja valmiille).
- Masterit: PCM T7:llä `/Volumes/T7 4TB/Matkakirja-aanimasterit/luennat-20261009/` (välitiedostot poistuvat itse). mp3:t ja manifesti:
  `/Users/Shared/Claude/proto-3d/_valmiit/luennat-v1-vienti-20261009/` (aanet/luennat/v1/k/<avain>.mp3 + manifest.json, LAHTEET.md, SHA256SUMS
  kirjoitetaan ajon lopussa).
- SEURAAVAKSI kun valmis: tarkista lokin loppu ja `ls …/k | wc -l` = 6 903 (± pettäneet), pistokoe Whisperillä
  (`_tyo/luennat-v1/tarkista.py <vienti.jsonl> <avain>…`), sitten vientipaketti Julkaisijalle (manifesti on yksi kiinteä osoite
  `aanet/luennat/v1/manifest.json`: vie kerran, mp3:t ensin). Rivi PT:lle: merkit, krediitit (ElevenLabs `/v1/user/subscription`), polku.
- Työkalut: `proto-3d/tyokalut/pelikoodari-ajot/esigeneroi-luennat.py` (kuiva ajo ilman --aja), `aja-luennat.sh`, `ajo-nostoluennat.sh`
  (NUI:n `ui nostoluennat [kaikki|lehdet] europe` simussa pelikoodari-iPad13 39644E75, vain Julkaisijan KÄÄNNÖS NYT -vuorolla).

## 2. Natiivin haarat junissa (Natiivisepällä)
- Juna 172: `pelikoodari/lyria-v2` ade5ad9f3 (Lyria-raidat -lyria-v2, data ämpärissä), `pelikoodari/mikseri-rek` 049e4ce21 (NUI kuittasi;
  UI-tehosteet, Pulu, lautapelit, Paljastus, kartan äänimaisema ja lento mikseriin), `pelikoodari/kaupunkijakso` cf0a1547d (nopea → 3 s →
  hidas → tausta, Pariisin pilotti; nopea `audio/musa-kaupunki-pariisi-nopea-lyria(-v2).mp3` ämpärissä).
- Juna 173: `pelikoodari/kaupunkijakso-intro` 20e55df36 (Pariisin nykyintro: `Aanisoitin.KaupunkiIntro("pariisi")`, `KaupunkiIntroAlkoi`,
  31,0 s häivytys 2 s → hidas 32,0 s; LS1 kytkee), `pelikoodari/valmisluennat-varareitti` 90edb9c44 (valmis ei lataudu → palavirta).
- Worktreet: /Users/Shared/Claude/wt/pelikoodari-{lyria-v2,mikseri-rek,kaupunkijakso,valmisluennat} → poista
  (`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`) kun haara on masterissa.
- Valmisluentojen toisto natiivissa on ollut käytössä junasta 147 (Puhe.cs:516 Valmisluennat.Url, manifesti Puhe.cs:386).

## 3. Äänet ämpärissä 9.10. (kytkentätiedot lähetetty)
- `aanet/pallo-elava-v2` (33, LS1 kytki df0208884/13c1a7076), `aanet/pallo-kaupunki-v1` (17 Sonniss: kellot, suihkulähteet, väki/tori,
  kahvila, veneet; LS1, juna 173), `aanet/sonniss-aanet-v4` (26, portitettu v3; Olavinlinna → Siirtoseppä, satama-vesi → LS1;
  Mylly/Tavli jo masterissa 7ccdcdf16).
- Työkansiot: `_tyo/pallo-elava-v2`, `_tyo/pallo-kaupunki-v1`, `_tyo/sonniss-pallo` (raportti #4289 mergetty, ehdokkaat T7:llä
  `/Volumes/T7 4TB/sonniss/pallo-ehdokkaat-20261009`), `/Volumes/T7 4TB/sonniss/tyokalut/v4.py`.

## 4. Odottaa omistajaa / PT:tä
- Soundly Pro -kuukausi (14,99 $) + PSE 5 $/ääni: hakulista `_tyo/sonniss-pallo/soundly-hakulista-20261009.md` (lokit, kyyhkyt ja siivet,
  tuuli, lyödyt kellot, ratikan ja pyörän kello, laivan torvi). EI ostoja ennen omistajan päätöstä. Latausten jälkeen sama portti
  (`_tyo/sonniss-pallo/portti.py`) ja käsittely kuten `_tyo/pallo-kaupunki-v1/kasittele.py`.
- Musiikki: omistajan kuuntelu (PT:n sivu): nyky/, moderni/, musiikki-kokeilut/, Kiina-2. Lyria-linja 9.10.: ei säröuusintoja,
  ei declipiä, WAV saa pyytää (`response_format {"type":"audio","mime_type":"audio/wav"}`), Pekingin 1. otto on suosikki.
  Lyria estää sanoja (house, French touch, Youthful, hypnotic, Stockholm/saga, cajón, syrtos/daf) → vaihda vain sana ja kerro.

## 5. Muut avoimet
- PR ravelius/Matkakirja#4266 (Sonniss-luettelo GDC 2024) auki → poista wt/pelikoodari-sonniss-varasto-2 mergen jälkeen.
- wt/pelikoodari-yoportti = Freesound-haun Actions-haara (pelikoodari-freesound-haku), käytössä; älä poista.
- Mikseri: palvelin #4270 tuotannossa (GET/POST/PUT /mikseri/tasot, /mikseri/historia).
