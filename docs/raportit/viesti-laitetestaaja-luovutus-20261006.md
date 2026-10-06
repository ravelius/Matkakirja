# Laitetestaaja: luovutus 6.10.2026 illalla (tilinvaihto)

## Tila
- Haara: `laitetestaaja-savukierros-b13` (checkout /Users/Shared/Claude/Matkakirja-laitetestaaja), kaikki commitit pushattu.
- Simut: 1572C658 (iPhone 18 Pro) ja 3B4CDACB (iPad Pro 13) sammutettu. Ei käynnissä olevia ajoja. Toisten simuihin en koskenut.
- Viimeisimmät tulokset (kaikki kirjattu `docs/raportit/kuittaus-*`):
  - **TULOS 154 (286e8f34, app 787db464): OK** (22.02–22.09): käynnistys, kartta, noston ylärivi, päävalikko, opas aloitusvalikosta (Sydney), oppaan nappirivi (">"), päivä/yö-nappi, Poistu → kartta; 0 Exception, 0 kaatumista. Todentamatta: Kysy-kysymyksen napautus (`opas: kysy`), Liikun kohteen siirto, kaupunkikierros, versiorivi "1.1 (154)".
  - **TULOS 153 (b9f09bcd, app 7920e6a0): OK** (20.36–20.46): kartta, ISS + jalka, opas (Sydney), Liiku-paneeli, Poistu → kartta. Todentamatta: Kysy-kysymys, kaupunkikierros, noston krediitit.
  - Juna 152 (f9e4032c) OK, 151 (2a48148d) OK, BUILD 150 OK, 149 OK perus+opas, 148 OK, 146 osittain PASS, 145 PASS.

## Avoimet asiat
- iPad 00008103 10 min opas-muistiajo (Päätoimittajan aiempi pyyntö, ei VIE-ehto) tekemättä.
- Todentamatta usean junan yli: Kysy-kysymyksen napautus → `opas: kysy` (vastaus tulee puheena, ei chat); Kaupunkikierros (kiinnitetty Liiku-paneelin alimmaksi, ui-puu ei anna koordinaattia); siltalauseen ajoitus (siltalause vasta valinnan jälkeen).
- Simuvuoro: ei saa käynnistää ilman Julkaisijan SIMU NYT -viestiä (UDID + aika). Omistajan päätös 5.10.: simu vain tarvittaessa (omistajalle näkyvä muutos, vian toisto, junan lopullinen savu ~10 min).

## Käytäntö (viimeisin)
- Viestirajan takia tulokset EIVÄT mene viesteinä: jokaisen ajon lopuksi vuoron viimeinen rivi "TULOS <build>: OK/VIKA – …" + sama raporttiin; viesti vain jos ajo jumissa (max 1, Julkaisijalle).
- Todistusajo: `proto-3d/Matkakirja-proto/tyokalut/todistusajo/todistusajo.sh --era <nimi> --udid <UDID> --app <polku.app> --sha <kaannos.txt> --skenaario <tiedosto> --nyt`. Sudenkuopat: komennot `linssi linssi <x>` (kanavaetuliite), `ui puu` ei näytä läpinäkyviä nappeja → koordinaatit: oppaan nappirivi Kysy (144,778), Liiku (203,778), mikki/näppäimistö oikealla, ">" (46,778) avaa rivin; päivä/yö (41,90); ≡ (374,90) → "Poistu linssistä". Linna: ≡ (374,784) → Huoneet (317,650) → huonerivi y=682.
- Oppaan aloitusvalikko: `tap-teksti` Eurooppa → Alankomaat → Amsterdam, tai Sydneyn oopperatalo. Pöllön 429-raja: 1 oppaan avaus per ajo; testitunnus (POLLO_TESTITUNNUS) odottaa kytkentää, älä tulosta arvoa.
- Poista oma tuore tuotos: `proto-3d/lokit/todistus-*` (omat) siivotaan ajon jälkeen; .app-kopiot ovat Natiivisepän.
